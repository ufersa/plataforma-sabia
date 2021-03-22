/**
 * Returns an array of keywords
 *
 * @param {[]} arr The keywords initial array of objects
 * @returns {string[]} The service keywords
 */
const normalizeKeywords = (arr) => arr.map((keyword) => keyword?.term);

module.exports = {
	normalizeKeywords,
};
