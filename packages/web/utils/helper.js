import { t } from 'i18next';

// previousDate and currentDate value can be a string, a Date() object, or a unix timestamp in milliseconds
// eslint-disable-next-line import/prefer-default-export
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

	if (elapsed < minuteInMs) {
		description = `${Math.floor(elapsed / 1000)} segundos atrás`;
	} else if (elapsed < hourInMs) {
		description = `${Math.floor(elapsed / minuteInMs)} minutos atrás`;
	} else if (elapsed < dayInMs) {
		description = `${Math.floor(elapsed / hourInMs)} horas atrás`;
	} else if (elapsed < monthInMs) {
		description = `Há ${Math.floor(elapsed / dayInMs)} dias atrás`;
	} else if (elapsed < yearnInMs) {
		description = `Há ${Math.floor(elapsed / monthInMs)} meses atrás`;
	} else {
		description = `Há ${Math.floor(elapsed / yearnInMs)} anos atrás`;
	}

	return description;
};

export const setCookie = (cname, cvalue, exdays = 4) => {
	const d = new Date();
	d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
	const expires = `expires=${d.toGMTString()}`;

	document.cookie = `${cname}=${cvalue};${expires};path=/`;
	return true;
};

export const removeCharacters = (s) =>
	s.normalize('NFD').replace(/[\u0300-\u036f|\u00b4|\u0060|\u005e|\u007e]/g, '');

export const truncateText = (text, maxSize) =>
	text
		.split(' ')
		.splice(0, maxSize)
		.join(' ')
		.concat('...');

const defaultValidationErrorMessages = {
	required: t('error:requiredField'),
};

/**
 * Outputs the form validation error message
 *
 * @param {object} errorObject The react hook form error object.
 *
 * @returns {string}
 */
export const validationErrorMessage = (errorObject) => {
	return errorObject?.message || defaultValidationErrorMessages[errorObject?.type] || '';
};
