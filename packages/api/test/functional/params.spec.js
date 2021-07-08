const { test, trait } = use('Test/Suite')('Params');
const Term = use('App/Models/Term');
const Technology = use('App/Models/Technology');
const Taxonomy = use('App/Models/Taxonomy');
const Role = use('App/Models/Role');
const Permission = use('App/Models/Permission');
const User = use('App/Models/User');
const Disclaimer = use('App/Models/Disclaimer');
const Factory = use('Factory');
const { createUser } = require('../utils/Suts');
const {
	roles: { ADMIN: ADMIN_ROLE },
} = require('../../app/Utils');

trait('Auth/Client');
trait('Test/ApiClient');

const defaultParams = {
	order: 'asc',
	page: 1,
	orderBy: 'id',
	perPage: 10,
	id: false,
	embed: false,
};

const embedParams = {
	params: {
		order: 'asc',
		page: 1,
		orderBy: 'id',
		perPage: 10,
		id: false,
		embed: { all: true, ids: false },
	},
};

const getTermsDB = async (params = false) => {
	const terms = await Term.query().withParams(params ? { params } : { params: defaultParams });
	const total = await Term.getCount();
	const totalPages = Math.ceil(total / (params.perPage || defaultParams.perPage));

	return {
		terms,
		total,
		totalPages,
	};
};

test('GET list of terms with default parameters', async ({ client }) => {
	const { terms, total, totalPages } = await getTermsDB();
	const response = await client.get('terms').end();
	response.assertStatus(200);
	response.assertJSONSubset(terms.toJSON());
	response.assertHeader('x-sabia-total', total);
	response.assertHeader('x-sabia-totalpages', totalPages);
});

test('GET list of terms without parameters', async ({ client }) => {
	const { terms, total, totalPages } = await getTermsDB();
	const response = await client
		.get('terms')
		.query({})
		.end();
	response.assertStatus(200);
	response.assertJSONSubset(terms.toJSON());
	response.assertHeader('x-sabia-total', total);
	response.assertHeader('x-sabia-totalpages', totalPages);
});

test('GET list of terms with invalid order and orderBy parameters', async ({ client }) => {
	const { terms, total, totalPages } = await getTermsDB();
	const response = await client
		.get('terms')
		.query({ ...defaultParams, order: 'invalid', orderBy: 'invalid' })
		.end();
	response.assertStatus(200);
	response.assertJSONSubset(terms.toJSON());
	response.assertHeader('x-sabia-total', total);
	response.assertHeader('x-sabia-totalpages', totalPages);
});

test('GET list of terms with only the order parameter valid', async ({ client }) => {
	const { terms, total, totalPages } = await getTermsDB({ ...defaultParams, order: 'desc' });
	const response = await client
		.get('terms')
		.query({ order: 'DESC', orderBy: 'invalid', page: 'invalid', perPage: 'invalid' })
		.end();
	response.assertStatus(200);
	response.assertJSONSubset(terms.toJSON());
	response.assertHeader('x-sabia-total', total);
	response.assertHeader('x-sabia-totalpages', totalPages);
});

test('GET list of terms with only the orderBy parameter valid', async ({ client }) => {
	const { terms, total, totalPages } = await getTermsDB({ ...defaultParams, orderBy: 'slug' });
	const response = await client
		.get('terms')
		.query({ orderBy: 'SLUG', order: 'invalid', page: 'invalid', perPage: 'invalid' })
		.end();
	response.assertStatus(200);
	response.assertJSONSubset(terms.toJSON());
	response.assertHeader('x-sabia-total', total);
	response.assertHeader('x-sabia-totalpages', totalPages);
});

test('GET list of terms with valid parameters', async ({ client }) => {
	const params = {
		orderBy: 'slug',
		order: 'desc',
		page: 2,
		perPage: 2,
		id: false,
		embed: false,
	};
	const { terms, total, totalPages } = await getTermsDB(params);
	const response = await client
		.get('terms')
		.query(params)
		.end();
	response.assertStatus(200);
	response.assertJSONSubset(terms.toJSON());
	response.assertHeader('x-sabia-total', total);
	response.assertHeader('x-sabia-totalpages', totalPages);
});

