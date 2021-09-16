const statuses = {
	technologies: [
		{ id: 'draft', name: 'statuses.draft' },
		{ id: 'pending', name: 'statuses.pending' },
		{ id: 'in_review', name: 'statuses.in_review' },
		{ id: 'requested_changes', name: 'statuses.requested_changes' },
		{ id: 'changes_made', name: 'statuses.changes_made' },
		{ id: 'approved', name: 'statuses.approved' },
		{ id: 'rejected', name: 'statuses.rejected' },
		{ id: 'published', name: 'statuses.published' },
	],

	technologyTypes: [
		{ id: 'equipment', name: 'statuses.equipment' },
		{ id: 'material', name: 'statuses.material' },
		{ id: 'methodology', name: 'statuses.methodology' },
		{ id: 'model', name: 'statuses.model' },
		{ id: 'process', name: 'statuses.process' },
		{ id: 'service', name: 'statuses.service' },
		{ id: 'software', name: 'statuses.software' },
		{ id: 'other', name: 'statuses.other' },
	],

	servicesTypes: [
		{ id: 'labor', name: 'statuses.labor' },
		{ id: 'specialized_technical_work', name: 'statuses.specialized_technical_work' },
		{ id: 'consulting', name: 'statuses.consulting' },
		{ id: 'analysis', name: 'statuses.analysis' },
		{ id: 'examination', name: 'statuses.examination' },
		{ id: 'expertise', name: 'statuses.expertise' },
		{ id: 'other', name: 'statuses.other' },
	],

	servicesMeasureUnit: [
		{ id: 'hour', name: 'statuses.hour' },
		{ id: 'day', name: 'statuses.day' },
		{ id: 'week', name: 'statuses.week' },
		{ id: 'month', name: 'statuses.month' },
		{ id: 'unit', name: 'statuses.unit' },
		{ id: 'other', name: 'statuses.otherUnit' },
	],

	reviewers: [
		{ id: 'pending', name: 'statuses.pending' },
		{ id: 'approved', name: 'statuses.approved' },
		{ id: 'rejected', name: 'statuses.rejected' },
	],

	technologyUseStatuses: [
		{ id: 'private', name: 'statuses.private' },
		{ id: 'enterprise', name: 'statuses.enterprise' },
		{ id: 'local_government', name: 'statuses.local_government' },
		{ id: 'provincial_government', name: 'statuses.provincial_government' },
		{ id: 'federal_government', name: 'statuses.federal_government' },
		{ id: 'other', name: 'statuses.other' },
	],

	fundingStatuses: [
		{ id: 'not_acquired', name: 'statuses.not_acquired' },
		{ id: 'acquiring', name: 'statuses.acquiring' },
		{ id: 'acquired', name: 'statuses.acquired' },
	],

	fundingTypes: [
		{ id: 'public', name: 'statuses.public' },
		{ id: 'private', name: 'statuses.private' },
		{ id: 'collective', name: 'statuses.collective' },
	],

	costTypes: [
		{ id: 'maintenance_costs', name: 'statuses.maintenance_costs' },
		{ id: 'implementation_costs', name: 'statuses.implementation_costs' },
	],

	costSubTypes: [
		{ id: 'service', name: 'statuses.service' },
		{ id: 'raw_input', name: 'statuses.raw_input' },
		{ id: 'equipment', name: 'statuses.equipment' },
		{ id: 'others', name: 'statuses.others' },
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
		{ id: 'open', name: 'statuses.open' },
		{ id: 'closed', name: 'statuses.closed' },
		{ id: 'canceled', name: 'statuses.canceled' },
	],

	questionStatuses: [
		{ id: 'unanswered', name: 'statuses.unanswered' },
		{ id: 'answered', name: 'statuses.answered' },
		{ id: 'disabled', name: 'statuses.disabled' },
	],

	disclaimersTypes: [
		{ id: 'privacypolicy', name: 'statuses.privacypolicy' },
		{ id: 'register', name: 'statuses.register' },
		{ id: 'technology', name: 'statuses.technology' },
		{ id: 'reviewers', name: 'Reviewers' },
	],

	users: [
		{ id: 'pending', name: 'statuses.pending' },
		{ id: 'verified', name: 'statuses.verified' },
		{ id: 'invited', name: 'statuses.invited' },
	],
	announcements: [
		{ id: 'pending', name: 'statuses.pending' },
		{ id: 'published', name: 'statuses.published' },
	],
	roles: [
		{ id: 'OWNER', name: 'Proprietário da Tecnologia' },
		{ id: 'DEFAULT_USER', name: 'Responsável' },
	],
	user_roles: [
		{ id: 'DEFAULT_USER', name: 'statuses.default_user' },
		{ id: 'RESEARCHER', name: 'statuses.researcher' },
		{ id: 'INVESTOR', name: 'statuses.investor' },
		{ id: 'REVIEWER', name: 'statuses.reviewer' },
		{ id: 'ADMIN', name: 'statuses.admin' },
	],
};

export default statuses;
