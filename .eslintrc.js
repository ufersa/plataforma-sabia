module.exports = {
	env: {
		node: true,
	},
	extends: ['@10up/eslint-config/react'],
	globals: {
		use: true,
		page: true,
	},
	rules: {
		'jsx-a11y/anchor-is-valid': 0,
		'camelcase': 0,
	},
	overrides: [
		{
			files: ['*.stories.js', '**/*/.storybook/*.js', '**/*/tests/**/*.js'],
			extends: ['@10up/eslint-config/jest'],
			rules: {
				'import/no-extraneous-dependencies': [2, {devDependencies: true}]
			}
		}
	]
};
