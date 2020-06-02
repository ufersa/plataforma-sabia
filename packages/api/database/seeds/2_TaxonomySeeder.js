/*
|--------------------------------------------------------------------------
| TaxonomySeeder
|--------------------------------------------------------------------------
|
| Creates a Taxonomy List
|
|
*/
const Taxonomy = use('App/Models/Taxonomy');
class TaxonomySeeder {
	async run() {
		const taxonomies = [
			{
				taxonomy: 'CATEGORY',
				description:
					'Categoria a qual pertence a tecnologia. Se o termo possuir um pai (parent_id), trata-se de uma subcategoria',
			},
			{
				taxonomy: 'KEYWORDS',
				description: 'Palavras-chave que definem a tecnologia.',
			},
			{
				taxonomy: 'CLASSIFICATION',
				description: 'Classificação da tecnologia.',
			},
			{
				taxonomy: 'STAGE',
				description:
					'Estágio de desenvolvimento da tecnologia baseado o TRL (Nível de Maturidade Tecnológica)',
			},
			{
				taxonomy: 'DIMENSION',
				description: 'Dimensão da Tecnologia',
			},
			{
				taxonomy: 'TARGET_AUDIENCE',
				description: 'Público-alvo da tecnologia',
			},
			{
				taxonomy: 'BIOME',
				description: 'Bioma no qual se insere a tecnologia (Caatinga, Zona da Mata, etc)',
			},
			{
				taxonomy: 'GOVERNMENT_PROGRAM',
				description:
					'Programas de governos (Bolsa Família, Mais Nordeste, etc) dos quais faz parte a tecnologia',
			},
			{
				taxonomy: 'INTELLECTUAL_PROPERTY',
				description: 'Propriedade intelectual da tecnologia',
			},
		];
		await Taxonomy.createMany(taxonomies);
	}
}

module.exports = TaxonomySeeder;
