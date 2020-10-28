import React from 'react';
import { useTranslation } from 'react-i18next';
import { HeroImage, Content } from './styles';
import { HeroSearch } from './HeroSearch';

const Hero = () => {
	const { t } = useTranslation(['common']);

	const heroImage = () => {
		const heroImgs = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg'];
		const heroIndexImg = Math.floor(Math.random() * heroImgs.length);
		return `/hero/${heroImgs[heroIndexImg]}`;
	};

	return (
		<HeroImage image={heroImage}>
			<Content>
				<h1>{t('common:heroTitle')}</h1>
				<p>{t('common:heroSubTitle')}</p>
				<HeroSearch />
			</Content>
		</HeroImage>
	);
};

export default Hero;
