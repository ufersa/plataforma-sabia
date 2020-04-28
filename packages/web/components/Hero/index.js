import React from 'react';
import { HeroImage, Content } from './styles';
import HeroSearch from './HeroSearch';

const Hero = () => {
	return (
		<HeroImage>
			<Content>
				<h1>O que você precisa para mudar o Semiárido?</h1>
				<p>Encontre a tecnologia certa para a sua região</p>
				<HeroSearch />
			</Content>
		</HeroImage>
	);
};

export default Hero;
