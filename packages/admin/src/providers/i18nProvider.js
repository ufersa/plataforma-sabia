/* eslint-disable import/no-extraneous-dependencies */
import polyglotI18nProvider from 'ra-i18n-polyglot';
import englishMessages from 'ra-language-english';
import ptBrMessages from 'ra-language-pt-br';

const ptBr = {
	...ptBrMessages,
	resources: {
		users: {
			name: 'Usuarios',
			fields: {
				full_name: 'Nome completo',
			},
		},
		institutions: {
			name: 'Organizaçoes',
			fields: {
				name: 'Nome',
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
	'en', // Default locale
);

export default i18nProvider;
