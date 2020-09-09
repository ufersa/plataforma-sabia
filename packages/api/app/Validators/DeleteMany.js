const BaseValidator = use('App/Validators/BaseValidator');

class DeleteMany extends BaseValidator {
	get rules() {
		return {
			ids: 'required',
		};
	}

	get data() {
		const requestBody = this.ctx.request.all();
		const { ids } = this.ctx.request.params;

		return { ...requestBody, ids };
	}
}

module.exports = DeleteMany;
