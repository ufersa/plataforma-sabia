/**
 * Returns deep property path value from a given object
 *
 * @param {object} object The raw object to be searched
 * @param {string|Array} path The object deep property path to get value from
 * @returns {any} The object deep property path value
 */
const getNestedValue = (object, path) => {
	const deepPath = Array.isArray(path) ? path : path.split('.');

	if (deepPath.length === 1) {
		const data = object[deepPath];

		if (!data) return false;

		return object[deepPath];
	}

	return getNestedValue(object[deepPath[0]], deepPath.slice(1));
};

module.exports = getNestedValue;
