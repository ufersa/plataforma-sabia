// previousDate and currentDate value can be a string, a Date() object, or a unix timestamp in milliseconds
export const formatDistance = (t, previousDate, currentDate = new Date()) => {
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
	const yearInMs = dayInMs * 365;

	let description;

	if (elapsed <= minuteInMs) {
		description = t('helper:formatDistance.second', { count: Math.floor(elapsed / 1000) });
	} else if (elapsed <= hourInMs) {
		description = t('helper:formatDistance.minute', {
			count: Math.floor(elapsed / minuteInMs),
		});
	} else if (elapsed <= dayInMs) {
		description = t('helper:formatDistance.hour', { count: Math.floor(elapsed / hourInMs) });
	} else if (elapsed < monthInMs) {
		description = t('helper:formatDistance.day', { count: Math.floor(elapsed / dayInMs) });
	} else if (elapsed < yearInMs) {
		description = t('helper:formatDistance.month', { count: Math.floor(elapsed / monthInMs) });
	} else {
		description = t('helper:formatDistance.year', { count: Math.floor(elapsed / yearInMs) });
	}

	return description;
};

/**
 * Sets a cookie
 *
 * @param {string} cname Cookie name.
 * @param {string} cvalue Cookie value.
 * @param {integer} exdays Number of days before expiring.
 *
 * @returns {string} Cookie definition string.
 */
export const setCookie = (cname, cvalue, exdays = 4) => {
	if (typeof document === 'undefined') {
		return false;
	}

	const d = new Date();
	d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
	const expires = `expires=${d.toGMTString()}`;

	const cookieDefinition = `${cname}=${cvalue};${expires};path=/`;

	document.cookie = cookieDefinition;

	return cookieDefinition;
};

/**
 * Returns a cookie value if defined.
 *
 * @param {string} cname Cookie name.
 *
 * @returns {string}
 */
export const getCookie = (cname) => {
	if (typeof document === 'undefined') {
		return false;
	}
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${cname}=`);

	if (parts.length === 2) {
		return parts
			.pop()
			.split(';')
			.shift();
	}

	return false;
};

export const normalize = (s) =>
	s.normalize('NFD').replace(/[\u0300-\u036f|\u00b4|\u0060|\u005e|\u007e]/g, '');

export const truncateText = (text, maxSize) =>
	text
		.split(' ')
		.splice(0, maxSize)
		.join(' ')
		.concat('...');

export const getPeriod = (t, days) => {
	let description;

	const weeksInDays = 7;
	const monthsInDays = 30;
	const yearsInDays = 365;

	if (days < weeksInDays) {
		description = t('helper:getPeriod.day', { count: days });
	} else if (days < monthsInDays) {
		description = t('helper:getPeriod.week', { count: Math.floor(days / weeksInDays) });
	} else if (days < yearsInDays) {
		description = t('helper:getPeriod.month', { count: Math.floor(days / monthsInDays) });
	} else {
		description = t('helper:getPeriod.year', { count: Math.floor(days / yearsInDays) });
	}

	return description;
};

/**
 * Outputs the form validation error message
 *
 * @param {object} errorObject The react hook form error object.
 * @param {Function} t The function to translate the terms.
 * @returns {string}
 */
export const validationErrorMessage = (errorObject, t) => {
	const defaultValidationErrorMessages = {
		required: t('error:requiredField'),
	};
	return errorObject?.message || defaultValidationErrorMessages[errorObject?.type] || '';
};
