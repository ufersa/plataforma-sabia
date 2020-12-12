const links = [
	{
		id: 1,
		label: 'Início',
		href: '/',
		dropdown: false,
	},
	{
		id: 2,
		label: 'Busca',
		href: '/search',
		dropdown: false,
	},
	{
		id: 3,
		label: 'Categorias',
		href: '/categories',
		dropdown: false,
	},
	{
		id: 4,
		label: 'Desenvolvedores',
		href: '/developers',
		dropdown: false,
	},
	{
		id: 5,
		label: 'Recursos',
		href: '/about/#resources',
		dropdown: true,
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
				href: '/ideas',
			},
			{
				id: 5,
				label: 'Banco de Editais',
				href: '/announcements',
			},
			{
				id: 6,
				label: 'Banco de Pesquisadores',
				href: '/researchers',
			},
		],
	},
	{
		id: 6,
		label: 'Sobre',
		href: '/about',
		dropdown: false,
	},
	{
		id: 7,
		label: 'Contato',
		href: '/contact-us',
		dropdown: false,
	},
];

export default links;
