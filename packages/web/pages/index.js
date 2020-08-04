import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import cookies from 'next-cookies';
import { useTranslation } from 'react-i18next';
import { Hero } from '../components/Hero';
import { TechnologiesSection } from '../components/TechnologiesSection';
import { useTheme, useModal } from '../hooks';
import { apiPost, apiPut } from '../services/api';
import { getTechnologies } from '../services/technology';
import { getMe } from '../services';

const Home = ({ emailConfirmation, changeEmail, technologies, bookmarks }) => {
	const { colors } = useTheme();
	const { t } = useTranslation(['common']);
	const { openModal } = useModal();

	useEffect(() => {
		if (emailConfirmation) {
			openModal('login', { message: t('common:verifiedEmail') });
		} else if (changeEmail) {
			openModal('login', { message: t('common:updatedEmail') });
		}
	}, [emailConfirmation, changeEmail, openModal, t]);

	return (
		<>
			<Hero />
			{!!technologies?.featured?.length && (
				<TechnologiesSection
					header={t('common:featuredSolutions')}
					technologies={technologies.featured}
					bookmarks={bookmarks}
					bgColor={colors.whiteSmoke}
				/>
			)}
			{!!technologies?.recent?.length && (
				<TechnologiesSection
					header={t('common:recentSolutions')}
					technologies={technologies.recent}
					bookmarks={bookmarks}
					bgColor={colors.whiteSmoke}
				/>
			)}
		</>
	);
};

Home.getInitialProps = async ({ req }) => {
	const { token: userToken } = cookies({ req });

	let emailConfirmation = false;
	let changeEmail = false;
	let response = false;

	if (req && req.query && req.query.token && req.query.action) {
		const token = req.query.token.replace(' ', '+');
		const { action } = req.query;
		if (action === 'confirmAccount') {
			response = await apiPost('auth/confirm-account', {
				token,
				scope: 'web',
			});
			if (response.status === 200) {
				emailConfirmation = true;
			}
		} else if (action === 'changeEmail') {
			response = await apiPut('user/change-email', {
				token,
				scope: 'web',
			});
			if (response.status === 200) {
				changeEmail = true;
			}
		}
	}

	const technologies = {};

	technologies.featured = await getTechnologies({
		embed: true,
		perPage: 4,
		orderBy: 'likes',
		order: 'DESC',
		taxonomy: 'category',
	});

	if (!Array.isArray(technologies.featured)) {
		technologies.featured = [];
	}

	const featuredTechnologiesIds = technologies.featured
		?.map((featuredTechnology) => featuredTechnology.id)
		?.join();

	technologies.recent = await getTechnologies({
		embed: true,
		perPage: 4,
		orderBy: 'created_at',
		order: 'DESC',
		taxonomy: 'category',
		notIn: featuredTechnologiesIds,
	});

	const { bookmarks } = userToken
		? await getMe(userToken, { bookmarks: true })
		: { bookmarks: [] };

	return {
		emailConfirmation,
		changeEmail,
		technologies,
		bookmarks,
		namespacesRequired: ['common', 'search', 'card', 'helper'],
	};
};

Home.propTypes = {
	emailConfirmation: PropTypes.bool,
	bookmarks: PropTypes.arrayOf(PropTypes.number).isRequired,
	technologies: PropTypes.shape({
		recent: PropTypes.arrayOf(PropTypes.object),
		featured: PropTypes.arrayOf(PropTypes.object),
	}),
	changeEmail: PropTypes.bool,
};

Home.defaultProps = {
	emailConfirmation: false,
	technologies: {
		recent: [],
		featured: [],
	},
	changeEmail: false,
};

export default Home;
