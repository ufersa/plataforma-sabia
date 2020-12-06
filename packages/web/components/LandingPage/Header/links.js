const links = [
	{
		id: 1,
		label: 'Plataforma',
		to: 'platform',
	},
	{
		id: 2,
		label: 'Funcionalidades',
		to: 'features',
	},
	{
		id: 3,
		label: 'Recursos',
		to: 'resources',
		links: [
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
		],
	},
	{
		id: 4,
		label: 'Contato',
		to: 'contact',
	},
];

export default links;
