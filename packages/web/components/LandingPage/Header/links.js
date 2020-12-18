const links = [
	{
		id: 1,
		label: 'Plataforma',
		to: 'platform',
		dropdown: false,
	},
	{
		id: 2,
		label: 'Funcionalidades',
		to: 'features',
		dropdown: false,
	},
	{
		id: 3,
		label: 'Recursos',
		to: 'resources',
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
		id: 4,
		label: 'Contato',
		to: 'contact',
		dropdown: false,
	},
];

export default links;
