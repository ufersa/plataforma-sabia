import React from 'react';
import Hero from '../components/Hero';
import TechnologiesSection from '../components/TechnologiesSection';
import { technologies, fullTechnologies } from '../utils/fakeData';

const Home = () => (
	<>
		<Hero />
		<main>
			<TechnologiesSection
				header="em Destaque"
				technologies={fullTechnologies}
				bgColor="#f3f3f3"
			/>
			<TechnologiesSection header="Recentes" technologies={technologies} />
		</main>
	</>
);

export default Home;
