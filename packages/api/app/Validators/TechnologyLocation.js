const BaseValidator = use('App/Validators/BaseValidator');
const { technologyLocationsTypes } = require('../Utils');

class TechnologyLocation extends BaseValidator {
	get rules() {
		return {
			locations: 'array',
			'locations.*.location_id': 'number|exists:locations,id',
			'locations.*.location_type': `string|in:${Object.values(
				technologyLocationsTypes,
			).join()}`,
		};
	}
}

module.exports = TechnologyLocation;
