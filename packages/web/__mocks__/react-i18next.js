module.exports = {
	useTranslation: jest.fn(() => {
		return {
			t(slug) {
				return slug;
			},
		};
	}),
};
