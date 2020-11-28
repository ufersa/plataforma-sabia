const links = [
	{
		id: 1,
		label: 'Plataforma',
		href: '/welcome',
	},
	{
		id: 2,
		label: 'Funcionalidades',
		href: '#features',
	},
	{
		id: 3,
		label: 'Recursos',
		href: '#!',
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
		href: '#contact',
	},
];

export default links;
