const statuses = {
	technologies: [
		{ id: 'draft', name: 'Draft' },
		{ id: 'pending', name: 'Pending' },
		{ id: 'in_review', name: 'In review' },
		{ id: 'requested_changes', name: 'Requested changes' },
		{ id: 'changes_made', name: 'Changes made' },
		{ id: 'approved', name: 'Approved' },
		{ id: 'rejected', name: 'Rejected' },
		{ id: 'published', name: 'Published' },
	],

	reviewers: [
		{ id: 'pending', name: 'Pending' },
		{ id: 'approved', name: 'Approved' },
		{ id: 'rejected', name: 'Rejected' },
	],

	technologyUseStatuses: [
		{ id: 'private', name: 'Private' },
		{ id: 'enterprise', name: 'Enterprise' },
		{ id: 'local_government', name: 'Local government' },
		{ id: 'provincial_government', name: 'Provincial government' },
		{ id: 'federal_government', name: 'Federal government' },
		{ id: 'other', name: 'Other' },
	],

	fundingStatuses: [
		{ id: 'not_acquired', name: 'Not acquired' },
		{ id: 'acquiring', name: 'Acquiring' },
		{ id: 'acquired', name: 'Acquired' },
	],

	fundingTypes: [
		{ id: 'public', name: 'Public' },
		{ id: 'private', name: 'Private' },
		{ id: 'collective', name: 'Collective' },
	],

	costTypes: [
		{ id: 'maintenance_costs', name: 'Maintenance costs' },
		{ id: 'implementation_costs', name: 'Implementation costs' },
	],

	costSubTypes: [
		{ id: 'service', name: 'Service' },
		{ id: 'raw_input', name: 'Raw input' },
		{ id: 'equipment', name: 'Equipment' },
		{ id: 'others', name: 'Others' },
	],

	measureUnit: [
		{
			id: 'und',
			name: 'Unidade',
		},
		{
			id: 'cx',
			name: 'Caixa',
		},
		{
			id: 'pc',
			name: 'Pacote',
		},
		{
			id: 'sc',
			name: 'Saco',
		},
		{
			id: 'mil',
			name: 'Milheiro',
		},
		{
			id: 'mm',
			name: 'Milímetro',
		},
		{
			id: 'cm',
			name: 'Centímetro',
		},
		{
			id: 'm',
			name: 'Metro',
		},
		{
			id: 'km',
			name: 'Quilômetro',
		},
		{
			id: 'pol',
			name: 'Polegada',
		},
		{
			id: 'mg',
			name: 'Miligrama',
		},
		{
			id: 'g',
			name: 'Grama',
		},
		{
			id: 'kg',
			name: 'Quilograma',
		},
		{
			id: 'ml',
			name: 'Mililitro',
		},
		{
			id: 'l',
			name: 'Litro',
		},
		{
			id: 'gl',
			name: 'Galão',
		},
		{
			id: 'lt',
			name: 'Latão',
		},
		{
			id: 'm2',
			name: 'Metro Quadrado',
		},
		{
			id: 'm3',
			name: 'Metro cúbico',
		},
		{
			id: 'km2',
			name: 'Quilômetro quadrado',
		},
		{
			id: 'km3',
			name: 'Quilômetro cúbico',
		},
		{
			id: 'ha',
			name: 'Hectare',
		},
		{
			id: 'month',
			name: 'Mês',
		},
		{
			id: 'day',
			name: 'Dia',
		},
		{
			id: 'h',
			name: 'Hora',
		},
		{
			id: 'min',
			name: 'Minuto',
		},
		{
			id: 'others',
			name: 'Outro',
		},
	],

	orders: [
		{ id: 'open', name: 'Open' },
		{ id: 'closed', name: 'Closed' },
		{ id: 'canceled', name: 'Canceled' },
	],

	questionStatuses: [
		{ id: 'unanswered', name: 'Unanswered' },
		{ id: 'answered', name: 'Answered' },
		{ id: 'disabled', name: 'Disabled' },
	],

	disclaimersTypes: [
		{ id: 'privacypolicy', name: 'Privacy policy' },
		{ id: 'register', name: 'Register' },
		{ id: 'technology', name: 'Technology' },
		{ id: 'reviewers', name: 'Reviewers' },
	],

	users: [
		{ id: 'pending', name: 'Pending' },
		{ id: 'verified', name: 'Verified' },
		{ id: 'invited', name: 'Invited' },
	],
	announcements: [
		{ id: 'pending', name: 'Pending' },
		{ id: 'published', name: 'Published' },
	],
};

export default statuses;
