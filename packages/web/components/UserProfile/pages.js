import { FaRegListAlt, FaRegUserCircle, FaHeart, FaEnvelope } from 'react-icons/fa';
import { FiShoppingBag, FiClipboard } from 'react-icons/fi';
import {
	AiOutlineSearch,
	AiOutlineUser,
	AiOutlineHistory,
	AiOutlineQuestionCircle,
} from 'react-icons/ai';
import { ROLES as rolesEnum } from '../../utils/enums/api.enum';

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
				{ title: t('profile:userOrders'), href: '/my-orders', icon: FiShoppingBag },
			],
		},
		{
			id: 2,
			title: t('profile:researcherArea'),
			pages: [
				{ title: t('profile:myTechnologies'), href: '/technologies', icon: FaRegListAlt },
				{ title: t('profile:orders'), href: '/orders', icon: FiClipboard },
				{
					title: t('profile:questions'),
					href: '/questions',
					icon: AiOutlineQuestionCircle,
					notification: '5 novas',
				},
			],
		},
	];

	if (user.role?.role === rolesEnum.REVIEWER) {
		pages.push({
			id: 3,
			title: t('profile:reviewerArea'),
			pages: [
				{
					title: t('profile:profileCurate'),
					href: '/curate-profile',
					icon: AiOutlineUser,
				},
				{
					title: t('profile:curateTechnologies'),
					href: '/curate-technologies',
					icon: AiOutlineSearch,
				},
				{
					title: t('profile:revisionsHistory'),
					href: '/revisions',
					icon: AiOutlineHistory,
				},
			],
		});
	}

	return pages;
};

export default getPages;
