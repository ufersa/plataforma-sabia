import { STATUS as technologyStatusEnum } from './enums/technology.enums';

/**
 * Normalizes the term for the technology form.
 *
 * @param {object} terms The raw terms coming from the api.
 *
 * @returns {object} normalized terms.
 */
export const normalizeTerms = (terms) => {
	const normalizedTerms = {};
	const normalizedTermsObject = {};

	// unique taxonomies
	let taxonomies = terms.map(({ taxonomy }) => taxonomy);
	taxonomies = Array.from(new Set(terms.map(({ taxonomy }) => taxonomy.id))).map((id) =>
		taxonomies.find((taxonomy) => taxonomy.id === id),
	);

	taxonomies.forEach((taxonomy) => {
		normalizedTerms[taxonomy.taxonomy.toLowerCase()] = [];
		normalizedTermsObject[taxonomy.taxonomy.toLowerCase()] = [];
	});

	terms.forEach((term) => {
		const taxonomy = term.taxonomy.taxonomy.toLowerCase();
		normalizedTerms[taxonomy].push(term.id);
		normalizedTermsObject[taxonomy].push(term);
	});

	if (normalizedTerms.category) {
		normalizedTerms.subcategory = normalizedTermsObject.category
			.filter((category) => category.parent_id > 0)
			.map((category) => category.id);

		normalizedTerms.category = normalizedTermsObject.category
			.filter((category) => !category.parent_id)
			.map((category) => category.id);
	}

	return normalizedTerms;
};

/**
 * Gets slug and term from technology development stage.
 *
 * @param {Array} terms The raw terms coming from the api.
 *
 * @returns {object} normalized readiness level.
 */
export const normalizeTrl = (terms = []) => {
	const { term = '', slug = '' } =
		terms.find((item) => item.taxonomy?.taxonomy === 'STAGE') || {};

	return { term, slug };
};

/**
 * Normalizes the taxonomies for the technology details.
 *
 * @param {Array} terms The raw terms coming from the api.
 *
 * @returns {object} normalized taxonomies.
 */
export const normalizeTaxonomies = (terms) => {
	if (!terms?.length) {
		return null;
	}

	let normalizedTaxonomies = {};

	normalizedTaxonomies = terms?.map((term) => ({
		key: term?.taxonomy?.taxonomy,
		value: term?.term,
	}));

	normalizedTaxonomies = Object.values(
		normalizedTaxonomies.reduce((acc, { key, value }) => {
			acc[key] = acc[key] || { key, value: [] };
			acc[key].value.push(value);
			return acc;
		}, {}),
	).reduce((arr, { key, value }) => ({ ...arr, [key.toLowerCase()]: [...value].join(', ') }), {});

	return normalizedTaxonomies;
};

/**
 * Normalize costs coming from the api.
 *
 * @param {object} costs The raw costs comming from the api.
 *
 * @returns {object} Normalized costs.
 */
export const normalizeCosts = (costs) => {
	const normalizedCosts = {};

	costs.forEach((cost) => {
		const { cost_type, ...rest } = cost;

		if (!normalizedCosts[cost_type]) {
			normalizedCosts[cost_type] = [];
		}

		normalizedCosts[cost_type].push(rest);
	});

	return normalizedCosts;
};

/**
 * Prepares costs data for submission.
 *
 * @param {object} costsData The unormalized costs coming from the technology form.
 *
 * @returns {object}
 */
export const prepareCosts = (costsData) => {
	const keys = Object.keys(costsData);

	if (keys.length === 0) {
		return {};
	}

	const normalizedCosts = {};

	keys.forEach((key) => {
		const rawData = costsData[key];
		let normalizedData = rawData;

		if (normalizedData?.value) {
			normalizedData = normalizedData.value;
		}

		normalizedCosts[key] = normalizedData;
	});

	const groups = ['development_costs', 'implementation_costs', 'maintenance_costs'];

	const individualCosts = [];

	groups.forEach((group) => {
		const groupData =
			normalizedCosts?.costs && normalizedCosts.costs[group]
				? normalizedCosts.costs[group]
				: false;

		if (groupData) {
			groupData.forEach((individualCost) => {
				individualCost.type = individualCost.type.value;
				individualCost.measure_unit = individualCost.measure_unit.value;
				if (individualCost.id) {
					individualCost.id = parseInt(individualCost.id, 10);
				} else {
					delete individualCost.id;
				}
				individualCosts.push({
					cost_type: group,
					...individualCost,
				});
			});

			delete normalizedCosts.costs[group];
		}
	});

	normalizedCosts.costs = individualCosts;

	return normalizedCosts;
};

