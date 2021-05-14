/** @type {import('@adonisjs/framework/src/Config')} */
const Config = use('Config');
/** @type {import('@adonisjs/lucid/src/Lucid/Model')} */
const City = use('App/Models/City');
/** @type {import('@adonisjs/lucid/src/Lucid/Model')} */
const State = use('App/Models/State');
const fetch = require('node-fetch');
const mocks = require('../utils/mocks');

class CitySeeder {
	constructor() {
		this.environment = Config.get('app.appEnv');
		this.originUrl = 'https://servicodados.ibge.gov.br/api/v1/localidades/distritos';
		this.mockedData = {
			cities: mocks.cities,
			states: mocks.states,
		};
	}

	async cleanDatabase() {
		await City.query().delete();
		await State.query().delete();
	}

	async getData() {
		if (this.environment === 'production') {
			const data = await fetch(this.originUrl).then((response) => response.json());
			return this.transform(data);
		}

		return this.mockedData;
	}

	async cleanCache() {
		if (this.environment === 'production') {
			await State.invalidateCache();
		}
	}

	transform(data) {
		return data.reduce(
			(acc, item) => {
				const uf = item.municipio['regiao-imediata']['regiao-intermediaria'].UF;

				if (!acc.states.find((state) => state.id === uf.id)) {
					acc.states.push({
						id: Number(uf.id),
						name: uf.nome,
						initials: uf.sigla,
					});
				}

				if (!acc.cities.find((city) => city.id === item.municipio.id)) {
					acc.cities.push({
						id: Number(item.municipio.id),
						state_id: Number(uf.id),
						state_initials: uf.sigla,
						name: item.municipio.nome,
					});
				}

				return acc;
			},
			{ states: [], cities: [] },
		);
	}

	async save({ states, cities }) {
		await State.query().insert(states);
		await City.query().insert(cities);
		await this.cleanCache();
	}

	async run() {
		await this.cleanDatabase();
		const data = await this.getData();
		await this.save(data);
	}
}

module.exports = CitySeeder;
