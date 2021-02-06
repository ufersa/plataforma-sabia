import React from 'react';
import { HeroImage, Content } from './styles';
import { HeroSearch } from './HeroSearch';

const Hero = () => {
	const heroImage = () => {
		const heroImgs = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg'];
		const heroIndexImg = Math.floor(Math.random() * heroImgs.length);
		return `/hero/${heroImgs[heroIndexImg]}`;
	};

	return (
		<HeroImage image={heroImage}>
			<Content>
				<HeroSearch />
			</Content>
		</HeroImage>
	);
};

export default Hero;
