/** @type {import('@adonisjs/lucid/src/Lucid/Model')} */
const City = use('App/Models/City');
/** @type {import('@adonisjs/lucid/src/Lucid/Model')} */
const State = use('App/Models/State');
const fetch = require('node-fetch');

class CitySeeder {
	constructor() {
		this.originUrl = 'https://servicodados.ibge.gov.br/api/v1/localidades/distritos';
	}

	async run() {
		if ((await City.getCount()) > 0 || (await State.getCount()) > 0) {
			return;
		}

		const districts = await fetch(this.originUrl).then((response) => response.json());

		const { states, cities } = await districts.reduce(
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
						state_name: uf.nome,
						state_initials: uf.sigla,
						name: item.municipio.nome,
					});
				}

				return acc;
			},
			{ states: [], cities: [] },
		);

		await State.query().insert(states);
		await City.query().insert(cities);
	}
}

module.exports = CitySeeder;
