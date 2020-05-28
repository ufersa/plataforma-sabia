const BaseValidator = use('App/Validators/BaseValidator');

class StoreTechnology extends BaseValidator {
	get rules() {
		return {
			title: 'required',
			description: 'required',
			private: 'required',
			thumbnail: 'required',
			likes: 'required',
			patent: 'required',
			primary_purpose: 'required',
			application_mode: 'required',
			installation_time: 'required',
			solves_problem: 'required',
			entailes_problem: 'required',
		};
	}
}

module.exports = StoreTechnology;
