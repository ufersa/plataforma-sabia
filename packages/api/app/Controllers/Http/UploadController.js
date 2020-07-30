const Helpers = use('Helpers');
const Upload = use('App/Models/Upload');
const fs = Helpers.promisify(require('fs'));

const Env = use('Env');

const Role = use('App/Models/Role');

const { antl, errors, errorPayload, roles } = require('../../Utils');

class UploadController {
	async index({ auth, request }) {
		const filters = request.all();
		const user = await auth.getUser();
		await user.load('role');
		const userRole = user.toJSON().role.role;
		if (Role.checkRole(userRole, [roles.ADMIN])) {
			return Upload.query()
				.withParams(request.params)
				.withFilters(filters)
				.fetch();
		}
		return Upload.query()
			.withParams(request.params)
			.withFilters(filters)
			.where({ user_id: user.id })
			.fetch();
	}

	async store({ request, auth }) {
		const { meta } = request.all();
		const files = request.file('files', {
			types: ['image'],
			size: '2mb',
			extnames: ['jpg', 'jpeg', 'jfif', 'pjpeg', 'pjp', 'png', 'webp'],
		});
		const objectInfo = meta ? JSON.parse(meta) : {};

		const uploadPath = objectInfo.object
			? `${Env.get('UPLOADS_PATH')}/${objectInfo.object}`
			: `${Env.get('UPLOADS_PATH')}`;

		const myFiles = files.files;

		await Promise.all(
			myFiles.map(async (file) => {
				const filename = await Upload.getUniqueFileName(file, objectInfo.object);
				await file.move(Helpers.publicPath(uploadPath), {
					name: filename,
				});
			}),
		);

		if (!files.movedAll()) {
			return files.errors();
		}

		const user = await auth.getUser();

		const uploads = await Promise.all(
			files.movedList().map((file) =>
				user.uploads().create({
					filename: file.fileName,
					object: objectInfo.object,
					object_id: objectInfo.object_id,
				}),
			),
		);

		return uploads;
	}

	async destroy({ params, response }) {
		const upload = await Upload.findOrFail(params.id);
		const uploadPath = upload.object
			? `${Env.get('UPLOADS_PATH')}/${upload.object}`
			: `${Env.get('UPLOADS_PATH')}`;
		await fs.unlink(Helpers.publicPath(`${uploadPath}/${upload.filename}`));
		const result = await upload.delete();
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

	async show({ params, response }) {
		return response.download(
			Helpers.publicPath(`${Env.get('UPLOADS_PATH')}/${params.filename}`),
		);
	}

	async showWithObject({ params, response }) {
		return response.download(
			Helpers.publicPath(`${Env.get('UPLOADS_PATH')}/${params.object}/${params.filename}`),
		);
	}
}

module.exports = UploadController;