/**
 * Prepares terms coming from the technology form for submission
 *
 * @param {*} termsObject The array of terms.
 *
 * @returns {Array}
 */
export const prepareTerms = (termsObject) => {
	const terms = [];

	const termKeys = Object.keys(termsObject);
	termKeys.forEach((termKey) => {
		const term = termsObject[termKey];

		if (Array.isArray(term)) {
			const ids = term.map((t) => {
				if (typeof t === 'string' || typeof t === 'number') {
					return t;
				}
				return t.value;
			});
			terms.push(...ids);
		} else if (term) {
			terms.push(term.value);
		}
	});

	return terms;
};

/**
 * Normalize attachments coming from the api.
 *
 * @param {object} attachments The raw attachments comming from the api.
 * @returns {{images: [], documents: []}} Normalized attachments.
 */
export const normalizeAttachments = (attachments) => ({
	images: attachments.filter((file) => file.url.indexOf('.pdf') === -1),
	documents: attachments.filter((file) => file.url.indexOf('.pdf') !== -1),
});

/**
 * Normalizes knowledge areas from API to fill technology form using react-hook-form fields array pattern
 *
 * @param {object} knowledgeArea Knowledge area object
 * @returns {object} Normalized areas for react-hook-form use
 */
export const normalizeKnowledgeAreas = (knowledgeArea) => {
	const fields = ['greatArea', 'area', 'subArea', 'speciality'];

	return fields.reduce(
		(acc, field) => ({
			knowledge_area_id: [
				...(acc.knowledge_area_id || []),
				knowledgeArea?.[field]?.knowledge_area_id ?? null,
			],
		}),
		{},
	);
};

/**
 * Returns technology status label text based on status key
 *
 * @param {string} value The technology status key
 * @returns {string} Technology status label text
 */
export const getTechnologyStatus = (value) =>
	({
		[technologyStatusEnum.DRAFT]: 'Rascunho',
		[technologyStatusEnum.PENDING]: 'Pendente',
		[technologyStatusEnum.IN_REVIEW]: 'Em revisão',
		[technologyStatusEnum.REQUESTED_CHANGES]: 'Mudanças solicitadas',
		[technologyStatusEnum.CHANGES_MADE]: 'Mudanças realizadas',
		[technologyStatusEnum.APPROVED]: 'Aprovada',
		[technologyStatusEnum.REJECTED]: 'Rejeitada',
		[technologyStatusEnum.PUBLISHED]: 'Publicada',
	}[value]);

/**
 * Returns review status text based on status key
 *
 * @param {string} value The status key
 * @returns {string} Status text
 */
export const getCurationStatusText = (value) =>
	({
		[technologyStatusEnum.IN_REVIEW]: 'Aguardando análise',
		[technologyStatusEnum.REQUESTED_CHANGES]: 'Aguardando correção',
		[technologyStatusEnum.CHANGES_MADE]: 'Correção efetuada',
		[technologyStatusEnum.REJECTED]: 'Rejeitada',
		[technologyStatusEnum.APPROVED]: 'Aprovada',
		[technologyStatusEnum.PUBLISHED]: 'Publicada',
	}[value]);

export const statusReadyToCurate = [
	technologyStatusEnum.IN_REVIEW,
	technologyStatusEnum.CHANGES_MADE,
];
/**
 * Returns if technology can be curated based on status
 *
 * @param {string} status The technology current status
 * @returns {boolean} True if technology can be curated, false otherwise
 */
export const isTechnologyAbleToCurate = (status) => statusReadyToCurate.includes(status);

