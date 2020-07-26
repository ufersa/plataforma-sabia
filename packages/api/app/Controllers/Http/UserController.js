const User = use('App/Models/User');
const Role = use('App/Models/Role');
const Permission = use('App/Models/Permission');
const Token = use('App/Models/Token');
const { antl, errors, errorPayload, getTransaction } = require('../../Utils');
// get only useful fields
const getFields = (request) =>
	request.only([
		'first_name',
		'last_name',
		'email',
		'password',
		'secondary_email',
		'company',
		'zipcode',
		'cpf',
		'birth_date',
		'phone_number',
		'lattes_id',
		'address',
		'address2',
		'district',
		'city',
		'state',
		'country',
		'permissions',
		'status',
		'role',
		'full_name',
	]);

const Config = use('Adonis/Src/Config');
const Mail = use('Mail');

const Hash = use('Hash');

class UserController {
	/**
	 * Show a list of all users.
	 * GET users
	 */
	async index({ request }) {
		return User.query()
			.withParams(request.params)
			.with('permissions', (builder) => builder.select('id'))
			.fetch();
	}

	/**
	 * Create/save a new user.
	 * POST users
	 */
	async store({ request }) {
		const { permissions, ...data } = getFields(request);

		const user = await User.create(data);

		if (permissions) {
			await user.permissions().detach();
			await user.permissions().attach(permissions);
		}

		return User.query().withAssociations(user.id);
	}

	/**
	 * Get a single user.
	 * GET users/:id
	 */
	async show({ request }) {
		return User.query()
			.withParams(request.params)
			.with('permissions', (builder) => builder.select('id'))
			.firstOrFail();
	}

	/**
	 * Update user details.
	 * PUT or PATCH users/:id
	 */
	async update({ params, request }) {
		const { id } = params;
		const { permissions, status, role, full_name, ...data } = getFields(request);
		if (status) data.status = status;
		const fullNameSplitted = full_name && full_name.split(' ');

		if (fullNameSplitted && fullNameSplitted.length) {
			data.first_name = data.first_name ? data.first_name : fullNameSplitted[0];
			data.last_name = data.last_name
				? data.last_name
				: fullNameSplitted[fullNameSplitted.length - 1];
		}

		const upUser = await User.findOrFail(id);

		if (role) {
			const newUserRole = await Role.getRole(role);
			if (upUser.role_id !== newUserRole.id) {
				await upUser.role().dissociate();
				await upUser.role().associate(newUserRole);
			}
		}

		if (permissions) {
			await upUser.permissions().detach();
			await upUser.permissions().attach(permissions);
		}
		data.email = upUser.email;
		upUser.merge(data);
		await upUser.save();

		return User.query().withAssociations(upUser.id);
	}

	/** POST users/:id/permissions */
	async associatePermissionUser({ params, request }) {
		const { permissions } = request.only(['permissions']);
		const { id } = params;

		const user = await User.findOrFail(id);
		const permissionCollection = await Permission.query()
			.whereIn('permission', permissions)
			.fetch();
		const permissionsIds = permissionCollection.rows.map((permission) => permission.id);
		await user.permissions().attach(permissionsIds);
		return User.query().withAssociations(user.id);
	}

	/**
	 * Delete a user with id.
	 * DELETE users/:id
	 */
	async destroy({ params, response }) {
		const { id } = params;
		const user = await User.findOrFail(id);
		const result = await user.delete();
		if (!result) {
			return response
				.status(400)
				.send(
					errorPayload(
						errors.RESOURCE_DELETED_ERROR,
						antl('error.resource.resourceDeletedError'),
					),
				);
		}
		return response.status(200).send({ success: true });
	}

	async changePassword({ auth, request, response }) {
		const { currentPassword, newPassword } = request.only(['currentPassword', 'newPassword']);
		const user = await auth.getUser();

		const verifyPassword = await Hash.verify(currentPassword, user.password);
		if (!verifyPassword) {
			return response
				.status(400)
				.send(
					errorPayload(errors.PASSWORD_NOT_MATCH, antl('error.user.passwordDoNotMatch')),
				);
		}
		user.password = newPassword;
		await user.save();
		// Send Email
		const { from } = Config.get('mail');
		try {
			await Mail.send('emails.reset-password', { user }, (message) => {
				message.subject(antl('message.auth.passwordChangedEmailSubject'));
				message.from(from);
				message.to(user.email);
			});
		} catch (exception) {
			// eslint-disable-next-line no-console
			console.error(exception);
		}
		return response.status(200).send({ success: true });
	}

	async changeEmail({ auth, request, response }) {
		const { email, scope } = request.only(['email', 'scope']);
		const user = await auth.getUser();
		user.temp_email = email;
		await user.save();
		// Send Email
		const { adminURL, webURL } = Config.get('app');
		const { from } = Config.get('mail');

		await user
			.tokens('type', 'new-email')
			.where('is_revoked', false)
			.update({ is_revoked: true });

		const { token } = await user.generateToken('new-email');

		try {
			await Mail.send(
				'emails.new-email-verification',
				{
					user,
					token,
					url: scope === 'admin' ? `${adminURL}/auth/confirm-new-email/` : webURL,
				},
				(message) => {
					message
						.to(user.temp_email)
						.from(from)
						.subject(antl('message.auth.confirmNewEmailSubject'));
				},
			);
		} catch (exception) {
			// eslint-disable-next-line no-console
			console.error(exception);
		}

		return response.status(200).send({ success: true });
	}

	async confirmNewEmail({ request, response }) {
		const { token, scope } = request.only(['token', 'scope']);
		const { adminURL, webURL } = Config.get('app');
		const { from } = Config.get('mail');

		const tokenObject = await Token.getTokenObjectFor(token, 'new-email');

		if (!tokenObject) {
			return response
				.status(401)
				.send(errorPayload(errors.INVALID_TOKEN, antl('error.auth.invalidToken')));
		}

		await tokenObject.revoke();

		const user = await tokenObject.user().fetch();
		let trx;

		try {
			const { init, commit } = getTransaction();
			trx = await init();

			user.email = user.temp_email;
			user.temp_email = null;
			await user.save(trx);

			await commit();
		} catch (error) {
			await trx.rollback();
			throw error;
		}

		try {
			await Mail.send(
				'emails.sucess-change-email',
				{
					user,
					url: scope === 'admin' ? adminURL : webURL,
				},
				(message) => {
					message.subject(antl('message.auth.sucessChangeEmailSubject'));
					message.from(from);
					message.to(user.email);
				},
			);
		} catch (exception) {
			// eslint-disable-next-line no-console
			console.error(exception);
		}

		return response.status(200).send({ success: true });
	}
}

module.exports = UserController;