test('GET list of Technologies without parameters', async ({ client }) => {
	const technologies = await Technology.query()
		.available()
		.withParams({ params: defaultParams });

	const total = await Technology.query()
		.available()
		.getCount();
	const totalPages = Math.ceil(total / defaultParams.perPage);

	const response = await client
		.get('technologies')
		.query({})
		.end();

	response.assertStatus(200);
	response.assertJSONSubset(technologies.toJSON());
	response.assertHeader('x-sabia-total', total);
	response.assertHeader('x-sabia-totalpages', totalPages);
});

test('GET list of Technologies with notIn filter', async ({ client }) => {
	const technologies = await Technology.query()
		.available()
		.limit(5)
		.fetch();

	const response = await client.get(`technologies?notIn=${technologies.rows[0].id}`).end();
	response.assertStatus(200);

	technologies.rows.splice(0, 1);
	response.assertJSONSubset(technologies.toJSON());
});

test('GET list of Taxonomies without parameters', async ({ client }) => {
	const taxonomies = await Taxonomy.query().withParams({ params: defaultParams });

	const total = await Taxonomy.getCount();
	const totalPages = Math.ceil(total / defaultParams.perPage);

	const response = await client
		.get('taxonomies')
		.query({})
		.end();
	response.assertStatus(200);
	response.assertJSONSubset(taxonomies.toJSON());
	response.assertHeader('x-sabia-total', total);
	response.assertHeader('x-sabia-totalpages', totalPages);
});

test('GET list of Roles without parameters', async ({ client }) => {
	const rolesCollection = await Role.query().withParams({ params: defaultParams });

	const total = await Role.getCount();
	const totalPages = Math.ceil(total / defaultParams.perPage);

	const { user: loggedUser } = await createUser({ append: { role: ADMIN_ROLE } });

	const response = await client
		.get('roles')
		.loginVia(loggedUser, 'jwt')
		.query({})
		.end();
	response.assertStatus(200);
	response.assertJSONSubset(rolesCollection.toJSON());
	response.assertHeader('x-sabia-total', total);
	response.assertHeader('x-sabia-totalpages', totalPages);
});

test('GET list of Permissions without parameters', async ({ client }) => {
	const permissions = await Permission.query().withParams({ params: defaultParams });

	const total = await Permission.getCount();
	const totalPages = Math.ceil(total / defaultParams.perPage);

	const { user: loggedUser } = await createUser({ append: { role: ADMIN_ROLE } });

	const response = await client
		.get('permissions')
		.loginVia(loggedUser, 'jwt')
		.query({})
		.end();
	response.assertStatus(200);
	response.assertJSONSubset(permissions.toJSON());
	response.assertHeader('x-sabia-total', total);
	response.assertHeader('x-sabia-totalpages', totalPages);
});

test('GET list of roles embedded with associated tables', async ({ client }) => {
	const roles = await Role.query().withParams(embedParams);

	const total = await Role.getCount();
	const totalPages = Math.ceil(total / defaultParams.perPage);

	const { user: loggedUser } = await createUser({ append: { role: ADMIN_ROLE } });

	const response = await client
		.get('roles?embed')
		.loginVia(loggedUser, 'jwt')
		.end();
	response.assertStatus(200);
	response.assertJSONSubset(roles.toJSON());
	response.assertHeader('x-sabia-total', total);
	response.assertHeader('x-sabia-totalpages', totalPages);
});

test('GET list of roles embedded with associated tables (with custom parameters)', async ({
	client,
}) => {
	const customParams = {
		order: 'desc',
		page: 2,
		orderBy: 'role',
		perPage: 2,
		id: false,
		embed: { all: true, ids: false },
	};
	const roles = await Role.query().withParams({ params: customParams });

	const total = await Role.getCount();
	const totalPages = Math.ceil(total / customParams.perPage);

	const { user: loggedUser } = await createUser({ append: { role: ADMIN_ROLE } });

	const response = await client
		.get('/roles?embed&perPage=2&page=2&order=desc&orderBy=role')
		.loginVia(loggedUser, 'jwt')
		.end();
	response.assertStatus(200);
	response.assertJSONSubset(roles.toJSON());
	response.assertHeader('x-sabia-total', total);
	response.assertHeader('x-sabia-totalpages', totalPages);
});

