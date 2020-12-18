/*
|--------------------------------------------------------------------------
| KnowledgeAreaSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Database = use('Database');
const Helpers = use('Helpers');
const fs = Helpers.promisify(require('fs'));

class KnowledgeAreaSeeder {
	async run() {
		const rawdata = await fs.readFile(Helpers.resourcesPath('json/knowledge_areas.json'));
		const areasJson = JSON.parse(rawdata);

		try {
			const areas = areasJson.map((area) => {
				let name;
				switch (area.NUMERO_NIVEL) {
					case 1:
						name = area.NOME_GRANDE_AREA;
						break;
					case 2:
						name = area.NOME_AREA;
						break;
					case 3:
						name = area.NOME_SUB_AREA;
						break;
					case 4:
						name = area.NOME_ESPECIALIDADE;
						break;
					default:
						throw new Error('Undefined Level');
				}
				return {
					knowledge_area_id: area.CODIGO_AREA_CONHECIMENTO,
					level: area.NUMERO_NIVEL,
					name,
					great_area_id: area.CODIGO_GRANDE_AREA ? area.CODIGO_GRANDE_AREA : null,
					area_id: area.CODIGO_AREA ? area.CODIGO_AREA : null,
					sub_area_id: area.CODIGO_SUB_AREA ? area.CODIGO_SUB_AREA : null,
					speciality_id: area.CODIGO_ESPECIALIDADE ? area.CODIGO_ESPECIALIDADE : null,
				};
			});
			await Database.table('knowledge_areas').insert(areas);
		} catch (error) {
			console.log(error);
		}
	}
}

module.exports = KnowledgeAreaSeeder;
