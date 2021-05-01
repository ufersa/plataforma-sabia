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
import { internal as internalPages } from '../../utils/consts/pages';

/**
 * Translates profile sections and pages.
 *
 * @param {Function} t The function to translate the pages and sections titles.
 * @param {object} user The authenticated user object to filter pages.
 * @param {object} notifications - Object with notifications counter
 * @param {number} notifications.questions The authenticated user's number of unanswered questions.
 * @param {number} notifications.messages The authenticated user's number of unanswered questions.
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
					href: internalPages.messages,
					icon: Mail,
					notification: messages ? `${messages} novas` : null,
				},
				{
					title: t('profile:favoriteTechnologies'),
					href: internalPages.bookmarks,
					icon: Heart,
				},
				{ title: t('profile:userOrders'), href: internalPages.myOrders, icon: ShoppingBag },
			],
		},
		{
			id: 2,
			title: t('profile:researcherArea'),
			pages: [
				{
					title: t('profile:myTechnologies'),
					href: internalPages.myTechnologies,
					icon: Inbox,
				},
				{ title: t('profile:myServices'), href: internalPages.myServices, icon: List },
				{ title: t('profile:orders'), href: internalPages.orders, icon: Clipboard },
				{
					title: t('profile:questions'),
					href: internalPages.questions,
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
					href: internalPages.curatorProfile,
					icon: User,
				},
				{
					title: t('profile:curateTechnologies'),
					href: internalPages.curateTechnologies,
					icon: Search,
				},
				{
					title: t('profile:revisionsHistory'),
					href: internalPages.revisions,
					icon: AiOutlineHistory,
				},
			],
		});
	}

	return pages;
};

export default getPages;
