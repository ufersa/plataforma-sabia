/*
|--------------------------------------------------------------------------
| LocationSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/framework/src/Config')} */
const Config = use('Config');
/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');
/** @type {import('@adonisjs/lucid/src/Lucid/Model')} */
const City = use('App/Models/City');
/** @type {import('@adonisjs/lucid/src/Lucid/Model')} */
const Term = use('App/Models/Term');
/** @type {import('@adonisjs/lucid/src/Lucid/Model')} */
const Location = use('App/Models/Location');
/** @type {import('@adonisjs/lucid/src/Lucid/Model')} */
const Technology = use('App/Models/Technology');
/** @type {import('@adonisjs/lucid/src/Lucid/Model')} */
const TechnologyLocation = use('App/Models/TechnologyLocation');
class LocationSeeder {
	constructor() {
		this.environment = Config.get('app.appEnv');
	}

	async run() {
		if (this.environment === 'development') {
			const getRandom = (list) => {
				return list.rows[Math.floor(Math.random() * list.rows.length)];
			};
			const locations = await Factory.model('App/Models/Location').createMany(20);
			const cities = await await City.query()
				.limit(20)
				.fetch();
			await Promise.all(
				locations.map(async (location) => {
					const city = getRandom(cities);
					await location.city().associate(city);
				}),
			);
		}
		if (this.environment === 'production') {
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
		}
	}
}

module.exports = LocationSeeder;
