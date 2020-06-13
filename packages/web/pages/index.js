import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { Hero } from '../components/Hero';
import { TechnologiesSection } from '../components/TechnologiesSection';
import { useTheme, useModal } from '../hooks';
import { technologies, fullTechnologies } from '../utils/fakeData';
import { apiPost } from '../services/api';

const Home = ({ emailConfirmation }) => {
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
			<TechnologiesSection
				header={t('common:featuredSolutions')}
				technologies={fullTechnologies}
				bgColor={colors.gray98}
			/>
			<TechnologiesSection
				header={t('common:recentSolutions')}
				technologies={technologies}
				bgColor={colors.whiteSmoke}
			/>
		</>
	);
};

Home.getInitialProps = async ({ req }) => {
	let emailConfirmation = false;

	if (req && req.query && req.query.token) {
		const token = req.query.token.replace(' ', '+');
		const response = await apiPost(
			'auth/confirm-account',
			{
				token,
				scope: 'web',
			},
			{ json: false },
		);

		if (response.status === 200) {
			emailConfirmation = true;
		}
	}

	return {
		namespacesRequired: ['common', 'search', 'card', 'helper'],
		emailConfirmation,
	};
};

Home.propTypes = {
	emailConfirmation: PropTypes.bool,
};

Home.defaultProps = {
	emailConfirmation: false,
};

export default Home;
