/*
|--------------------------------------------------------------------------
| TermSeeder
|--------------------------------------------------------------------------
|
| Creates default terms for taxonomies
|
*/
const Taxonomy = use('App/Models/Taxonomy');
class TermSeeder {
	async run() {
		/**
		 * KEYWORDS: Keywords has no default terms
		 */

		/**
		 * CLASSIFICATION
        Avanços tecnológicos
        Tecnologias Sociais
        Inovações sociais
		 */
		const classificationTaxonomy = await Taxonomy.getTaxonomy('CLASSIFICATION');

		await classificationTaxonomy
			.terms()
			.createMany([
				{ term: 'Avanços tecnológicos' },
				{ term: 'Tecnologias Sociais' },
				{ term: 'Inovações sociais' },
			]);

		/**
		 * STAGE
        Tecnologia em operação
        Colocação da tecnologia em operação
        Demonstração da tecnologia
		 */
		const stageTaxonomy = await Taxonomy.getTaxonomy('STAGE');

		await stageTaxonomy
			.terms()
			.createMany([
				{ term: 'Tecnologia em operação' },
				{ term: 'Colocação da tecnologia em operação' },
				{ term: 'Demonstração da tecnologia' },
			]);

		/**
		 * DIMENSION
        Ambiental
        Social
        Econômica
        Cultural
        Política
		 */
		const dimensionTaxonomy = await Taxonomy.getTaxonomy('DIMENSION');

		await dimensionTaxonomy
			.terms()
			.createMany([
				{ term: 'Ambiental' },
				{ term: 'Social' },
				{ term: 'Econômica' },
				{ term: 'Cultural' },
				{ term: 'Política' },
			]);

		/**
		 * CATEGORY AND SUBCATEGORIES
		    SubCategories are a Category Term with parent_id
		 */
		const categoryTaxonomy = await Taxonomy.getTaxonomy('CATEGORY');

		/**
		 * a) Semiárido e Recursos Hídricos;
		 * I. Oferta de Água/Armazenamento
		 * II. Coleta de água de chuva
		 * III. Manejo de aquíferos
		 * IV. Demanda de Água/Usos Sustentáveis (o tema reuso será tratado neste subitem
		 * V. Qualidade da Água/ Dessalinização.
		 * VII. Outros
		 * */
		const srhTerm = await categoryTaxonomy
			.terms()
			.create({ term: 'Semiárido e Recursos Hídricos' });

		await categoryTaxonomy.terms().createMany([
			{
				term: 'Oferta de Água/Armazenamento',
				parent_id: srhTerm.id,
			},
			{
				term: 'Coleta de água de chuva',
				parent_id: srhTerm.id,
			},
			{
				term: 'Manejo de aquíferos',
				parent_id: srhTerm.id,
			},
			{
				term: 'Demanda de Água/Usos Sustentáveis (o tema reuso será tratado neste subitem',
				parent_id: srhTerm.id,
			},
			{
				term: 'Qualidade da Água/ Dessalinização.',
				parent_id: srhTerm.id,
			},
			{
				term: 'Outros.',
				parent_id: srhTerm.id,
			},
		]);

		/**
		 * b) Semiárido e Agricultura de Sequeiro;
		 * I. Culturas mais resistentes a secas
		 * II. Melhorias genéticas de culturas do semiárido
		 * III. Técnicas para melhorar o meio ambiente e recursos naturais
		 * IV. Sistemas de produção de sequeiro
		 * */
		const sasTerm = await categoryTaxonomy
			.terms()
			.create({ term: 'Semiárido e Agricultura de Sequeiro' });

		await categoryTaxonomy.terms().createMany([
			{
				term: 'Culturas mais resistentes a secas',
				parent_id: sasTerm.id,
			},
			{
				term: 'Melhorias genéticas de culturas do semiárido',
				parent_id: sasTerm.id,
			},
			{
				term: 'Técnicas para melhorar o meio ambiente e recursos naturais',
				parent_id: sasTerm.id,
			},
			{
				term: 'Sistemas de produção de sequeiro',
				parent_id: sasTerm.id,
			},
		]);

		/**
		 * c) Semiárido e Agricultura Irrigada;
		 * I. Como poupar água
		 * II. Como reduzir uso de inseticidas
		 * III. Como evitar salinização
		 * IV. Outros
		 * */
		const saiTerm = await categoryTaxonomy
			.terms()
			.create({ term: 'Semiárido e Agricultura Irrigada' });

		await categoryTaxonomy.terms().createMany([
			{
				term: 'Como poupar água',
				parent_id: saiTerm.id,
			},
			{
				term: 'Como reduzir uso de inseticidas',
				parent_id: saiTerm.id,
			},
			{
				term: 'Como evitar salinização',
				parent_id: saiTerm.id,
			},
			{
				term: 'Outros',
				parent_id: saiTerm.id,
			},
		]);

		/**
		 * d) Semiárido e Pecuária;
		 * I. Pequenos animais
		 * II. Produção de forragem
		 * III. Pecuária e meio ambiente
		 * */
		const sepTerm = await categoryTaxonomy.terms().create({ term: 'Semiárido e Pecuária' });

		await categoryTaxonomy.terms().createMany([
			{
				term: 'Pequenos animais',
				parent_id: sepTerm.id,
			},
			{
				term: 'Produção de forragem',
				parent_id: sepTerm.id,
			},
			{
				term: 'Pecuária e meio ambiente',
				parent_id: sepTerm.id,
			},
		]);

		/**
		 * e) Semiárido e Aquicultura;
		 * I. Criação de peixes
		 * II. Criação de camarões
		 * III. Soluções ambientais para a aquicultura
		 * */
		const seaTerm = await categoryTaxonomy.terms().create({ term: 'Semiárido e Aquicultura' });

		await categoryTaxonomy.terms().createMany([
			{
				term: 'Criação de peixes',
				parent_id: seaTerm.id,
			},
			{
				term: 'Criação de camarões',
				parent_id: seaTerm.id,
			},
			{
				term: 'Soluções ambientais para a aquicultura',
				parent_id: seaTerm.id,
			},
		]);

		/**
		 * f) Semiárido e Uso e Manejo Sustentável dos Recursos Naturais e Conservação da Biodiversidade;
		 * I. Biodiversidade
		 * II. Conservação de espécies ameaçadas
		 * III. Controle de invasoras
		 * IV. Manejo florestal V. Solo da floresta e solo não madeireiro
		 * VI. Apicultura e meliponicultura
		 * VII. Bioprospecção
		 * VIII. Conservação
		 * IX. Patrimônio genético
		 * X. Recursos minerais, arqueológicos, paleontológicos, especeológicos
		 * */
		const smsTerm = await categoryTaxonomy.terms().create({
			term:
				'Semiárido e Uso e Manejo Sustentável dos Recursos Naturais e Conservação da Biodiversidade',
		});

		await categoryTaxonomy.terms().createMany([
			{
				term: 'Biodiversidade',
				parent_id: smsTerm.id,
			},
			{
				term: 'Conservação de espécies ameaçadas',
				parent_id: smsTerm.id,
			},
			{
				term: 'Controle de invasoras',
				parent_id: smsTerm.id,
			},
			{
				term: 'Manejo florestal V. Solo da floresta e solo não madeireiro',
				parent_id: smsTerm.id,
			},
			{
				term: 'Apicultura e meliponicultura',
				parent_id: smsTerm.id,
			},
			{
				term: 'Bioprospecção',
				parent_id: smsTerm.id,
			},
			{
				term: 'Conservação',
				parent_id: smsTerm.id,
			},
			{
				term: 'Patrimônio genético',
				parent_id: smsTerm.id,
			},
			{
				term: 'Recursos minerais, arqueológicos, paleontológicos, especeológicos',
				parent_id: smsTerm.id,
			},
		]);

		/**
		 * h) Semiárido e Recuperação de Áreas Degradadas ou em Processo de Desertificação;
		 * I. Recuperação de microbacias
		 * II. Reflorestamento
		 * III. Controle de erosão
		 * IV. Recuperação de bacias hidrográficas
		 * */
		const spdTerm = await categoryTaxonomy.terms().create({
			term: 'Semiárido e Recuperação de Áreas Degradadas ou em Processo de Desertificação',
		});

		await categoryTaxonomy.terms().createMany([
			{
				term: 'Recuperação de microbacias',
				parent_id: spdTerm.id,
			},
			{
				term: 'Reflorestamento',
				parent_id: spdTerm.id,
			},
			{
				term: 'Controle de erosão',
				parent_id: spdTerm.id,
			},
			{
				term: 'Recuperação de bacias hidrográficas',
				parent_id: spdTerm.id,
			},
		]);

		/**
		 * i) Semiárido e Sistemas de Produção;
		 * I. Sistemas de produção adaptados ao semiárido
		 * II. Sistemas agro-silvo-pecuários
		 * III. Aumento do potencial das caatingas
		 * */
		const sspTerm = await categoryTaxonomy
			.terms()
			.create({ term: 'Semiárido e Sistemas de Produção' });

		await categoryTaxonomy.terms().createMany([
			{
				term: 'Sistemas de produção adaptados ao semiárido',
				parent_id: sspTerm.id,
			},
			{
				term: 'Sistemas agro-silvo-pecuários',
				parent_id: sspTerm.id,
			},
			{
				term: 'Aumento do potencial das caatingas',
				parent_id: sspTerm.id,
			},
		]);

		/**
		 * j) Semiárido e Atividades Agrícolas.
		 * I. Agroindústria
		 * II. Indústria
		 * III. Turismo
		 * IV. Artesanato
		 * V. outros.
		 * */
		const saaTerm = await categoryTaxonomy.terms().create({
			term: 'Semiárido e Atividades Agrícolas',
		});

		await categoryTaxonomy.terms().createMany([
			{
				term: 'Agroindústria',
				parent_id: saaTerm.id,
			},
			{
				term: 'Indústria',
				parent_id: saaTerm.id,
			},
			{
				term: 'Turismo',
				parent_id: saaTerm.id,
			},
			{
				term: 'Artesanato',
				parent_id: saaTerm.id,
			},
			{
				term: 'Outros',
				parent_id: saaTerm.id,
			},
		]);

		/**
		 * k) Saneamento Básico
		 * I. Redução de perdas na distribuição de água
		 * II. Adução
		 * III. Tratamento de água
		 * IV. Tratamento de esgotos
		 * V. Destinação de resíduos sólidos
		 * */
		const sabTerm = await categoryTaxonomy.terms().create({
			term: 'Saneamento Básico',
		});

		await categoryTaxonomy.terms().createMany([
			{
				term: 'Redução de perdas na distribuição de água',
				parent_id: sabTerm.id,
			},
			{
				term: 'Adução',
				parent_id: sabTerm.id,
			},
			{
				term: 'Tratamento de água',
				parent_id: sabTerm.id,
			},
			{
				term: 'Tratamento de esgotos',
				parent_id: sabTerm.id,
			},
			{
				term: 'Destinação de resíduos sólidos',
				parent_id: sabTerm.id,
			},
		]);

		/**
		 * l) Educação
		 * I. Educação contextualizada no Semiárido
		 * II. Educação em tempo integral
		 * III. Educação e calendário agrícola
		 * */
		const eduTerm = await categoryTaxonomy.terms().create({
			term: 'Educação',
		});

		await categoryTaxonomy.terms().createMany([
			{
				term: 'Educação contextualizada no Semiárido',
				parent_id: eduTerm.id,
			},
			{
				term: 'Educação em tempo integral',
				parent_id: eduTerm.id,
			},
			{
				term: 'Educação e calendário agrícola',
				parent_id: eduTerm.id,
			},
		]);

		/**
		 * TARGET_AUDIENCE
        Agricultores
        Empresários
        Estudantes
        Prefeituras
		 */
		const targetAudienceTaxonomy = await Taxonomy.getTaxonomy('TARGET_AUDIENCE');

		await targetAudienceTaxonomy
			.terms()
			.createMany([
				{ term: 'Agricultores' },
				{ term: 'Empresários' },
				{ term: 'Estudantes' },
				{ term: 'Prefeituras' },
			]);

		/**
		 * FINANCING_TYPES
        Público
        Privado
        Crowdfunding
		 */
		const financingTypesTaxonomy = await Taxonomy.getTaxonomy('FINANCING_TYPES');

		await financingTypesTaxonomy
			.terms()
			.createMany([{ term: 'Público' }, { term: 'Privado' }, { term: 'Crowdfunding' }]);

		/**
		 * COST_TYPE
        Serviço
        Material
        Equipamento
        Pessoal
        Insumos
		 */
		const costTypeTaxonomy = await Taxonomy.getTaxonomy('COST_TYPE');

		await costTypeTaxonomy
			.terms()
			.createMany([
				{ term: 'Serviço' },
				{ term: 'Material' },
				{ term: 'Equipamento' },
				{ term: 'Pessoal' },
				{ term: 'Insumos' },
			]);

		/**
		 * COST_DEFINITION
        Desenvolvimento
        Implantação
        Manutenção
		 */
		const costDefinitionTaxonomy = await Taxonomy.getTaxonomy('COST_DEFINITION');

		await costDefinitionTaxonomy
			.terms()
			.createMany([
				{ term: 'Desenvolvimento' },
				{ term: 'Implantação' },
				{ term: 'Manutenção' },
			]);

		/**
		 * COST_UNIT        
        Real
        Dolar
		 */
		const costUnitTaxonomy = await Taxonomy.getTaxonomy('COST_UNIT');

		await costUnitTaxonomy.terms().createMany([{ term: 'Real' }, { term: 'Dólar' }]);

		/**
		 * GEOREFERENCING_TYPE
       Desenvolvida
       Aplicada
       Implantada
		 */
		const georeferencingTypeTaxonomy = await Taxonomy.getTaxonomy('GEOREFERENCING_TYPE');

		await georeferencingTypeTaxonomy
			.terms()
			.createMany([{ term: 'Desenvolvida' }, { term: 'Aplicada' }, { term: 'Implantada' }]);

		/**
		 * ATTACHMENT_TYPE
        Imagem
        Vídeo
        Diagrama
        Documento
		 */
		const attachmentTypeTaxonomy = await Taxonomy.getTaxonomy('ATTACHMENT_TYPE');

		await attachmentTypeTaxonomy
			.terms()
			.createMany([
				{ term: 'Imagem' },
				{ term: 'Vídeo' },
				{ term: 'Diagrama' },
				{ term: 'Documento' },
			]);

		/**
		 * CONTACT_TYPE
        Assistência técnica
        Instituição desenvolvedora
        Desenvolvedor
		 */
		const contactTypeTaxonomy = await Taxonomy.getTaxonomy('CONTACT_TYPE');

		await contactTypeTaxonomy
			.terms()
			.createMany([
				{ term: 'Assistência técnica' },
				{ term: 'Instituição desenvolvedora' },
				{ term: 'Desenvolvedor' },
			]);

		/**
		 * DEGREE
        Especialista em análise de solo
        Técnico em perfuração de poços
		 */
		const degreeTaxonomy = await Taxonomy.getTaxonomy('DEGREE');

		await degreeTaxonomy
			.terms()
			.createMany([
				{ term: 'Especialista em análise de solo' },
				{ term: 'Técnico em perfuração de poços' },
			]);
	}
}

module.exports = TermSeeder;