test('GET list of roles embedded with the ids of the associated tables', async ({ client }) => {
	const roles = await Role.query().withParams({
		params: {
			...defaultParams,
			embed: { all: false, ids: true },
		},
	});

	const total = await Role.getCount();
	const totalPages = Math.ceil(total / defaultParams.perPage);

	const { user: loggedUser } = await createUser({ append: { role: ADMIN_ROLE } });

	const response = await client
		.get('roles?embed=ids')
		.loginVia(loggedUser, 'jwt')
		.end();
	response.assertStatus(200);
	response.assertJSONSubset(roles.toJSON());
	response.assertHeader('x-sabia-total', total);
	response.assertHeader('x-sabia-totalpages', totalPages);
});

test('GET role embedded with associated tables (with custom parameters)', async ({ client }) => {
	const customParams = {
		...embedParams.params,
		id: 1,
	};
	const roles = await Role.query().withParams({ params: customParams });

	const { user: loggedUser } = await createUser({ append: { role: ADMIN_ROLE } });

	const response = await client
		.get('/roles/1?embed')
		.loginVia(loggedUser, 'jwt')
		.end();
	response.assertStatus(200);
	response.assertJSONSubset(roles.toJSON());
});

test('GET role embedded with the ids of the associated tables', async ({ client }) => {
	const roles = await Role.query().withParams(
		{
			params: {
				...defaultParams,
				embed: { all: false, ids: true },
			},
		},
		{ filterById: true },
	);

	const total = await Role.getCount();
	const totalPages = Math.ceil(total / defaultParams.perPage);

	const { user: loggedUser } = await createUser({ append: { role: ADMIN_ROLE } });

	const response = await client
		.get('roles?embed=ids')
		.loginVia(loggedUser, 'jwt')
		.end();
	response.assertStatus(200);
	response.assertJSONSubset(roles.toJSON());
	response.assertHeader('x-sabia-total', total);
	response.assertHeader('x-sabia-totalpages', totalPages);
});

test('GET list of users embedded with associated tables', async ({ client }) => {
	const { user: loggedUser } = await createUser({ append: { role: ADMIN_ROLE } });
	const users = await User.query().withParams(embedParams);

	const total = await User.getCount();
	const totalPages = Math.ceil(total / defaultParams.perPage);

	const response = await client
		.get('users?embed')
		.loginVia(loggedUser, 'jwt')
		.end();
	response.assertStatus(200);
	response.assertJSONSubset(users.toJSON());
	response.assertHeader('x-sabia-total', total);
	response.assertHeader('x-sabia-totalpages', totalPages);
});

test('GET list of taxonomies embedded with associated tables', async ({ client }) => {
	const taxonomies = await Taxonomy.query().withParams(embedParams);

	const total = await Taxonomy.getCount();
	const totalPages = Math.ceil(total / defaultParams.perPage);

	const response = await client.get('taxonomies?embed').end();
	response.assertStatus(200);
	response.assertJSONSubset(taxonomies.toJSON());
	response.assertHeader('x-sabia-total', total);
	response.assertHeader('x-sabia-totalpages', totalPages);
});

test('GET list of terms embedded with associated tables', async ({ client }) => {
	const terms = await Term.query().withParams(embedParams);

	const total = await Term.getCount();
	const totalPages = Math.ceil(total / defaultParams.perPage);

	const response = await client.get('terms?embed').end();
	response.assertStatus(200);
	response.assertJSONSubset(terms.toJSON());
	response.assertHeader('x-sabia-total', total);
	response.assertHeader('x-sabia-totalpages', totalPages);
});

test('GET list of permissions embedded with associated tables', async ({ client }) => {
	const permissions = await Permission.query().withParams(embedParams);

	const total = await Permission.getCount();
	const totalPages = Math.ceil(total / defaultParams.perPage);

	const { user: loggedUser } = await createUser({ append: { role: ADMIN_ROLE } });

	const response = await client
		.get('permissions?embed')
		.loginVia(loggedUser, 'jwt')
		.end();
	response.assertStatus(200);
	response.assertJSONSubset(permissions.toJSON());
	response.assertHeader('x-sabia-total', total);
	response.assertHeader('x-sabia-totalpages', totalPages);
});

