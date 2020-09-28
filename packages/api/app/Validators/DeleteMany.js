const BaseValidator = use('App/Validators/BaseValidator');

class DeleteMany extends BaseValidator {
	get rules() {
		const get_resource = this.ctx.request.url().split('/')[1];
		const resource = get_resource;
		return {
			ids: 'required',
			'ids.*': `exists:${resource},id`,
		};
	}

	get data() {
		const requestBody = this.ctx.request.all();
		const { ids } = this.ctx.request.params;

		return { ...requestBody, ids };
	}
}

module.exports = DeleteMany;
