const { initIndex } = require('../core');
const { normalizeKeywords } = require('../normalizes');

/**
 * Prepare announcement object for Algolia
 *
 * @param {object} announcement The announcement object
 * @returns {object} The announcement data for Algolia
 */
const prepareAnnouncement = (announcement) => {
	const announcementData =
		typeof announcement?.toJSON === 'function' ? announcement.toJSON() : announcement;

	const announcementForAlgolia = {
		...announcementData,
	};

	if (announcementData?.keywords?.length) {
		announcementForAlgolia.keywords = normalizeKeywords(announcementData.keywords);
	}

	return announcementForAlgolia;
};

/**
 * Index announcement to Algolia.
 *
 * @param {object|object[]} data Announcement data
 * @param {object} options Options passed
 * @param {boolean} options.saveMany Save too many objects or just one
 */
module.exports = async (data, options = {}) => {
	const { saveObjects, saveObject } = initIndex('announcement.indexName');

	if (options.saveMany) {
		const announcements = await data.map((idea) => prepareAnnouncement(idea));
		return saveObjects(announcements);
	}

	const announcement = await prepareAnnouncement(data);
	return saveObject(announcement);
};
