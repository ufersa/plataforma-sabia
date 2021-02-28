export const defaultLinks = [
	{
		id: 1,
		label: 'Início',
		href: '/',
		dropdown: false,
		scrollLink: false,
	},
	{
		id: 2,
		label: 'Plataforma',
		href: '/about',
		dropdown: false,
		scrollLink: false,
	},
	{
		id: 3,
		label: 'Funcionalidades',
		href: '/about#features',
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
				label: 'Cursos',
				href: '/courses',
			},
			{
				id: 2,
				label: 'Fórum',
				href: '/forum',
			},
			{
				id: 3,
				label: 'Ajuda',
				href: '/help',
			},
			{
				id: 4,
				label: 'Banco de Ideias',
				href: '/ideas-bank',
			},
			{
				id: 5,
				label: 'Banco de Editais',
				href: '/announcements-bank',
			},
			{
				id: 6,
				label: 'Banco de Pesquisadores',
				href: '/researchers-bank',
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
		id: 0,
		label: 'Início',
		href: '/',
		dropdown: false,
		scrollLink: false,
	},
	{
		id: 1,
		label: 'Plataforma',
		to: 'intro',
		dropdown: false,
		scrollLink: true,
	},
	{
		id: 2,
		label: 'Funcionalidades',
		to: 'features',
		dropdown: false,
		scrollLink: true,
	},
	{
		id: 3,
		label: 'Recursos',
		to: 'resources',
		dropdown: true,
		scrollLink: true,
		sublinks: [
			{
				id: 1,
				label: 'Cursos',
				href: '/courses',
			},
			{
				id: 2,
				label: 'Fórum',
				href: '/forum',
			},
			{
				id: 3,
				label: 'Ajuda',
				href: '/help',
			},
			{
				id: 4,
				label: 'Banco de Ideias',
				href: '/ideas-bank',
			},
			{
				id: 5,
				label: 'Banco de Editais',
				href: '/announcements-bank',
			},
			{
				id: 6,
				label: 'Banco de Pesquisadores',
				href: '/researchers-bank',
			},
		],
	},
	{
		id: 4,
		label: 'Contato',
		to: 'contact',
		dropdown: false,
		scrollLink: true,
	},
	{
		id: 5,
		label: 'Minha conta',
		href: '/user/my-account',
		dropdown: false,
		showOnlyInHamburguer: true,
		showOnlyIfAuth: true,
	},
	{
		id: 6,
		label: 'Meu carrinho',
		href: '/shopping-cart',
		dropdown: false,
		showOnlyInHamburguer: true,
	},
];
