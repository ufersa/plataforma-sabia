import React from 'react';

import FeatureSlider from './FeatureSlider';

import { Container, Title } from './styles';

const items = [
	{
		id: 1,
		title: 'Funcionalidades para Inventores',
		items: [
			{
				label: 'Portfolio de tecnologias',
				description:
					'Cadastre gratuitamente a sua invenção e faça parte do roll de inventores que buscam resolver os problemas do semiárido por meio da pesquisa e desenvolvimento.',
				image: '/welcome/features/highlight.jpg',
			},
			{
				label: 'Análise de curadores',
				description: '',
				image: '/welcome/features/image-2.jpg',
			},
			{
				label: 'Venda de tecnologias',
				description: '',
				image: '/welcome/features/details.jpg',
			},
			{
				label: 'Fóruns',
				description: '',
				image: '/welcome/features/image-6.jpg',
			},
			{
				label: 'Chat',
				description: '',
				image: '/welcome/features/chat.jpg',
			},
			{
				label: 'Banco de editais',
				description: '',
				image: '/welcome/features/image-4.jpg',
			},
			{
				label: 'Investimento em pesquisas',
				description: '',
				image: '/welcome/features/image-5.jpg',
			},
		],
		dots: [
			<span>
				<img src="/welcome/features/list.svg" alt="Ícone de lista" />
				<span>Portfolio de tecnologias</span>
			</span>,
			<span>
				<img src="/welcome/features/search.svg" alt="Ícone de lupa" />
				<span>Análise de curadores</span>
			</span>,
			<span>
				<img src="/welcome/features/dollar-sign.svg" alt="Ícone de símbolo do dólar" />
				<span>Venda de tecnologias</span>
			</span>,
			<span>
				<img src="/welcome/features/share.svg" alt="Ícone de compartilhar" />
				<span>Fóruns</span>
			</span>,
			<span>
				<img src="/welcome/features/message-circle.svg" alt="Ícone de balão de fala" />
				<span>Chat</span>
			</span>,
			<span>
				<img src="/welcome/features/archive.svg" alt="Ícone de caixa de arquivos" />
				<span>Banco de editais</span>
			</span>,
			<span>
				<img
					src="/welcome/features/trending-up.svg"
					alt="Ícone de linha de gráfico subindo"
				/>
				<span>Investimento em pesquisas</span>
			</span>,
		],
		reversed: false,
	},
	{
		id: 2,
		title: 'Funcionalidades para a Sociedade',
		items: [
			{
				label: 'Buscar tecnologias',
				description: '',
				image: '/welcome/features/instant-search.jpg',
			},
			{
				label: 'Compra de tecnologias',
				description: '',
				image: '/welcome/features/details-2.jpg',
			},
			{
				label: 'Assistência técnica',
				description:
					'Tenha acesso a uma assistência técnica mais próxima para a sua necessidade.',
				image: '/welcome/features/image-8.jpg',
			},
			{
				label: 'Banco de ideias',
				description: '',
				image: '/welcome/features/image-7.jpg',
			},
			{
				label: 'Avaliação de tecnologias',
				description: '',
				image: '/welcome/features/image-9.jpg',
			},
			{
				label: 'Financiamento de tecnologias',
				description: '',
				image: '/welcome/features/image-10.jpg',
			},
		],
		dots: [
			<span>
				<img src="/welcome/features/search.svg" alt="Ícone de lupa" />
				<span>Buscar tecnologias</span>
			</span>,
			<span>
				<img src="/welcome/features/dollar-sign.svg" alt="Ícone de símbolo do dólar" />
				<span>Compra de tecnologias</span>
			</span>,
			<span>
				<img src="/welcome/features/thumbs-up.svg" alt="Ícone de joinha" />
				<span>Assistência técnica</span>
			</span>,
			<span>
				<img src="/welcome/features/archive.svg" alt="Ícone de caixa de arquivos" />
				<span>Banco de ideias</span>
			</span>,
			<span>
				<img src="/welcome/features/award.svg" alt="Ícone de medalha" />
				<span>Avaliação de tecnologias</span>
			</span>,
			<span>
				<img
					src="/welcome/features/trending-up.svg"
					alt="Ícone de linha de gráfico subindo"
				/>
				<span>Financiamento de tecnologias</span>
			</span>,
		],
		reversed: true,
	},
	{
		id: 3,
		title: 'Funcionalidades para Financiadores',
		items: [
			{
				label: 'Banco de pesquisadores',
				description:
					'Tenha acesso a lista atualizada de pesquisadores por área de atuação e conheça suas invenções e necessidades de investimento. Quem sabe você não encontre a próxima grande startup, hein?',
				image: '/welcome/features/image-11.jpg',
			},
			{
				label: 'Crowdfunding',
				description: '',
				image: '/welcome/features/image-11.jpg',
			},
			{
				label: 'Acesso aos compradores',
				description: '',
				image: '/welcome/features/image-12.jpg',
			},
			{
				label: 'Divulgação de Produtos',
				description: '',
				image: '/welcome/features/image-13.jpg',
			},
		],
		dots: [
			<span>
				<img src="/welcome/features/users.svg" alt="Ícone de usuários" />
				<span>Banco de pesquisadores</span>
			</span>,
			<span>
				<img src="/welcome/features/heart.svg" alt="Ícone de coração" />
				<span>Crowdfunding</span>
			</span>,
			<span>
				<img
					src="/welcome/features/user-check.svg"
					alt="Ícone de usuário com um ícone de check ao seu lado"
				/>
				<span>Acesso aos compradores</span>
			</span>,
			<span>
				<img src="/welcome/features/tv.svg" alt="Ícone de TV" />
				<span>Divulgação de Produtos</span>
			</span>,
		],
		reversed: false,
	},
];

const Features = () => {
	return (
		<Container>
			<Title>Assim canta o sabiá!</Title>
			{items.map((item) => (
				<FeatureSlider key={item.id} item={item} />
			))}
		</Container>
	);
};

export default Features;
