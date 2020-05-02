import React from 'react';
import { Hero } from '../components/Hero';
import { TechnologiesSection } from '../components/TechnologiesSection';
import { useTheme } from '../hooks';
import { technologies, fullTechnologies } from '../utils/fakeData';

const Home = () => {
	const { colors } = useTheme();
	return (
		<>
			<Hero />
			<main>
				<TechnologiesSection
					header="em Destaque"
					technologies={fullTechnologies}
					bgColor={colors.whiteSmoke}
				/>
				<TechnologiesSection
					header="Recentes"
					technologies={technologies}
					bgColor={colors.gray98}
				/>
			</main>
		</>
	);
};

export default Home;
