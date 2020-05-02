import React from 'react';
import { useTranslation } from 'react-i18next';
import { HeroImage, Content } from './styles';
import HeroSearch from './HeroSearch';

const Hero = () => {
	const { t } = useTranslation(['common']);

	return (
		<HeroImage>
			<Content>
				<h1>{t('common:heroTitle')}</h1>
				<p>{t('common:heroSubTitle')}</p>
				<HeroSearch />
			</Content>
		</HeroImage>
	);
};

export default Hero;
