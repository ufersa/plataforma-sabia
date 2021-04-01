import { AiOutlineHistory } from 'react-icons/ai';
import { ROLES as rolesEnum } from '../../utils/enums/api.enum';
import {
	User,
	Mail,
	Heart,
	ShoppingBag,
	Inbox,
	Clipboard,
	HelpCircle,
	Search,
	List,
} from './icons';

/**
 * Translates profile sections and pages.
 *
 * @param {Function} t The function to translate the pages and sections titles.
 * @param {object} user The authenticated user object to filter pages.
 * @param {object} param - Object with notifications counter
 * @param {number} param.questions The authenticated user's number of unanswered questions.
 * @param {number} param.messages The authenticated user's number of unanswered questions.
 * @returns {Array} The translated sections and pages.
 */
const getPages = (t, user, { questions, messages }) => {
	const pages = [
		{
			id: 1,
			title: t('profile:userArea'),
			pages: [
				{ title: t('profile:myProfile'), href: '', icon: User },
				{
					title: t('profile:messages'),
					href: '/messages',
					icon: Mail,
					notification: messages ? `${messages} novas` : null,
				},
				{ title: t('profile:favoriteTechnologies'), href: '/bookmarks', icon: Heart },
				{ title: t('profile:userOrders'), href: '/my-orders', icon: ShoppingBag },
			],
		},
		{
			id: 2,
			title: t('profile:researcherArea'),
			pages: [
				{ title: t('profile:myTechnologies'), href: '/technologies', icon: Inbox },
				{ title: t('profile:myServices'), href: '/my-services', icon: List },
				{ title: t('profile:orders'), href: '/orders', icon: Clipboard },
				{
					title: t('profile:questions'),
					href: '/questions',
					icon: HelpCircle,
					notification: questions ? `${questions} novas` : null,
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
					icon: User,
				},
				{
					title: t('profile:curateTechnologies'),
					href: '/curate-technologies',
					icon: Search,
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
