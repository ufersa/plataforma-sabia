import { FaRegListAlt, FaRegUserCircle, FaHeart, FaSuitcase, FaEnvelope } from 'react-icons/fa';

/**
 * Translates profile sections and pages.
 *
 * @param {Function} t The function to translate the pages and sections titles.
 * @returns {Array} The translated sections and pages.
 */
const getPages = (t) => [
	{
		id: 1,
		title: t('profile:userArea'),
		pages: [{ title: t('profile:myProfile'), href: '', icon: FaRegUserCircle }],
	},
	{
		id: 2,
		title: t('profile:researcherArea'),
		pages: [
			{ title: t('profile:myTechnologies'), href: '/technologies', icon: FaRegListAlt },
			{ title: t('profile:myNegotiations'), href: '', icon: FaSuitcase },
			{ title: t('profile:messages'), href: '', icon: FaEnvelope },
			{ title: t('profile:favoriteTechnologies'), href: '/bookmarks', icon: FaHeart },
		],
	},
];

export default getPages;
