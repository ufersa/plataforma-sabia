import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Hero } from '../components/Hero';
import { TechnologiesSection } from '../components/TechnologiesSection';
import { useModal, useTheme } from '../hooks';
import { apiPost, apiPut } from '../services/api';
import { getTechnologies } from '../services/technology';

const Home = ({ emailConfirmation, changeEmail, technologies }) => {
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
					header={t('common:featuredTechnologies')}
					technologies={technologies.featured}
					bgColor={colors.whiteSmoke}
				/>
			)}
		</>
	);
};

Home.getInitialProps = async ({ req }) => {
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
		status: 'published',
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
		status: 'published',
		taxonomy: 'category',
		notIn: featuredTechnologiesIds,
	});

	return {
		emailConfirmation,
		changeEmail,
		technologies,
		namespacesRequired: ['common', 'search', 'card', 'helper'],
	};
};

Home.propTypes = {
	emailConfirmation: PropTypes.bool,
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
