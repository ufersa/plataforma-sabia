export const maskPatterns = {
	cpf: {
		search: /(\d{3})(\d{3})(\d{3})(\d{2})/,
		replace: '$1.$2.$3-$4',
		pattern: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
		stringMask: '999.999.999-99',
	},
	brazilianDate: {
		search: /^([0-2][0-9]|(3)[0-1])(((0)[0-9])|((1)[0-2]))(\d{4})$/i,
		replace: '$1/$2/$3',
		pattern: /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i,
		stringMask: '99/99/9999',
	},
	phoneNumber: {
		search: /(\d{2}) (\d?) (\d{4,5}-\d{4})/,
		replace: '($1) $2$3',
		pattern: /(\(?\d{2}\)?\s)?(\d{4,5}-\d{4})/,
		stringMask: '(99) 9999-99999',
	},
	zipCode: {
		search: /(\d{5})(\d{3})/,
		replace: '$1-$2',
		pattern: /^\d{5}-\d{3}$/,
		stringMask: '99999-999',
	},
};

export const replaceWithMask = (value, pattern) => {
	const { search, replace } = maskPatterns?.[pattern] || {};

	if (!value || !search || !replace) {
		return '';
	}

	return value.replace(search, replace);
};
