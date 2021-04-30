/* eslint-disable import/no-extraneous-dependencies */
import polyglotI18nProvider from 'ra-i18n-polyglot';
import englishMessages from 'ra-language-english';
import ptBrMessages from 'ra-language-pt-br';
import { statuses_ptBr, statuses_en } from './translations/statuses';

const common_fields = {
	id: 'Id',
	title: 'Título',
	description: 'Descrição',

	technologies: 'Tecnologias',
	technology: 'Tecnologia',
	technology_id: 'Tecnologia',
	greatArea: 'Grande área',
	area: 'Área',
	subArea: 'Sub-área',
	speciality: 'Especialidade',
	stage: 'Estágio',
	classification: 'Classificação',
	dimension: 'Dimensão',
	target_audience: 'Público-alvo',
	biome: 'Bioma Principal',
	government_program: 'Programa de Governo',
	google_place: 'Google place',
	region: 'Região',

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
	current_image: 'Imagem atual',
	current_file: 'Arquivo atual',

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

const menuSections = {
	ptBr: {
		solutions: "Soluções",
		usersSection: "Usuários",
		config: "Configurações"
	},
	en: {
		solutions: "Solutions",
		usersSection: "Users",
		config: "Settings"
	}
}

const ptBr = {
	...ptBrMessages,
	statuses: statuses_ptBr,
	labels: { ...common_fields },
	menu: menuSections.ptBr,
	resources: {
		technologies: {
			name: 'Tecnologias',
			fields: {
				...common_fields,
				private: 'Privado',
				public_domain: 'Domínio público',
				intellectual_property: 'Propriedade intelectual',
				thumbnail_id: 'Imagem principal',
				likes: 'Likes',
				patent: 'Patente',
				patent_number: 'Número da patente',
				primary_purpose: 'Objetivo Principal',
				secondary_purpose: 'Objetivos secundários',
				application_mode: 'Aplicação',
				application_examples: 'Exemplos de Aplicação',
				installation_time: 'Duração do processo de instalação da tecnologia',
				solves_problem: 'Problemas que a tecnologia soluciona',
				entailes_problem: 'Problemas que a tecnologia acarreta',
				requirements: 'Pré-requisitos para a implantação',
				risks: 'Riscos associados à tecnologia',
				contribution: 'Contribuição para o semiárido',

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
			delete_sucess: 'Excluído com sucesso',
		},
	},
};
const en = {
	...englishMessages,
	statuses: statuses_en,
	menu: menuSections.en,
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
		current_image: 'Current image',
		current_file: 'Current file',

		about: 'About',
		funding: 'Funding',
		attachments: 'Attachments',
		maps: 'Maps',
		revisions: 'Revisions',
		reviews: 'Reviews',
		bookmarks: 'Bookmarks',
		uploads: 'Uploads',

		keywords: 'Keywords',
		greatArea: 'Great Area',
		area: 'Area',
		subArea: 'SubArea',
		speciality: 'Speciality',
		stage: 'Stage',
		classification: 'Classification',
		dimension: 'Dimension',
		target_audience: 'Target audience',
		biome: 'Biome',
		government_program: 'Government program',
		google_place: 'Google place',
		region: 'Region',
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
			delete_sucess: 'Successfully deleted',
		},
	},
};

const i18nProvider = polyglotI18nProvider(
	(locale) => (locale === 'pt-br' ? ptBr : en),
	'pt-br', // Default locale
);

export default i18nProvider;
