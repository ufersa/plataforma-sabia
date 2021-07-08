/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');
/** @type {import('@adonisjs/lucid/src/Lucid/Model')} */
const Term = use('App/Models/Term');
/** @type {import('@adonisjs/lucid/src/Lucid/Model')} */
const Location = use('App/Models/Location');
/** @type {import('@adonisjs/lucid/src/Lucid/Model')} */
const Technology = use('App/Models/Technology');
/** @type {import('@adonisjs/lucid/src/Lucid/Model')} */
const TechnologyLocation = use('App/Models/TechnologyLocation');

class MigrateLocationTermsToTechnologyLocationSchema extends Schema {
	up() {
		this.schedule(async () => {
			const termsLocations = await Term.query()
				.with('metas')
				.whereHas('taxonomy', (builder) => {
					builder.where('taxonomy', 'GOOGLE_PLACE');
				})
				.fetch();
			for await (const termLocation of termsLocations.toJSON()) {
				const locationParsed = termLocation.metas.reduce((obj, meta) => {
					const { meta_key, meta_value } = meta;
					obj[meta_key] = meta_value;
					return obj;
				}, {});

				const location = await Location.findOrCreate(
					{ place_id: locationParsed.placeId },
					{
						place_id: locationParsed.placeId,
						address: locationParsed.description,
						lat: locationParsed.latitude,
						lng: locationParsed.longitude,
					},
				);
				const technologyWithLocationTerm = await Technology.query()
					.whereHas('terms', (builder) => {
						builder.where('id', termLocation.id);
					})
					.first();

				if (technologyWithLocationTerm) {
					await TechnologyLocation.findOrCreate(
						{
							technology_id: technologyWithLocationTerm.id,
							location_id: location.id,
							location_type: termLocation.term,
						},
						{
							technology_id: technologyWithLocationTerm.id,
							location_id: location.id,
							location_type: termLocation.term,
						},
					);
				}
			}
		});
	}

	down() {
		// do nothing
	}
}

module.exports = MigrateLocationTermsToTechnologyLocationSchema;
