import fetchMock from 'fetch-mock-jest';
import { getTaxonomies, getTaxonomyTerms } from '../taxonomy';

describe('getTaxonomies', () => {
	afterAll(() => {
		fetchMock.mockClear();
		fetchMock.mockReset();
	});

	const taxonomiesEndpoint = `path:/taxonomies`;
	const taxonomiesResponse = [
		{
			id: 1,
			taxonomy: 'CATEGORY',
			description:
				'Categoria a qual pertence a tecnologia. Se o termo possuir um pai (parent_id), trata-se de uma subcategoria',
			created_at: '2020-06-13 07:55:07',
			updated_at: '2020-06-13 07:55:07',
		},
		{
			id: 2,
			taxonomy: 'KEYWORDS',
			description: 'Palavras-chave que definem a tecnologia.',
			created_at: '2020-06-13 07:55:07',
			updated_at: '2020-06-13 07:55:07',
		},
		{
			id: 3,
			taxonomy: 'CLASSIFICATION',
			description: 'Classificação da tecnologia.',
			created_at: '2020-06-13 07:55:07',
			updated_at: '2020-06-13 07:55:07',
		},
	];

	const normalizedTaxonomiesResponse = {};
	taxonomiesResponse.forEach(({ taxonomy, ...fields }) => {
		normalizedTaxonomiesResponse[taxonomy.toLowerCase()] = fields;
	});

	fetchMock.get(taxonomiesEndpoint, { status: 200, body: taxonomiesResponse });

	test('fetches taxonomies successfuly', async () => {
		const taxonomies = await getTaxonomies({ embed: false, normalize: false });
		expect(taxonomies).toEqual(taxonomiesResponse);
		expect(fetchMock).toHaveFetched(taxonomiesEndpoint, {
			method: 'GET',
		});
	});

	test('fetches taxonomies successfuly and normalizes it', async () => {
		const taxonomies = await getTaxonomies({ embed: false, normalize: true });
		expect(taxonomies).toEqual(normalizedTaxonomiesResponse);
		expect(fetchMock).toHaveFetched(taxonomiesEndpoint, {
			method: 'GET',
		});
	});

	test('returns false if the request does not return status 200', async () => {
		fetchMock.mockReset();
		fetchMock.get(taxonomiesEndpoint, { status: 400, body: {} });
		const taxonomies = await getTaxonomies();
		expect(taxonomies).toBeFalsy();
	});
});

describe('getTaxonomyTerms', () => {
	afterAll(() => {
		fetchMock.mockClear();
		fetchMock.mockReset();
	});

	const termsEndpoint = /taxonomies\/(.*)\/terms/;
	const termsResponseData = [
		{
			id: 12,
			term: 'Recursos Hídricos',
			slug: 'recursos-hidricos',
			parent_id: null,
			taxonomy_id: 1,
			created_at: '2020-06-05 23:55:52',
			updated_at: '2020-06-05 23:55:52',
		},
		{
			id: 13,
			term: 'Oferta de Água/Armazenamento',
			slug: 'oferta-de-aguaarmazenamento',
			parent_id: 12,
			taxonomy_id: 1,
			created_at: '2020-06-05 23:55:52',
			updated_at: '2020-06-05 23:55:52',
		},
		{
			id: 14,
			term: 'Coleta de água de chuva',
			slug: 'coleta-de-agua-de-chuva',
			parent_id: 12,
			taxonomy_id: 1,
			created_at: '2020-06-05 23:55:52',
			updated_at: '2020-06-05 23:55:52',
		},
	];
	const normalizedTaxonomiesTermsResponse = {};
	termsResponseData.forEach(({ slug, ...fields }) => {
		normalizedTaxonomiesTermsResponse[slug.toLowerCase()] = fields;
	});

	test('fetches taxonomy terms successfuly', async () => {
		fetchMock.mockReset();
		fetchMock.get(termsEndpoint, { status: 200, body: termsResponseData });
		const terms = await getTaxonomyTerms('category', { embed: false, normalize: false });
		expect(terms).toEqual(termsResponseData);
		expect(fetchMock).toHaveFetched(termsEndpoint, {
			method: 'GET',
		});
	});

	test('fetches taxonomies terms successfuly and normalizes it', async () => {
		fetchMock.mockReset();
		fetchMock.get(termsEndpoint, { status: 200, body: termsResponseData });
		const terms = await getTaxonomyTerms({ embed: false, normalize: true });

		expect(terms).toEqual(normalizedTaxonomiesTermsResponse);
		expect(fetchMock).toHaveFetched(termsEndpoint, {
			method: 'GET',
		});
	});

	test('returns false if the request does not return status 200', async () => {
		fetchMock.mockReset();
		fetchMock.get(termsEndpoint, { status: 400, body: {} });
		const taxonomies = await getTaxonomyTerms('category');
		expect(taxonomies).toBeFalsy();
		expect(fetchMock).toHaveFetched(termsEndpoint, { method: 'GET' });
	});
});
