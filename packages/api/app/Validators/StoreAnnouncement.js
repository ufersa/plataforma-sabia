const BaseValidator = use('App/Validators/BaseValidator');

class StoreAnnouncement extends BaseValidator {
	get rules() {
		return {
			institution_id: 'required|number|exists:institutions,id',
			announcement_number: 'required|string',
			title: 'required|string',
			description: 'required|string',
			targetAudiences: 'required|array',
			keywords: 'array|required',
			financial_resources: 'number',
			start_date: 'required|string',
			end_date: 'required|string',
			comment: 'string',
			url: 'required|url',
		};
	}
}

module.exports = StoreAnnouncement;
