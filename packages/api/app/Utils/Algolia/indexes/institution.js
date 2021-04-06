const { initIndex } = require('../core');

/**
 * Prepare institution object for Algolia
 *
 * @param {object} institution The institution object
 * @returns {object} The institution data for Algolia
 */
const prepareInstitution = (institution) => {
	const institutionData =
		typeof institution?.toJSON === 'function' ? institution.toJSON() : institution;

	const institutionForAlgolia = {
		...institutionData,
	};

	if ('lat' in institutionData && 'lng' in institutionData) {
		// eslint-disable-next-line no-underscore-dangle
		institutionForAlgolia._geoloc = {
			lat: Number(institutionData.lat),
			lng: Number(institutionData.lng),
		};

		delete institutionForAlgolia.lat;
		delete institutionForAlgolia.lng;
	}

	return institutionForAlgolia;
};

/**
 * Index institution to Algolia.
 *
 * @param {object|object[]} data institution data
 * @param {object} options Options passed
 * @param {boolean} options.saveMany Save too many objects or just one
 */
const saveIndex = async (data, options = {}) => {
	const { saveObjects, saveObject } = initIndex('institution.indexName');

	if (options.saveMany) {
		const institutions = await data.map((institution) => prepareInstitution(institution));
		return saveObjects(institutions);
	}

	const institution = await prepareInstitution(data);
	return saveObject(institution);
};

module.exports = {
	prepareInstitution,
	saveIndex,
};
