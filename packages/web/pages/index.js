import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { Hero } from '../components/Hero';
import { TechnologiesSection } from '../components/TechnologiesSection';
import { useTheme, useModal } from '../hooks';
import { technologies, fullTechnologies } from '../utils/fakeData';

const Home = ({ emailConfirmation }) => {
	const { colors } = useTheme();
	const { t } = useTranslation(['common']);
	const { openModal } = useModal();
	useEffect(() => {
		if (emailConfirmation) {
			openModal('login', { message: t('common:verifiedEmail') });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [emailConfirmation]);

	return (
		<>
			<Hero />
			<TechnologiesSection
				header={t('common:featuredSolutions')}
				technologies={fullTechnologies}
				bgColor={colors.whiteSmoke}
			/>
			<TechnologiesSection
				header={t('common:recentSolutions')}
				technologies={technologies}
				bgColor={colors.gray98}
			/>
		</>
	);
};

Home.getInitialProps = async ({ req }) => {
	let emailConfirmation = false;

	if (req && req.query && req.query.token) {
		const token = req.query.token.replace(' ', '+');
		const response = await fetch(`${process.env.API_URL}/auth/confirm-account`, {
			method: 'POST',
			headers: new Headers({ 'Content-Type': 'application/json' }),
			body: JSON.stringify({ token, scope: 'web' }),
		});

		if (response.status === 200) {
			emailConfirmation = true;
		}
	}

	return {
		namespacesRequired: ['common', 'search'],
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
