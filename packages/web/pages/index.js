import React from 'react';
import { useTranslation } from 'react-i18next';
import { Hero } from '../components/Hero';
import { TechnologiesSection } from '../components/TechnologiesSection';
import { useTheme } from '../hooks';
import { technologies, fullTechnologies } from '../utils/fakeData';

const Home = () => {
	const { colors } = useTheme();
	const { t } = useTranslation(['common']);
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

Home.getInitialProps = async () => {
	return {
		namespacesRequired: ['common', 'search', 'card'],
	};
};

export default Home;
