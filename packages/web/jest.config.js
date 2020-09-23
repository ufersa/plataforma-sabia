module.exports = {
	setupFilesAfterEnv: ['./setupTests.js'],
	testPathIgnorePatterns: ['/node_modules/', '/tests/visual/'],
	collectCoverageFrom: ['**/*.js'],
	coveragePathIgnorePatterns: [
		'/node_modules/',
		'/coverage/',
		'/stories/',
		'/.storybook/',
		'/tests/',
		'/public/static/locales/',
		'config.js',
		'server.js',
		'stories.js',
		'test.js',
	],
	moduleDirectories: ['node_modules', 'tests'],
	watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
};
