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
		'config.js',
		'server.js',
		'stories.js',
		'test.js',
	],
	moduleDirectories: ['node_modules', 'tests'],
	moduleNameMapper: {
		'^react$': '<rootDir>/node_modules/react',
		'^next/router$': '<rootDir>/node_modules/next/router',
		'^next/link$': '<rootDir>/node_modules/next/link',
		'^react-instantsearch-dom': '<rootDir>/node_modules/react-instantsearch-dom',
	},
	watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
};
