module.exports = {
	env: {
		node: true,
	},
	extends: '@10up/eslint-config/react',
	globals: {
		use: true,
	},
	rules: {
		'jsx-a11y/anchor-is-valid': 0,
	}
};
