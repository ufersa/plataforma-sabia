import React from 'react';
import Head from '../components/head';
import Nav from '../components/Nav';
import TechnologiesSection from '../components/TechnologiesSection';

const technologies = [
	{
		id: 1,
		title: 'Barragem Subterrânea',
		src: '/card-image.jpg',
		place: 'UFERSA/RN',
		date: new Date('2019-06-22'),
		likes: 6,
		weeks: 2,
		region: 'Nordeste',
	},
	{
		id: 2,
		title: 'Bomba a Energia Solar',
		src: '/card-image2.jpg',
		place: 'INSA/PB',
		date: new Date('2019-06-22'),
		likes: 18,
		weeks: 7,
		region: 'Sudeste',
	},
	{
		id: 3,
		title: 'Cisterna Pré-moldada',
		src: '/card-image3.jpg',
		place: 'EMATER/RN',
		date: new Date('2019-06-22'),
		likes: 6,
		weeks: 2,
		region: 'Nordeste',
	},
	{
		id: 4,
		title: 'Perfuração de cacimba',
		src: '/card-image4.jpg',
		place: 'INSA/PB',
		date: new Date('2019-06-22'),
		likes: 18,
		weeks: 7,
		region: 'Sudeste',
	},
];

const Home = () => (
	<>
		<Head
			title="Plataforma Sabiá"
			description="A Plataforma de Tecnologias do Semi-Árido Brasileiro"
		/>
		<Nav />
		<main>
			<TechnologiesSection header="Soluções em Destaque" technologies={technologies} />
			<TechnologiesSection header="Soluções Recentes" technologies={technologies} />
		</main>
	</>
);

export default Home;
