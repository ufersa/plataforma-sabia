import React from 'react';
import Slider from 'react-slick';

import Item from './Item';

import theme from '../../../styles/theme';

import { Wrapper, Container } from './styles';

const items = [
	{
		title: (
			<span>
				Banco de
				<br />
				Editais
			</span>
		),
		image: {
			src: '/revenue-rafiki.svg',
			alt:
				'Homem de camisa laranja e gravata comemorando com as mãos para o alto e uma seta para cima ao fundo',
		},
		description:
			'Encontre aqui os editais mais atuais de incentivo à pesquisa e inovação. Quem sabe você encontra aquele investimento que precisa, hein?',
		link: {
			href: '/announcements',
			label: 'Ver  editais',
		},
	},
	{
		title: (
			<span>
				Banco de
				<br />
				Ideias
			</span>
		),
		image: {
			src: '/brainstorming-rafiki.svg',
			alt:
				'Pessoas fazendo um brainstorming com uma ilustração de uma grande lâmpada acima delas',
		},
		description:
			'Procurou e não encontrou a tecnologia que você precisa? Não se preocupe. Sugirá ideias para os pesquisadores desenvolverem novas tecnologias.',
		link: {
			href: '/ideas',
			label: 'Ver  ideias',
		},
	},
	{
		title: (
			<span>
				Banco de
				<br />
				pesquisadores
			</span>
		),
		image: {
			src: '/people-search-rafiki.svg',
			alt: 'Homem segurando uma lupa gigante enquanto procura uma pessoa numa página gigante',
		},
		description:
			'Lista atualizada de pesquisadores por área de atuação e suas invenções e necessidades de investimento. ',
		link: {
			href: '/researchers',
			label: 'Ver  pesquisadores',
		},
	},
];

const responsive = [
	{
		breakpoint: theme.screens.large,
		settings: {
			slidesToShow: 2.06,
			slidesToScroll: 2,
		},
	},
	{
		breakpoint: theme.screens.medium,
		settings: {
			slidesToShow: 1.06,
			slidesToScroll: 1,
			dots: true,
		},
	},
];

const Resources = () => {
	return (
		<Wrapper>
			<Container>
				<Slider
					infinite
					speed={500}
					slidesToShow={3}
					slidesToScroll={3}
					arrows={false}
					responsive={responsive}
				>
					{items.map((item) => (
						<Item
							key={item.title}
							title={item.title}
							image={item.image}
							description={item.description}
							link={item.link}
						/>
					))}
				</Slider>
			</Container>
		</Wrapper>
	);
};

export default Resources;
