import React from 'react';

import FeatureSlider from './FeatureSlider';

import { Container, Title } from './styles';

const items = [
	{
		id: 1,
		to: '#investors',
		title: 'Funcionalidades para Inventores',
		items: [
			{
				label: 'Portfolio de tecnologias',
				description:
					'Cadastre gratuitamente a sua invenção e faça parte do hall de inventores que buscam resolver os problemas do semiárido por meio da pesquisa e desenvolvimento.',
				image: '/about/features/highlight.jpg',
			},
			{
				label: 'Análise de curadores',
				description:
					'Equipe qualificada de pesquisadores e técnicos nas suas áreas para analisar e escolher as melhores invenções para o portfólio de tecnologias.',
				image: '/about/features/image-2.jpg',
			},
			{
				label: 'Venda de tecnologias',
				description:
					'Disponibilize suas tecnologias cadastradas para venda. Todo as ferramentas de controle dos pedidos são gerenciadas dentro da própria plataforma.',
				image: '/about/features/details.jpg',
			},
			{
				label: 'Fóruns',
				description:
					'Tenha acesso ao nosso fórum de discussão sobre temas específicos e faça networking com os melhores pesquisadores da sua área de atuação.',
				image: '/about/features/image-6.jpg',
			},
			{
				label: 'Chat',
				description:
					'Converse com os interessados em suas invenções e feche negócios dentro da Plataforma Sabiá.',
				image: '/about/features/chat.jpg',
			},
			{
				label: 'Banco de editais',
				description: 'Lista de editais mais atuais de pesquisa e fomento à inovação.',
				image: '/about/features/image-4.jpg',
			},
			{
				label: 'Investimento em pesquisas',
				description:
					'Necessita de recursos para desenvolver ou impulsionar sua invenção? Os usuários da Plataforma Sabiá terão acesso aos mais variados meios de financiamento das suas pesquisas e desenvolvimento.',
				image: '/about/features/image-5.jpg',
			},
		],
		dots: [
			<span>
				<img src="/about/features/list.svg" alt="Ícone de lista" />
				<span>Portfolio de tecnologias</span>
			</span>,
			<span>
				<img src="/about/features/search.svg" alt="Ícone de lupa" />
				<span>Análise de curadores</span>
			</span>,
			<span>
				<img src="/about/features/dollar-sign.svg" alt="Ícone de símbolo do dólar" />
				<span>Venda de tecnologias</span>
			</span>,
			<span>
				<img src="/about/features/share.svg" alt="Ícone de compartilhar" />
				<span>Fóruns</span>
			</span>,
			<span>
				<img src="/about/features/message-circle.svg" alt="Ícone de balão de fala" />
				<span>Chat</span>
			</span>,
			<span>
				<img src="/about/features/archive.svg" alt="Ícone de caixa de arquivos" />
				<span>Banco de editais</span>
			</span>,
			<span>
				<img
					src="/about/features/trending-up.svg"
					alt="Ícone de linha de gráfico subindo"
				/>
				<span>Investimento em pesquisas</span>
			</span>,
		],
		reversed: false,
	},
	{
		id: 2,
		to: '#society',
		title: 'Funcionalidades para a Sociedade',
		items: [
			{
				label: 'Buscar tecnologias',
				description:
					'Acesse gratuitamente o banco de dados mais completo de tecnologias voltadas para a região do semiárido. Informações básicas, características técnicas, custos, mapas, fotos, vídeos e documentos.',
				image: '/about/features/instant-search.jpg',
			},
			{
				label: 'Compra de tecnologias',
				description:
					'Se interessou por uma invenção? Adquira de forma rápida e simples uma tecnologia que esteja disponível para venda e negocie diretamente com o seu inventor.',
				image: '/about/features/details-2.jpg',
			},
			{
				label: 'Assistência técnica',
				description:
					'Tenha acesso a uma assistência técnica mais próxima para a sua necessidade.',
				image: '/about/features/image-8.jpg',
			},
			{
				label: 'Banco de ideias',
				description:
					'Não encontrou o que busca? Não se preocupe, você poderá sugerir novos temas e ideias para que os pesquisadores possam consultar e, se caso interessem, desenvolver tecnologias baseadas na necessidade do povo do semiárido.',
				image: '/about/features/image-7.jpg',
			},
			{
				label: 'Avaliação de tecnologias',
				description:
					'Você possui alguma tecnologia existente em nosso portfólio? Avalie como está sendo a experiência com a tecnologia. Seu comentário ajudará outras pessoas futuramente a escolherem a melhor opção. ',
				image: '/about/features/image-9.jpg',
			},
			{
				label: 'Financiamento de tecnologias',
				description:
					'Achou a tecnologia e não tem recursos para adquiri-la? Tenha acesso a linhas de crédito específico para a sua necessidade por meio dos nossos parceiros financeiros.',
				image: '/about/features/image-10.jpg',
			},
		],
		dots: [
			<span>
				<img src="/about/features/search.svg" alt="Ícone de lupa" />
				<span>Buscar tecnologias</span>
			</span>,
			<span>
				<img src="/about/features/dollar-sign.svg" alt="Ícone de símbolo do dólar" />
				<span>Compra de tecnologias</span>
			</span>,
			<span>
				<img src="/about/features/thumbs-up.svg" alt="Ícone de joinha" />
				<span>Assistência técnica</span>
			</span>,
			<span>
				<img src="/about/features/archive.svg" alt="Ícone de caixa de arquivos" />
				<span>Banco de ideias</span>
			</span>,
			<span>
				<img src="/about/features/award.svg" alt="Ícone de medalha" />
				<span>Avaliação de tecnologias</span>
			</span>,
			<span>
				<img
					src="/about/features/trending-up.svg"
					alt="Ícone de linha de gráfico subindo"
				/>
				<span>Financiamento de tecnologias</span>
			</span>,
		],
		reversed: true,
	},
	{
		id: 3,
		to: '#financiers',
		title: 'Funcionalidades para Financiadores',
		items: [
			{
				label: 'Banco de pesquisadores',
				description:
					'Tenha acesso a lista atualizada de pesquisadores por área de atuação e conheça suas invenções e necessidades de investimento. Quem sabe você não encontre a próxima grande startup, hein?',
				image: '/about/features/image-11.jpg',
			},
			{
				label: 'Acesso aos compradores',
				description:
					'Converse com nossos usuários compradores e ofereça os seus serviços e produtos financeiros de forma personalizada.',
				image: '/about/features/image-12.jpg',
			},
			{
				label: 'Divulgação de Produtos',
				description:
					'Forneça os melhores serviços e produtos financeiros a nossos usuários via mailing. — Somente àqueles que permitirem receber notificações de parceiros.',
				image: '/about/features/image-13.jpg',
			},
		],
		dots: [
			<span>
				<img src="/about/features/users.svg" alt="Ícone de usuários" />
				<span>Banco de pesquisadores</span>
			</span>,
			<span>
				<img src="/about/features/heart.svg" alt="Ícone de coração" />
				<span>Crowdfunding</span>
			</span>,
			<span>
				<img
					src="/about/features/user-check.svg"
					alt="Ícone de usuário com um ícone de check ao seu lado"
				/>
				<span>Acesso aos compradores</span>
			</span>,
			<span>
				<img src="/about/features/tv.svg" alt="Ícone de TV" />
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
