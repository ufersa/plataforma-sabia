import { internal as internalPages, landingPage } from '../../utils/enums/pages.enum';

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
		href: internalPages.home,
		dropdown: false,
		scrollLink: false,
	},
	{
		id: 2,
		label: 'Sobre',
		href: landingPage.url,
		dropdown: false,
		scrollLink: false,
	},
	{
		id: 3,
		label: 'Busca',
		href: internalPages.search,
		dropdown: false,
		scrollLink: false,
	},
	{
		id: 4,
		label: 'Recursos',
		href: `${landingPage.url}${landingPage.resources}`,
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
				href: internalPages.ideas,
			},
			{
				id: 5,
				label: 'Banco de Editais',
				href: internalPages.announcements,
			},
			{
				id: 6,
				label: 'Vitrines tecnológicas',
				href: internalPages.showcase,
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
		href: internalPages.myAccount,
		dropdown: false,
		showOnlyInHamburguer: true,
		showOnlyIfAuth: true,
	},
	{
		id: 7,
		label: 'Meu carrinho',
		href: internalPages.shoppingCart,
		dropdown: false,
		showOnlyInHamburguer: true,
	},
];

export const aboutLinks = [
	{
		label: 'Entrar',
		dropdown: false,
		showOnlyInHamburguer: true,
		href: internalPages.signIn,
	},
	{
		id: 1,
		label: 'Início',
		href: internalPages.home,
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
		href: internalPages.search,
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
			// {
			// 	id: 4,
			// 	label: 'Banco de Ideias',
			// 	href: internalPages.ideas,
			// },
			{
				id: 5,
				label: 'Banco de Editais',
				href: internalPages.announcements,
			},
			{
				id: 6,
				label: 'Vitrines tecnológicas',
				href: internalPages.showcase,
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
		href: internalPages.myAccount,
		dropdown: false,
		showOnlyInHamburguer: true,
		showOnlyIfAuth: true,
	},
	{
		id: 7,
		label: 'Meu carrinho',
		href: internalPages.shoppingCart,
		dropdown: false,
		showOnlyInHamburguer: true,
	},
];
