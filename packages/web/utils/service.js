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

/**
 *	Returns service default thumbnail based on type key
 *	It works both with key or the translated label for a given key
 *
 * @param {string} key The service type key
 * @returns {string} The image path
 */
export const getServiceTypeThumbnail = (key) =>
	({
		labor: '/under-construction-rafiki.svg',
		specialized_technical_work: '/eletrician-rafiki.svg',
		consulting: '/group-chat-rafiki.svg',
		analysis: '/analysis-rafiki.svg',
		examination: '/laboratory-rafiki.svg',
		expertise: '/creative-experience-rafiki.svg',
		other: '/environment-rafiki.svg',
		'Mão-de-obra': '/under-construction-rafiki.svg',
		'Trabalho técnico especializado': '/eletrician-rafiki.svg',
		Consultoria: '/group-chat-rafiki.svg',
		Análise: '/analysis-rafiki.svg',
		Exame: '/laboratory-rafiki.svg',
		Perícia: '/creative-experience-rafiki.svg',
		Outro: '/environment-rafiki.svg',
	}[key] || '/environment-rafiki.svg');
