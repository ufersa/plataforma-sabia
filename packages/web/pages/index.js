import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Hero } from '../components/Hero';
import { TechnologiesSection } from '../components/TechnologiesSection';
import { useTheme, useModal } from '../hooks';
import { apiPost, apiPut } from '../services/api';
import { getTechnologies } from '../services/technology';

const Home = ({ emailConfirmation, changeEmail, technologies, featuredTechnologies }) => {
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
			{!!featuredTechnologies?.length && (
				<TechnologiesSection
					header={t('common:featuredSolutions')}
					technologies={featuredTechnologies}
					bgColor={colors.whiteSmoke}
				/>
			)}
			{!!technologies?.length && (
				<TechnologiesSection
					header={t('common:recentSolutions')}
					technologies={technologies}
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

	let featuredTechnologies = await getTechnologies({
		embed: true,
		perPage: 4,
		orderBy: 'likes',
		order: 'DESC',
		taxonomy: 'category',
	});

	featuredTechnologies = featuredTechnologies.map((technology) => ({
		...technology,
		url: `/${technology.slug}`,
	}));

	const featuredTechnologiesIds = featuredTechnologies.map(
		(featuredTechnology) => featuredTechnology.id,
	);

	let technologies = await getTechnologies({
		embed: true,
		perPage: 4,
		orderBy: 'created_at',
		order: 'DESC',
		taxonomy: 'category',
		notIn: featuredTechnologiesIds.join(),
	});

	technologies = technologies.map((technology) => ({
		...technology,
		url: `/${technology.slug}`,
	}));

	return {
		namespacesRequired: ['common', 'search', 'card', 'helper'],
		emailConfirmation,
		changeEmail,
		technologies,
		featuredTechnologies,
	};
};

Home.propTypes = {
	emailConfirmation: PropTypes.bool,
	changeEmail: PropTypes.bool,
	technologies: PropTypes.arrayOf(PropTypes.object),
	featuredTechnologies: PropTypes.arrayOf(PropTypes.object),
};

Home.defaultProps = {
	emailConfirmation: false,
	changeEmail: false,
	technologies: [],
	featuredTechnologies: [],
};

export default Home;
