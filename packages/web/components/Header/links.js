const links = [
	{
		id: 1,
		label: 'Início',
		href: '/',
		dropdown: false,
		external: false,
	},
	{
		id: 2,
		label: 'Busca',
		href: '/search',
		dropdown: false,
		external: false,
	},
	{
		id: 3,
		label: 'Recursos',
		href: '/about/#resources',
		dropdown: true,
		external: false,
		sublinks: [
			{
				id: 1,
				label: 'Cursos',
				href: '/courses',
				external: false,
			},
			{
				id: 2,
				label: 'Fórum',
				href: '/forum',
				external: false,
			},
			{
				id: 3,
				label: 'Ajuda',
				href: '/help',
				external: false,
			},
			{
				id: 4,
				label: 'Banco de Ideias',
				href: '/ideas',
				external: false,
			},
			{
				id: 5,
				label: 'Banco de Editais',
				href: '/announcements',
				external: false,
			},
			{
				id: 6,
				label: 'Banco de Pesquisadores',
				href: '/researchers',
				external: false,
			},
		],
	},
	{
		id: 4,
		label: 'Sobre',
		href: '/about',
		dropdown: false,
		external: false,
	},
	{
		id: 5,
		label: 'Contato',
		href: '/contact-us',
		dropdown: false,
		external: false,
	},
	{
		id: 6,
		label: 'Blog',
		href: 'https://blog.plataformasabia.com/',
		dropdown: false,
		external: true,
	},
];

export default links;
