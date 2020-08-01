import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import cookies from 'next-cookies';
import { useTranslation } from 'react-i18next';
import { Hero } from '../components/Hero';
import { TechnologiesSection } from '../components/TechnologiesSection';
import { useModal, useTheme } from '../hooks';
import { apiPost } from '../services/api';
import { getTechnologies } from '../services/technology';
import { getMe } from '../services';

const Home = ({ emailConfirmation, technologies, featuredTechnologies, bookmarks }) => {
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
					bookmarks={bookmarks}
					bgColor={colors.whiteSmoke}
				/>
			)}
			{!!technologies?.length && (
				<TechnologiesSection
					header={t('common:recentSolutions')}
					technologies={technologies}
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

	const { bookmarks } = userToken
		? await getMe(userToken, { bookmarks: true })
		: { bookmarks: [] };

	return {
		namespacesRequired: ['common', 'search', 'card', 'helper'],
		emailConfirmation,
		technologies,
		featuredTechnologies,
		bookmarks,
	};
};

Home.propTypes = {
	emailConfirmation: PropTypes.bool,
	technologies: PropTypes.arrayOf(PropTypes.object),
	featuredTechnologies: PropTypes.arrayOf(PropTypes.object),
	bookmarks: PropTypes.arrayOf(PropTypes.number).isRequired,
};

Home.defaultProps = {
	emailConfirmation: false,
	technologies: [],
	featuredTechnologies: [],
};

export default Home;
