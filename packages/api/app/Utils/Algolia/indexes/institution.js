const { initIndex } = require('../core');
const { normalizeKeywords } = require('../normalizes');

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
		objectID: `institution-${institutionData.id}`,
	};

	if (institutionData?.technologies?.length) {
		institutionForAlgolia.technologies = institutionData.technologies.map((item) => {
			const { id, slug, title, technologyCosts, thumbnail, likes, users, type } = item;
			return {
				id,
				slug,
				title,
				thumbnail,
				likes,
				users,
				type,
				costs: technologyCosts.map((cost) => cost.costs),
				keywords: normalizeKeywords(item.keywords),
			};
		});
	}

	if (institutionData?.services?.length) {
		institutionForAlgolia.services = institutionData.services.map((item) => {
			const { id, name, price, measure_unit, thumbnail, likes, type, keywords } = item;
			return {
				id,
				name,
				price,
				thumbnail,
				likes,
				measure_unit,
				type,
				keywords: normalizeKeywords(keywords),
			};
		});
	}

	if (Number(institutionData.lat) && Number(institutionData.lng)) {
		// eslint-disable-next-line no-underscore-dangle
		institutionForAlgolia._geoloc = {
			lat: Number(institutionData.lat),
			lng: Number(institutionData.lng),
		};
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
module.exports = async (data, options = {}) => {
	const { saveObjects, saveObject } = initIndex('institution.indexName');

	if (options.saveMany) {
		const institutions = await data.map((institution) => prepareInstitution(institution));
		return saveObjects(institutions);
	}

	const institution = await prepareInstitution(data);
	return saveObject(institution);
};
