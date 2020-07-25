import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Hero } from '../components/Hero';
import { TechnologiesSection } from '../components/TechnologiesSection';
import { useModal, useTheme } from '../hooks';
import { apiPost } from '../services/api';
import { getTechnologies } from '../services/technology';

const Home = ({ emailConfirmation, recentTechnologies, featuredTechnologies }) => {
	const { colors } = useTheme();
	const { t } = useTranslation(['common']);
	const { openModal } = useModal();

	useEffect(() => {
		if (emailConfirmation) {
			openModal('login', { message: t('common:verifiedEmail') });
		}
	}, [emailConfirmation, openModal, t]);

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
			{!!recentTechnologies?.length && (
				<TechnologiesSection
					header={t('common:recentSolutions')}
					technologies={recentTechnologies}
					bgColor={colors.whiteSmoke}
				/>
			)}
		</>
	);
};

export const getServerSideProps = async ({ req }) => {
	let emailConfirmation = false;

	if (req && req.query && req.query.token) {
		const token = req.query.token.replace(' ', '+');
		const response = await apiPost('auth/confirm-account', {
			token,
			scope: 'web',
		});

		if (response.status === 200) {
			emailConfirmation = true;
		}
	}

	let featuredTechnologies = await getTechnologies({
		embed: true,
		perPage: 4,
		orderBy: 'likes',
		order: 'DESC',
		taxonomy: 'category',
	});

	const featuredTechnologiesIds = featuredTechnologies.map(
		(featuredTechnology) => featuredTechnology.id,
	);

	let recentTechnologies = await getTechnologies({
		embed: true,
		perPage: 4,
		orderBy: 'created_at',
		order: 'DESC',
		taxonomy: 'category',
		notIn: featuredTechnologiesIds.join(),
	});

	featuredTechnologies = featuredTechnologies.map((technology) => ({
		...technology,
		url: `/${technology.slug}`,
	}));

	recentTechnologies = recentTechnologies.map((technology) => ({
		...technology,
		url: `/${technology.slug}`,
	}));

	return {
		props: {
			emailConfirmation,
			recentTechnologies,
			featuredTechnologies,
		},
	};
};

Home.defaultProps = {
	// eslint-disable-next-line react/default-props-match-prop-types
	i18nNamespaces: ['common', 'search', 'card', 'helper'],
};

Home.propTypes = {
	emailConfirmation: PropTypes.bool,
	recentTechnologies: PropTypes.arrayOf(PropTypes.object),
	featuredTechnologies: PropTypes.arrayOf(PropTypes.object),
};

Home.defaultProps = {
	emailConfirmation: false,
	recentTechnologies: [],
	featuredTechnologies: [],
};

export default Home;
