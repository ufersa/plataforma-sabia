import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Hero } from '../components/Hero';
import { TechnologiesSection } from '../components/TechnologiesSection';
import { useModal, useTheme } from '../hooks';
import { apiPost } from '../services/api';
import { getTechnologies } from '../services/technology';

const Home = ({ emailConfirmation, technologies }) => {
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
			{!!technologies.featured?.length && (
				<TechnologiesSection
					header={t('common:featuredSolutions')}
					technologies={technologies.featured}
					bgColor={colors.whiteSmoke}
				/>
			)}
			{!!technologies.recent?.length && (
				<TechnologiesSection
					header={t('common:recentSolutions')}
					technologies={technologies.recent}
					bgColor={colors.whiteSmoke}
				/>
			)}
		</>
	);
};

Home.getInitialProps = async ({ req }) => {
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

	return {
		emailConfirmation,
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
};

Home.defaultProps = {
	emailConfirmation: false,
	technologies: {
		recent: [],
		featured: [],
	},
};

export default Home;
