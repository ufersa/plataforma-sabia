const { technologiesTypes } = require('../Utils');

const BaseValidator = use('App/Validators/BaseValidator');

class StoreTechnology extends BaseValidator {
	get rules() {
		return {
			title: 'required',
			description: 'required',
			// private: 'required',
			// thumbnail: 'required',
			// likes: 'required',
			patent: 'required',
			// primary_purpose: 'required',
			// application_mode: 'required',
			installation_time: 'number|above:0',
			// solves_problem: 'required',
			// entailes_problem: 'required',
			type: `required|string|in:${Object.values(technologiesTypes).join()}`,
			public_domain: 'required|boolean',
			knowledge_area_id: 'required|number|exists:knowledge_areas,knowledge_area_id',
		};
	}
}

module.exports = StoreTechnology;
