import { FaRegListAlt, FaRegUserCircle, FaHeart, FaSuitcase, FaEnvelope } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';

/**
 * Translates profile sections and pages.
 *
 * @param {Function} t The function to translate the pages and sections titles.
 * @param {object} user The authenticated user object to filter pages
 * @returns {Array} The translated sections and pages.
 */
const getPages = (t, user) => {
	const pages = [
		{
			id: 1,
			title: t('profile:userArea'),
			pages: [
				{ title: t('profile:myProfile'), href: '', icon: FaRegUserCircle },
				{ title: t('profile:messages'), href: '', icon: FaEnvelope },
				{ title: t('profile:favoriteTechnologies'), href: '/bookmarks', icon: FaHeart },
			],
		},
		{
			id: 2,
			title: t('profile:researcherArea'),
			pages: [
				{ title: t('profile:myTechnologies'), href: '/technologies', icon: FaRegListAlt },
				{ title: t('profile:myNegotiations'), href: '', icon: FaSuitcase },
			],
		},
	];

	if (user.role?.role === 'REVIEWER') {
		pages.push({
			id: 3,
			title: t('profile:reviewerArea'),
			pages: [
				{
					title: t('profile:curateTechnologies'),
					href: '/curate-technologies',
					icon: FiSearch,
				},
			],
		});
	}

	return pages;
};

export default getPages;