test('GET list of disclaimers embedded with associated tables', async ({ client }) => {
	const disclaimers = await Disclaimer.query().withParams(embedParams);

	const total = await Disclaimer.getCount();
	const totalPages = Math.ceil(total / defaultParams.perPage);

	const { user: loggedUser } = await createUser({ append: { role: ADMIN_ROLE } });

	const response = await client
		.get('disclaimers?embed')
		.loginVia(loggedUser, 'jwt')
		.end();
	response.assertStatus(200);
	response.assertJSONSubset(disclaimers.toJSON());
	response.assertHeader('x-sabia-total', total);
	response.assertHeader('x-sabia-totalpages', totalPages);
});

test('GET disclaimers/:id embedded with associated tables', async ({ client }) => {
	const disclaimer = await Disclaimer.first();

	const total = 1;
	const totalPages = 1;

	const { user: loggedUser } = await createUser({ append: { role: ADMIN_ROLE } });

	const response = await client
		.get(`disclaimers/${disclaimer.id}?embed`)
		.loginVia(loggedUser, 'jwt')
		.end();
	response.assertStatus(200);
	response.assertJSONSubset(disclaimer.toJSON());
	response.assertHeader('x-sabia-total', total);
	response.assertHeader('x-sabia-totalpages', totalPages);
});

test('GET list of technologies embedded with associated tables', async ({ client }) => {
	const technologies = await Technology.query()
		.available()
		.withParams(embedParams);

	const total = await Technology.query()
		.available()
		.getCount();
	const totalPages = Math.ceil(total / defaultParams.perPage);

	const response = await client.get('technologies?embed').end();
	response.assertStatus(200);
	response.assertJSONSubset(technologies.toJSON());
	response.assertHeader('x-sabia-total', total);
	response.assertHeader('x-sabia-totalpages', totalPages);
});

test('GET Check translations on Validators', async ({ client }) => {
	const response_EN = await client
		.post('/auth/login')
		.header('Accept-Language', 'en')
		.send({ password: 'password' })
		.end();

	response_EN.assertStatus(400);
	response_EN.assertJSONSubset({
		error: {
			error_code: 'VALIDATION_ERROR',
			message: [
				{
					message: 'The email is required.',
					field: 'email',
					validation: 'required',
				},
			],
		},
	});

	const response_PT = await client
		.post('/auth/login')
		.header('Accept-Language', 'pt')
		.send({ password: 'password' })
		.end();

	response_PT.assertStatus(400);
	response_PT.assertJSONSubset({
		error: {
			error_code: 'VALIDATION_ERROR',
			message: [
				{
					message: 'email é obrigatório e está faltando.',
					field: 'email',
					validation: 'required',
				},
			],
		},
	});
});

//

test('GET Check translations on General', async ({ client }) => {
	const response_EN = await client
		.get('/terms/999999')
		.header('Accept-Language', 'en')
		.end();

	response_EN.assertStatus(400);
	response_EN.assertJSONSubset({
		error: {
			error_code: 'RESOURCE_NOT_FOUND',
			message: 'The resource Term was not found',
		},
	});

	const response_PT = await client
		.get('/terms/999999')
		.header('Accept-Language', 'pt')
		.end();

	response_PT.assertStatus(400);
	response_PT.assertJSONSubset({
		error: {
			error_code: 'RESOURCE_NOT_FOUND',
			message: 'O recurso Term não foi encontrado',
		},
	});
});

test('GET using filterBy and filter to filter resources', async ({ client }) => {
	const { user: loggedUser } = await createUser({ append: { role: ADMIN_ROLE } });

	const filter = {
		filterBy: 'name',
		filter: 'Xavier',
	};
	const institution = await Factory.model('App/Models/Institution').create({
		name: "Xavier's School for Gifted Youngsters",
	});

	const response = await client
		.get(`/institutions`)
		.query(filter)
		.loginVia(loggedUser, 'jwt')
		.end();

	response.assertStatus(200);
	response.assertJSONSubset([
		{
			name: institution.name,
		},
	]);
});

module.exports.defaultParams = defaultParams;
