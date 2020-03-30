import React from 'react';
import Head from '../components/head';
import Nav from '../components/Nav';
import Hero from '../components/Hero';
import TechnologiesSection from '../components/TechnologiesSection';
import Footer from '../components/Footer';
import { technologies, fullTechnologies } from '../utils/fakeData';

const Home = () => (
	<>
		<Head
			title="Plataforma Sabiá"
			description="A Plataforma de Tecnologias do Semi-Árido Brasileiro"
		/>
		<Nav />
		<Hero />
		<main>
			<TechnologiesSection
				header="em Destaque"
				technologies={fullTechnologies}
				bgColor="#f3f3f3"
			/>
			<TechnologiesSection header="Recentes" technologies={technologies} />
		</main>
		<Footer />
	</>
);

export default Home;