const fakeTechnologyData = {
	id: Math.ceil(Math.random() * 100),
	title: 'Agebavzi niko zaro.',
	slug: 'agebavzi-niko-zaro',
	description: 'Gec hik gir.',
	private: 1,
	thumbnail_id: null,
	likes: 1,
	patent: 0,
	patent_number: 'deXnvEMZ',
	primary_purpose: 'Rirut lavdes safbuz.',
	secondary_purpose: ['Fet', 'ejhagi', 'pa'],
	application_mode: 'Ci apa wovjejoru.',
	application_examples: 'Pumasaz sojkowi bikitmus.',
	installation_time: 465,
	solves_problem: 'Umfecet kig nepda.',
	entailes_problem: 'Jeit unape ni.',
	requirements: 'Ud aluja pipovucu.',
	risks: 'Ni kurbopriv zuwcot.',
	contribution: 'Gaoza nudta buru.',
	status: 'DRAFT',
	objectID: 'technology-1',
	active: 1,
	type: 'other',
	users: [
		{
			id: 11,
			email: 'sabiatestinge2e@gmail.com',
			status: 'verified',
			first_name: 'FirstName',
			last_name: 'LastName',
			lattes_id: null,
			role_id: 1,
			full_name: 'FirstName LastName',
		},
	],
	terms: [
		{
			id: 2,
			term: 'Tecnologias Sociais',
			slug: 'tecnologias-sociais',
			parent_id: null,
			taxonomy_id: 3,
			taxonomy: {
				id: 3,
				taxonomy: 'CLASSIFICATION',
				description: 'Classificação da tecnologia.',
			},
		},
		{
			id: 11,
			term: 'Nível 8 - Sistema real desenvolvido e aprovado',
			slug: 'nivel-8-sistema-real-desenvolvido-e-aprovado',
			parent_id: null,
			taxonomy_id: 4,
			taxonomy: {
				id: 4,
				taxonomy: 'STAGE',
				description: 'Estágio de desenvolvimento da)',
			},
		},
		{
			id: 17,
			term: 'Política',
			slug: 'politica',
			parent_id: null,
			taxonomy_id: 5,
			taxonomy: {
				id: 5,
				taxonomy: 'DIMENSION',
				description: 'Dimensão da Tecnologia',
			},
		},
		{
			id: 74,
			term: 'Educação',
			slug: 'educacao',
			parent_id: null,
			taxonomy_id: 1,
			taxonomy: {
				id: 1,
				taxonomy: 'CATEGORY',
				description: 'Categoria a qual pertencea',
			},
		},
		{
			id: 77,
			term: 'Educação e calendário agrícola',
			slug: 'educacao-e-calendario-agricola',
			parent_id: 74,
			taxonomy_id: 1,
			taxonomy: {
				id: 1,
				taxonomy: 'CATEGORY',
				description: 'Categoria a qual pertencea',
			},
		},
		{
			id: 78,
			term: 'Agricultores',
			slug: 'agricultores',
			parent_id: null,
			taxonomy_id: 6,
			taxonomy: {
				id: 6,
				taxonomy: 'TARGET_AUDIENCE',
				description: 'Público-alvo da tecnologia',
			},
		},
		{
			id: 82,
			term: 'Caatinga',
			slug: 'caatinga',
			parent_id: null,
			taxonomy_id: 7,
			taxonomy: {
				id: 7,
				taxonomy: 'BIOME',
				description: 'Bioma no qual se insere a tecnologia (Caatinga, Zona da Mata, etc)',
			},
		},
		{
			id: 85,
			term: 'Mais Nordeste',
			slug: 'mais-nordeste',
			parent_id: null,
			taxonomy_id: 8,
			taxonomy: {
				id: 8,
				taxonomy: 'GOVERNMENT_PROGRAM',
				description: 'Programas de governos (Bolsaa',
			},
		},
		{
			id: 87,
			term: 'Propriedade Intelectual 2',
			slug: 'propriedade-intelectual-2',
			parent_id: null,
			taxonomy_id: 9,
			taxonomy: {
				id: 9,
				taxonomy: 'INTELLECTUAL_PROPERTY',
				description: 'Propriedade intelectual da tecnologia',
			},
		},
	],
	reviews: [
		{
			id: 2,
			user_id: 3,
			technology_id: 1,
			content: 'Foduc ajen bicosho oze ke mahse.',
			rating: 2,
			positive: ['Reur ruun ompu.', 'Omlava daobiri tofge.'],
			negative: ['Pezdo votoz vacamsih.', 'Afofes ladibjes fejro hicbog.'],
			created_at: '2020-08-27 14:48:39',
			updated_at: '2020-08-27 14:43:39',
			user: {
				id: 3,
				email: 'awmefur@onufaip.gw',
				status: 'pending',
				first_name: 'f7auPLMd[5Mv',
				last_name: '5rYs6j(q',
				company: 'Wgh%Xyc9w#jF',
				zipcode: '26251',
				cpf: '29179319655',
				birth_date: '2097-09-09 12:37:43.255',
				phone_number: '17331688177',
				lattes_id: '04784609672',
				address: 'w!39E',
				address2: 'KKmmcpvbjRqX3J',
				district: '^E8K1',
				city: '4BimCM6XL(R[cJy7vG*',
				state: 'm@Cd)b(T7YyppGQ^7',
				country: 'x^l23WWSUJVfwf',
				role_id: 1,
				created_at: '2020-08-27 14:43:29',
				updated_at: '2020-08-27 14:43:29',
				full_name: 'f7auPLMd[5Mv 5rYs6j(q',
			},
		},
	],
	bookmarkUsers: [
		{
			id: 1,
			email: 'wikcu@ubi.uz',
			status: 'pending',
			first_name: 'H9F96LNQIGJT',
			last_name: 'zV$vWh0)@',
			company: 'RbSRxYJWQuhkkj)hsTs',
			zipcode: '60130',
			cpf: '82040962035',
			birth_date: '2020-04-11 05:19:40.206',
			phone_number: '99650883715',
			lattes_id: '58947968425',
			address: '1y%7([mWNr',
			address2: '$])]mBixzaNL',
			district: '6F2hPculXh(r*',
			city: '4m@u]mxnZBZ',
			state: '15l7o',
			country: '3oToGE^g$WVyp7i)ut',
			role_id: 1,
			full_name: 'H9F96LNQIGJT zV$vWh0)@',
		},
	],
	technologyCosts: {
		id: 1,
		funding_required: 1,
		funding_type: 'collective',
		funding_value: 44546307,
		funding_status: 'acquiring',
		notes: 'De sutuvga eca icecibjo.',
		technology_id: 1,
		costs: {
			maintenance_costs: [
				{
					id: 1,
					description: 'Jief osaser hepuchon.',
					type: 'equipment',
					quantity: 55,
					value: 5835540,
				},
				{
					id: 3,
					description: 'Ojohapras fitnegowu jalpenada cof.',
					type: 'service',
					quantity: 45,
					value: 3388497,
				},
			],
			implementation_costs: [
				{
					id: 2,
					description: 'Tofdezti bagavoh rutkorzum koba.',
					type: 'equipment',
					quantity: 28,
					value: 33763160,
				},
			],
		},
	},
	technologyResponsibles: {
		owner: {
			id: 11,
			full_name: 'FirstName LastName',
			email: 'sabiatestinge2e@gmail.com',
			phone_number: null,
			lattes_id: null,
			status: 'verified',
		},
		users: [
			{
				id: 12,
				full_name: 'FirstName LastName',
				email: 'sabiatesting@gmail.com',
				phone_number: null,
				lattes_id: null,
				status: 'pending',
			},
		],
	},
	attachments: [
		{
			id: 1,
			filename: 'image.png',
			url: 'http://127.0.0.1:3333/uploads/technologies/image.png',
		},
		{
			id: 2,
			filename: 'image-1.pdf',
			url: 'http://127.0.0.1:3333/uploads/technologies/image-1.pdf',
		},
	],
	thumbnail: null,
	videos: [
		{
			thumbnail: 'http://i3.ytimg.com/vi/8h7p88oySWY/hqdefault.jpg',
			link: 'https://www.youtube.com/watch?v=8h7p88oySWY',
			videoId: '8h7p88oySWY',
			provider: 'Youtube',
		},
	],
	taxonomies: {
		keywords: 'Antelope, Python, Jaguarundi, Olive Sea Snake, Woodswallow',
		classification: 'Tecnologias Sociais',
		stage: 'Nível 8 - Sistema real desenvolvido e aprovado',
		dimension: 'Política',
		category: 'Educação, Educação e calendário agrícola',
		target_audience: 'Agricultores',
		biome: 'Caatinga',
		government_program: 'Mais Nordeste',
		intellectual_property: 'Propriedade Intelectual 2',
	},
	keywords: [
		{
			id: 79,
			term: 'puregawabnedhol',
			slug: 'puregawabnedhol',
			parent_id: null,
			taxonomy_id: 2,
			created_at: '2021-03-12 21:46:35',
			updated_at: '2021-03-12 21:46:35',
			pivot: { term_id: 79, technology_id: 5 },
		},
		{
			id: 75,
			term: 'nepilovvaduguho',
			slug: 'nepilovvaduguho',
			parent_id: null,
			taxonomy_id: 2,
			created_at: '2021-03-12 21:46:35',
			updated_at: '2021-03-12 21:46:36',
			pivot: { term_id: 75, technology_id: 5 },
		},
	],
	knowledgeAreas: {
		knowledge_area_id: 10100008,
		level: 2,
		name: 'Matemática',
		great_area_id: 10000003,
		area_id: 10100008,
		sub_area_id: null,
		speciality_id: null,
		greatArea: {
			knowledge_area_id: 10000003,
			level: 1,
			name: 'Ciências Exatas e da Terra',
			great_area_id: 10000003,
			area_id: null,
			sub_area_id: null,
			speciality_id: null,
		},
		area: {
			knowledge_area_id: 10100008,
			level: 2,
			name: 'Matemática',
			great_area_id: 10000003,
			area_id: 10100008,
			sub_area_id: null,
			speciality_id: null,
		},
		subArea: null,
		speciality: null,
	},
};

