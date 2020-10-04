export const fundingData = {
	types: [
		{
			value: 'public',
			label: 'Público',
		},
		{
			value: 'private',
			label: 'Privado',
		},
		{
			value: 'collective',
			label: 'Coletivo',
		},
	],
	status: [
		{
			value: 'not_acquired',
			label: 'Não adquirido',
		},
		{
			value: 'acquiring',
			label: 'Em aquisição',
		},
		{
			value: 'acquired',
			label: 'Já adquirido',
		},
	],
};

/**
 * Returns funding label based on value.
 *
 * @param {string} scope The scope of funding.
 * @param {string} value The funding value
 * @returns {string} The funding label.
 */
export const getFundingLabelByValue = (scope, value) => {
	const keys = Object.keys(fundingData);

	if (!scope || !keys.some((key) => key === scope)) {
		return value;
	}

	const funding = fundingData[scope].find((data) => data.value === value);

	return funding?.label || value;
};
