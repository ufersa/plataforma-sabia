module.exports = {
	setupFilesAfterEnv: ['./setupTests.js'],
	testPathIgnorePatterns: ['/node_modules/'],
	collectCoverageFrom: ['**/*.js'],
	coveragePathIgnorePatterns: ['/node_modules/', '/coverage/', '/tests/', 'test.js'],
	moduleDirectories: ['node_modules', 'tests'],
	watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
};
