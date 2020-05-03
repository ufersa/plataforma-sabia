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
				taxonomy: 'CATEGORY',
				description:
					'Categoria a qual pertence a tecnologia. Se o termo possuir um pai (parent_id), trata-se de uma subcategoria',
			},
			{
				taxonomy: 'TARGET_AUDIENCE',
				description: 'Público-alvo da tecnologia',
			},
			{
				taxonomy: 'FINANCING_TYPES',
				description: 'Tipo de financiamento',
			},
			{
				taxonomy: 'COST_TYPE',
				description: 'Tipo de custo',
			},
			{
				taxonomy: 'COST_DEFINITION',
				description: 'Definição do Custo',
			},
			{
				taxonomy: 'COST_UNIT',
				description: 'Unidade de valor monetário',
			},
			{
				taxonomy: 'GEOREFERENCING_TYPE',
				description: 'Tipo do Georeferenciamento',
			},
			{
				taxonomy: 'ATTACHMENT_TYPE',
				description: 'Tipo do Anexo',
			},
			{
				taxonomy: 'CONTACT_TYPE',
				description: 'Tipo do contato',
			},
			{
				taxonomy: 'DEGREE',
				description: 'Titulação do contato',
			},
		];
		await Taxonomy.createMany(taxonomies);
	}
}

module.exports = TaxonomySeeder;
