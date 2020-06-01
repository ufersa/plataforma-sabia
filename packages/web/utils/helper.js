// previousDate and currentDate value can be a string, a Date() object, or a unix timestamp in milliseconds
export const formatDistance = (previousDate, currentDate = new Date()) => {
	// Get timestamps
	const currentUnix = new Date(currentDate).getTime();
	const previousUnix = new Date(previousDate).getTime();
	if (!currentUnix || !previousUnix) return null;

	// Difference in milisseconds
	const elapsed = currentUnix - previousUnix;

	// Constants
	const minuteInMs = 60 * 1000;
	const hourInMs = minuteInMs * 60;
	const dayInMs = hourInMs * 24;
	const monthInMs = dayInMs * 30;
	const yearnInMs = dayInMs * 365;

	let description;

	if (elapsed <= minuteInMs) {
		description = `${Math.floor(elapsed / 1000)} segundos atrás`;
	} else if (elapsed <= hourInMs) {
		const minutes = Math.floor(elapsed / minuteInMs);
		description = `${minutes} ${minutes > 1 ? 'minutos' : 'minuto'} atrás`;
	} else if (elapsed <= dayInMs) {
		const hours = Math.floor(elapsed / hourInMs);
		description = `${hours} ${hours > 1 ? 'horas' : 'hora'} atrás`;
	} else if (elapsed < monthInMs) {
		const days = Math.floor(elapsed / dayInMs);
		description = `Há ${days} ${days > 1 ? 'dias' : 'dia'} atrás`;
	} else if (elapsed < yearnInMs) {
		const months = Math.floor(elapsed / monthInMs);
		description = `Há ${months} ${months > 1 ? 'meses' : 'mês'} atrás`;
	} else {
		const years = Math.floor(elapsed / yearnInMs);
		description = `Há ${years} ${years > 1 ? 'anos' : 'ano'} atrás`;
	}

	return description;
};

export const setCookie = (cname, cvalue, exdays = 4) => {
	const d = new Date();
	d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
	const expires = `expires=${d.toGMTString()}`;

	const cookieDefinition = `${cname}=${cvalue};${expires};path=/`;

	document.cookie = cookieDefinition;

	return cookieDefinition;
};

export const normalize = (s) =>
	s.normalize('NFD').replace(/[\u0300-\u036f|\u00b4|\u0060|\u005e|\u007e]/g, '');

export const truncateText = (text, maxSize) =>
	text
		.split(' ')
		.splice(0, maxSize)
		.join(' ')
		.concat('...');

/**
 * Outputs the form validation error message
 *
 * @param {object} errorObject The react hook form error object.
 * @param {Function} t
 * @returns {string}
 */
export const validationErrorMessage = (errorObject, t) => {
	const defaultValidationErrorMessages = {
		required: t('error:requiredField'),
	};
	return errorObject?.message || defaultValidationErrorMessages[errorObject?.type] || '';
};
