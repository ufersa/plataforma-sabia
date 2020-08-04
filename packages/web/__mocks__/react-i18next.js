module.exports = {
	useTranslation: jest.fn(() => {
		return {
			t(slug) {
				return slug;
			},
		};
	}),
	withTranslation: () => (Component) => {
		// eslint-disable-next-line no-param-reassign
		Component.defaultProps = { ...Component.defaultProps, t: () => '' };
		return Component;
	},
};