/**
 * Get a fake technology for testing purposes
 *
 * @param {object} [append={}] Object to append in response.
 *
 * @returns {object} Fake technology data.
 */
export const getFakeTechnology = (append = {}) => ({
	...fakeTechnologyData,
	...append,
});

// Measure Units used on technology costs
export const unitsOptions = [
	{
		value: 'und',
		label: 'Unidade',
	},
	{
		value: 'cx',
		label: 'Caixa',
	},
	{
		value: 'pc',
		label: 'Pacote',
	},
	{
		value: 'sc',
		label: 'Saco',
	},
	{
		value: 'mil',
		label: 'Milheiro',
	},
	{
		value: 'mm',
		label: 'Milímetro',
	},
	{
		value: 'cm',
		label: 'Centímetro',
	},
	{
		value: 'm',
		label: 'Metro',
	},
	{
		value: 'km',
		label: 'Quilômetro',
	},
	{
		value: 'pol',
		label: 'Polegada',
	},
	{
		value: 'mg',
		label: 'Miligrama',
	},
	{
		value: 'g',
		label: 'Grama',
	},
	{
		value: 'kg',
		label: 'Quilograma',
	},
	{
		value: 'ml',
		label: 'Mililitro',
	},
	{
		value: 'l',
		label: 'Litro',
	},
	{
		value: 'gl',
		label: 'Galão',
	},
	{
		value: 'lt',
		label: 'Latão',
	},
	{
		value: 'm2',
		label: 'Metro Quadrado',
	},
	{
		value: 'm3',
		label: 'Metro cúbico',
	},
	{
		value: 'km2',
		label: 'Quilômetro quadrado',
	},
	{
		value: 'km3',
		label: 'Quilômetro cúbico',
	},
	{
		value: 'ha',
		label: 'Hectare',
	},
	{
		value: 'month',
		label: 'Mês',
	},
	{
		value: 'day',
		label: 'Dia',
	},
	{
		value: 'h',
		label: 'Hora',
	},
	{
		value: 'min',
		label: 'Minuto',
	},
	{
		value: 'others',
		label: 'Outro',
	},
];
