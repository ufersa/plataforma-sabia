const BaseValidator = use('App/Validators/BaseValidator');
const { technologyLocationsTypes } = require('../Utils');

class TechnologyLocation extends BaseValidator {
	get rules() {
		return {
			locations: 'array',
			'locations.*.location_id': 'required|number|exists:locations,id',
			'locations.*.location_type': `required|string|in:${Object.values(
				technologyLocationsTypes,
			).join()}`,
		};
	}
}

module.exports = TechnologyLocation;
