const BaseValidator = use('App/Validators/BaseValidator');

class UpdateInstitution extends BaseValidator {
	get rules() {
		const { id: institutionId } = this.ctx.params;

		return {
			name: 'string',
			initials: 'string',
			cnpj: `cnpj|unique:institutions,cnpj,id,${institutionId}`,
			address: 'string',
			district: 'string',
			zipcode: 'string',
			city: 'string',
			state: 'string',
			lat: 'string',
			lng: 'string',
		};
	}
}

module.exports = UpdateInstitution;
