module.exports = {
	env: {
		node: true,
	},
	extends: ['@10up/eslint-config/react', '@10up/eslint-config/jest'],
	globals: {
		use: true,
		page: true,
	},
	rules: {
		'jsx-a11y/anchor-is-valid': 0,
	},
	overrides: [
		{
			files: ['*.stories.js', '**/*/.storybook/*.js', '**/*/tests/**/*.js'],
			rules: {
				'import/no-extraneous-dependencies': [2, {devDependencies: true}]
			}
		}
	]
};
