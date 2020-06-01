import { searchStateToURL, urlToSearchState } from '../algoliaHelper';

describe('searchStateToURL', () => {
	test('empty state', () => {
		expect(searchStateToURL()).toBe('');
	});

	test('defaultRoute', () => {
		const state = {
			page: 1,
			refinementList: {
				category: [],
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

	test('with query, category and page', () => {
		const state = {
			query: 'search',
			page: 2,
			refinementList: {
				category: ['agua', 'luz'],
			},
		};

		expect(searchStateToURL(state)).toBe(`/search?categories=agua,luz&page=2&query=search`);
	});

	test('with query and category', () => {
		const state = {
			query: 'search',
			refinementList: {
				category: ['agua', 'luz'],
			},
		};

		expect(searchStateToURL(state)).toBe(`/search?categories=agua,luz&query=search`);
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
				category: [],
			},
		});
	});

	test('with query', () => {
		expect(urlToSearchState('/search?query=nor')).toMatchObject({
			query: 'nor',
			page: 1,
			refinementList: {
				category: [],
			},
		});
	});

	test('with query and page', () => {
		expect(urlToSearchState('/search?query=nor&page=2')).toMatchObject({
			query: 'nor',
			page: 2,
			refinementList: {
				category: [],
			},
		});
	});

	test('with query page and categories', () => {
		expect(urlToSearchState('/search?query=nor&page=2&categories=energia,luz')).toMatchObject({
			query: 'nor',
			page: 2,
			refinementList: {
				category: ['energia', 'luz'],
			},
		});
	});
});
