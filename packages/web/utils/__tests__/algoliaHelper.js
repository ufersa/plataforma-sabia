import { searchStateToURL, urlToSearchState } from '../algoliaHelper';

describe('searchStateToURL', () => {
	test('empty state', () => {
		expect(searchStateToURL()).toBe('');
	});

	test('defaultRoute', () => {
		const state = {
			page: 1,
			refinementList: {
				classification: [],
			},
		};
		expect(searchStateToURL(state)).toBe('/search');
	});

	test('with query', () => {
		const state = {
			query: 'search',
		};

		expect(searchStateToURL(state)).toBe(`/search?query=search`);
	});

	test('with query, classification and page', () => {
		const state = {
			query: 'search',
			page: 2,
			refinementList: {
				classification: ['tecnologias-sociais', 'tecnologia'],
			},
		};

		expect(searchStateToURL(state)).toBe(
			`/search?classifications=tecnologias-sociais,tecnologia&page=2&query=search`,
		);
	});

	test('with query and type', () => {
		const state = {
			query: 'search',
			refinementList: {
				type: ['material', 'metodologia'],
			},
		};

		expect(searchStateToURL(state)).toBe(`/search?query=search&types=material,metodologia`);
	});

	test('with query and page', () => {
		const state = {
			query: 'search',
			page: 2,
		};

		expect(searchStateToURL(state)).toBe(`/search?page=2&query=search`);
	});
});

describe('urlToSearchState', () => {
	test('/search', () => {
		expect(urlToSearchState('/search')).toMatchObject({
			query: '',
			page: 1,
			refinementList: {
				classification: [],
				dimension: [],
				institution: [],
				targetAudience: [],
				type: [],
			},
		});
	});

	test('with query', () => {
		expect(urlToSearchState('/search?query=nor')).toMatchObject({
			query: 'nor',
			page: 1,
			refinementList: {
				classification: [],
				dimension: [],
				institution: [],
				targetAudience: [],
				type: [],
			},
		});
	});

	test('with query and page', () => {
		expect(urlToSearchState('/search?query=nor&page=2')).toMatchObject({
			query: 'nor',
			page: 2,
			refinementList: {
				classification: [],
				dimension: [],
				institution: [],
				targetAudience: [],
				type: [],
			},
		});
	});

	test('with query page and categories', () => {
		expect(
			urlToSearchState('/search?query=nor&page=2&targetAudiences=agricultores'),
		).toMatchObject({
			query: 'nor',
			page: 2,
			refinementList: {
				targetAudience: ['agricultores'],
			},
		});
	});
});
