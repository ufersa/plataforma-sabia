import fetchMock from 'fetch-mock-jest';
import { getTaxonomies } from '../taxonomy';
import { baseUrl } from '../api';

describe('getTaxonomies', () => {
	afterAll(() => {
		fetchMock.mockClear();
		fetchMock.mockReset();
	});

	const taxonomiesEndpoint = `${baseUrl}/taxonomies`;
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

	fetchMock.get(taxonomiesEndpoint, taxonomiesResponse);

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
});
