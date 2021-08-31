import { internal as internalPages } from '../../utils/enums/pages.enum';

export const defaultLinks = [
	{
		label: 'Entrar',
		dropdown: false,
		showOnlyInHamburguer: true,
		href: internalPages.signIn,
	},
	{
		id: 1,
		label: 'Início',
		href: '/',
		dropdown: false,
		scrollLink: false,
	},
	{
		id: 2,
		label: 'Sobre',
		href: '/about',
		dropdown: false,
		scrollLink: false,
	},
	{
		id: 3,
		label: 'Busca',
		href: '/search',
		dropdown: false,
		scrollLink: false,
	},
	{
		id: 4,
		label: 'Recursos',
		href: '/about#resources',
		dropdown: true,
		scrollLink: false,
		sublinks: [
			{
				id: 1,
				label: 'Podcasts',
				href: 'https://anchor.fm/papodesabia',
				external: true,
			},
			{
				id: 2,
				label: 'Cursos',
				href: 'https://cursos.plataformasabia.com',
			},
			{
				id: 3,
				label: 'Blog',
				href: 'https://blog.plataformasabia.com/',
				external: true,
			},
			{
				id: 4,
				label: 'Banco de Ideias',
				href: '/ideias',
			},
			{
				id: 5,
				label: 'Banco de Editais',
				href: '/editais',
			},
			{
				id: 6,
				label: 'Vitrines tecnológicas',
				href: '/vitrines',
			},
		],
	},
	{
		id: 5,
		label: 'Contato',
		href: '/about#contact',
		dropdown: false,
		scrollLink: false,
	},
	{
		id: 6,
		label: 'Minha conta',
		href: '/user/my-account',
		dropdown: false,
		showOnlyInHamburguer: true,
		showOnlyIfAuth: true,
	},
	{
		id: 7,
		label: 'Meu carrinho',
		href: '/shopping-cart',
		dropdown: false,
		showOnlyInHamburguer: true,
	},
];

export const aboutLinks = [
	{
		label: 'Entrar',
		openModalComponent: 'login',
		dropdown: false,
		showOnlyInHamburguer: true,
		isButton: true,
	},
	{
		id: 1,
		label: 'Início',
		href: '/',
		dropdown: false,
		scrollLink: false,
	},
	{
		id: 2,
		label: 'Sobre',
		to: 'intro',
		dropdown: false,
		scrollLink: true,
	},

	{
		id: 3,
		label: 'Busca',
		href: '/search',
		dropdown: false,
		scrollLink: false,
	},
	{
		id: 4,
		label: 'Recursos',
		to: 'resources',
		dropdown: true,
		scrollLink: true,
		sublinks: [
			{
				id: 1,
				label: 'Podcasts',
				href: 'https://anchor.fm/papodesabia',
				external: true,
			},
			{
				id: 2,
				label: 'Cursos',
				href: 'https://cursos.plataformasabia.com',
			},
			{
				id: 3,
				label: 'Blog',
				href: 'https://blog.plataformasabia.com/',
				external: true,
			},
			{
				id: 4,
				label: 'Banco de Ideias',
				href: '/ideias',
			},
			{
				id: 5,
				label: 'Banco de Editais',
				href: '/editais',
			},
			{
				id: 6,
				label: 'Vitrines tecnológicas',
				href: '/vitrines',
			},
		],
	},
	{
		id: 5,
		label: 'Contato',
		to: 'contact',
		dropdown: false,
		scrollLink: true,
	},
	{
		id: 6,
		label: 'Minha conta',
		href: '/user/my-account',
		dropdown: false,
		showOnlyInHamburguer: true,
		showOnlyIfAuth: true,
	},
	{
		id: 7,
		label: 'Meu carrinho',
		href: '/shopping-cart',
		dropdown: false,
		showOnlyInHamburguer: true,
	},
];
