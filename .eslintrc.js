const { peerDependencies } = require('./packages/core/package.json');

module.exports = {
	env: {
		node: true,
	},
	extends: ['@10up/eslint-config/react'],
	plugins: ['eslint-plugin-cypress'],
	globals: {
		use: true,
		page: true,
		'cypress/globals': true
	},
	rules: {
		'jsx-a11y/anchor-is-valid': 0,
		'camelcase': 0,
		'import/no-unresolved': [2, { ignore: ['^test-utils', ...Object.keys(peerDependencies)] }],
		'prefer-destructuring': [2, { array: false, object: true }],
		// we want to allow changing object parameters.
		'no-param-reassign': [2, { props: false }],
	},
	overrides: [
		{
			files: ['cypress/**/*.js'],
			extends: ['plugin:cypress/recommended'],
			rules: {
				'no-unused-expressions': 0,
				'import/no-extraneous-dependencies': [2, { devDependencies: true }]
			}
		},
		{
			files: [
				'*.stories.js',
				'**/*/.storybook/*.js',
				'**/*/tests/**/*.js',
				'*.test.js',
				'**/__tests__/**/*.[jt]s?(x)',
				'setupTests.js',
				'**/__mocks__/**/*.js'
			],
			extends: ['@10up/eslint-config/jest'],
			rules: {
				'import/no-extraneous-dependencies': [2, { devDependencies: true }],
			}
		}
	]
};
