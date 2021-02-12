/* eslint-disable import/no-extraneous-dependencies */
import polyglotI18nProvider from 'ra-i18n-polyglot';
import englishMessages from 'ra-language-english';
import ptBrMessages from 'ra-language-pt-br';

const common_fields = {
	id: 'Id',
	title: 'Título',
	description: 'Descrição',

	technologies: 'Tecnologias',
	technology: 'Tecnologia',
	technology_id: 'Tecnologia',

	user_id: 'Usuário',

	institutions: 'Organizações',
	institution: 'Organização',
	institution_id: 'Organização',

	roles: 'Papéis',
	role: 'Papel',
	role_id: 'Papel',

	terms: 'Termos',
	term: 'Termo',
	term_id: 'Termo',

	permissions: 'Permissões',
	permission: 'Permissão',
	permission_id: 'Permissão',

	taxonomies: 'Taxonomias',
	taxonomy: 'Taxonomia',
	taxonomy_id: 'Taxonomia',

	reviewer: 'Revisor',
	reviewer_id: 'Revisor',

	start_date: 'Data de início',
	end_date: 'Data final',
	created_at: 'Criado em',
	updated_at: 'Atualizado em',
	type: 'Tipo',

	comment: 'Comentário',
	comments: 'Comentários',
	url: 'Url',
	status: 'Status',
	about: 'Geral',
	rating: 'Avaliação',
	positive: 'Positivo',
	negative: 'Negativo',
	resend_token: 'Reenviar Ativação',

	keywords: 'Palavras-chave',
	category: 'Categoria',
	categories: 'Categorias',
	responsible: 'Responsável',
	responsibles: 'Responsáveis',
	owner: 'Responsável',
	buyer: 'Comprador',

	address: 'Endereço',
	address2: 'Complemento',
	district: 'Bairro',
	zipcode: 'CEP',
	city: 'Cidade',
	state: 'Estado',
	country: 'País',
	phone_number: 'Telefone',
	full_name: 'Nome completo',

	funding: 'Financiamento',
	attachments: 'anexos',
	maps: 'Mapas',
	revisions: 'Revisões',
	reviews: 'Avaliações',
	bookmarks: 'Favoritos',
	uploads: 'Uploads',
};

const ptBr = {
	...ptBrMessages,
	labels: { ...common_fields },
	resources: {
		technologies: {
			name: 'Tecnologias',
			fields: {
				...common_fields,
				funding_required: 'Financiamento é necessário',
				notes: 'Notas',
				funding_value: 'Valor do financiamento',
				funding_status: 'Status do financiamento',
				funding_type: 'Tipo de financiamento',
				is_seller: 'Está a venda?',
				price: 'Preço R$',
				costs: 'Custos',

				cost_type: 'Tipo de custo',
				quantity: 'Quantidade',
				value: 'Valor',
				measure_unit: 'Unidade de medida',

				historic: 'Histórico',
				assessment: 'Avaliações',
			},
		},
		terms: {
			name: 'Termos',
			fields: {
				...common_fields,
				parent_id: 'Termo Pai',
			},
		},
		taxonomies: {
			name: 'Taxonomias',
			fields: {
				...common_fields,
			},
		},
		users: {
			name: 'Usuários',
			fields: {
				...common_fields,
				first_name: 'Primeiro Nome',
				last_name: 'Sobrenome',
				cpf: 'CPF',
				birth_date: 'Data de nascimento',

				institution: {
					...common_fields,
					name: 'Nome',
					initials: 'Sigla',
					cnpj: 'CNPJ',
					lat: 'Lat',
					lng: 'Lng',
					website: 'Website',
					logo_id: 'Logo',
				},
			},
		},
		roles: {
			name: 'Papéis',
			fields: {
				...common_fields,
			},
		},
		permissions: {
			name: 'Permissões',
			fields: {
				...common_fields,
			},
		},
		reviewers: {
			name: 'Revisores',
			fields: {
				...common_fields,
			},
		},
		orders: {
			name: 'Pedidos',
			fields: {
				...common_fields,
				quantity: 'Quantidade',
				use: 'Uso',
				cancellation_reason: 'Motivo de cancelamento',
				unit_value: 'Valor unitário',
			},
		},
		institutions: {
			name: 'Organizações',
			fields: {
				...common_fields,
				name: 'Nome',
				initials: 'Sigla',
				cnpj: 'CNPJ',
				lat: 'Lat',
				lng: 'Lng',
				website: 'Website',
				logo_id: 'Logo',
			},
		},
		ideas: {
			name: 'Banco de Ideias',
			fields: {
				...common_fields,
			},
		},
		announcements: {
			name: 'Banco de Editais',
			fields: {
				...common_fields,
				announcement_number: 'Número',
				financial_resources: 'Recursos financeiros',
				targetAudiences: 'Público-alvo',
			},
		},
	},
	sabia: {
		notification: {
			send_email_sucess: 'Email enviado com sucesso',
		},
	},
};
const en = {
	...englishMessages,
	labels: {
		owner: 'Owner',
		buyer: 'Buyer',
		responsibles: 'Responsibles',
		full_name: 'Full name',
		start_date: 'Start date',
		end_date: 'End date',
		role: 'Role',
		title: 'Title',
		description: 'Description',
		status: 'Status',

		resend_token: 'Resend Activation',

		about: 'About',
		funding: 'Funding',
		attachments: 'Attachments',
		maps: 'Maps',
		revisions: 'Revisions',
		reviews: 'Reviews',
		bookmarks: 'Bookmarks',
		uploads: 'Uploads',
	},
	resources: {
		technologies: { name: 'Technologies' },
		terms: { name: 'Terms' },
		taxonomies: { name: 'Taxonomies' },
		users: { name: 'Users' },
		roles: { name: 'Roles' },
		permissions: { name: 'Permissions' },
		reviewers: { name: 'Reviewers' },
		orders: { name: 'Orders' },
		institutions: { name: 'Institutions' },
		ideas: { name: 'Ideas' },
		announcements: { name: 'Announcements' },
	},
	sabia: {
		notification: {
			send_email_sucess: 'Email successfully sent',
		},
	},
};

const i18nProvider = polyglotI18nProvider(
	(locale) => (locale === 'pt-br' ? ptBr : en),
	'pt-br', // Default locale
);

export default i18nProvider;
