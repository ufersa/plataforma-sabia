export const measureUnitOptions = [
	{
		label: 'Hora',
		value: 'hour',
	},
	{ label: 'Dia', value: 'day' },
	{ label: 'Semana', value: 'week' },
	{ label: 'Mês', value: 'month' },
	{ label: 'Unidade', value: 'unit' },
	{ label: 'Outro', value: 'other' },
];

export const typeOptions = [
	{ label: 'Mão-de-obra', value: 'labor' },
	{ label: 'Trabalho técnico especializado', value: 'specialized_technical_work' },
	{ label: 'Consultoria', value: 'consulting' },
	{ label: 'Análise', value: 'analysis' },
	{ label: 'Exame', value: 'examination' },
	{ label: 'Perícia', value: 'expertise' },
	{ label: 'Outro', value: 'other' },
];

/**
 * Returns service type label text based on type key
 *
 * @param {string} key The service type key
 * @returns {string} Service type label text
 */
export const getTypeLabel = (key) =>
	({
		labor: 'Mão-de-obra',
		specialized_technical_work: 'Trabalho técnico especializado',
		consulting: 'Consultoria',
		analysis: 'Análise',
		examination: 'Exame',
		expertise: 'Perícia',
		other: 'Outro',
	}[key]);
