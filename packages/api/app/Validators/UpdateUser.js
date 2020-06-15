const BaseValidator = use('App/Validators/BaseValidator');

class UpdateUser extends BaseValidator {
	get rules() {
		const userId = this.ctx.params.id;

		return {
			email: `unique:users,email,id,${userId}`,
		};
	}
}

module.exports = UpdateUser;
