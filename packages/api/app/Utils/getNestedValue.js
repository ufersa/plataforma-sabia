/**
 * Returns deep property path value from a given object
 *
 * @param {object} object The raw object to be searched
 * @param {string|Array} path The object deep property path to get value from
 * @returns {any} The object deep property path value
 */
module.exports = (object, path) => {
	const internalGet = (_object, _path) => {
		const deepPath = Array.isArray(_path) ? _path : _path.split('.');

		if (deepPath.length === 1) {
			const data = _object[deepPath];

			if (!data) return false;

			return _object[deepPath];
		}

		return internalGet(_object[deepPath[0]], deepPath.slice(1));
	};

	return internalGet(object, path);
};
