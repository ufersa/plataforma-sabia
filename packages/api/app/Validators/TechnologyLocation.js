const BaseValidator = use('App/Validators/BaseValidator');

class TechnologyLocation extends BaseValidator {
	get rules() {
		return {
			locations: 'required|array',
			'locations.*': 'number|exists:locations,id',
		};
	}
}

module.exports = TechnologyLocation;
