const { test, trait } = use('Test/Suite')('Params');
const Term = use('App/Models/Term');
const Technology = use('App/Models/Technology');
const Taxonomy = use('App/Models/Taxonomy');
const Role = use('App/Models/Role');
const Permission = use('App/Models/Permission');
const User = use('App/Models/User');

trait('Auth/Client');

const defaultParams = {
	order: 'asc',
	page: 1,
	orderBy: 'id',
	perPage: 10,
	id: false,
	embed: false,
};

const adminUser = {
	email: 'paramsadminuser@gmail.com',
	password: '123123',
	first_name: 'FirstName',
	last_name: 'LastName',
	status: 'verified',
	role: 'ADMIN',
};

const getTermsDB = async (params = defaultParams) => {
	const terms = await Term.query()
		.withParams(params)
		.fetch();
	const total = await Term.getCount();
	const totalPages = Math.ceil(total / params.perPage);

	const data = {
		terms,
		total,
		totalPages,
	};
	return data;
};

trait('Test/ApiClient');

test('GET list of terms with default parameters', async ({ client }) => {
	const { terms, total, totalPages } = await getTermsDB();
	const response = await client
		.get('terms')
		.query(defaultParams)
		.end();
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
		.withParams(defaultParams)
		.fetch();

	const total = await Technology.getCount();
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

test('GET list of Taxonomies without parameters', async ({ client }) => {
	const taxonomies = await Taxonomy.query()
		.withParams(defaultParams)
		.fetch();

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
	const rolesCollection = await Role.query()
		.withParams(defaultParams)
		.fetch();

	const total = await Role.getCount();
	const totalPages = Math.ceil(total / defaultParams.perPage);

	const loggeduser = await User.create(adminUser);

	const response = await client
		.get('roles')
		.loginVia(loggeduser, 'jwt')
		.query({})
		.end();
	response.assertStatus(200);
	response.assertJSONSubset(rolesCollection.toJSON());
	response.assertHeader('x-sabia-total', total);
	response.assertHeader('x-sabia-totalpages', totalPages);
});

test('GET list of Permissions without parameters', async ({ client }) => {
	const permissions = await Permission.query()
		.withParams(defaultParams)
		.fetch();

	const total = await Permission.getCount();
	const totalPages = Math.ceil(total / defaultParams.perPage);

	const loggeduser = await User.last();

	const response = await client
		.get('permissions')
		.loginVia(loggeduser, 'jwt')
		.query({})
		.end();
	response.assertStatus(200);
	response.assertJSONSubset(permissions.toJSON());
	response.assertHeader('x-sabia-total', total);
	response.assertHeader('x-sabia-totalpages', totalPages);
});

test('GET list of roles embedded with associated tables', async ({ client }) => {
	const roles = await Role.query()
		.withParams({
			...defaultParams,
			embed: { all: true, ids: false },
		})
		.fetch();

	const total = await Role.getCount();
	const totalPages = Math.ceil(total / defaultParams.perPage);

	const loggeduser = await User.last();

	const response = await client
		.get('roles?embed')
		.loginVia(loggeduser, 'jwt')
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
	const roles = await Role.query()
		.withParams(customParams)
		.fetch();

	const total = await Role.getCount();
	const totalPages = Math.ceil(total / customParams.perPage);

	const loggeduser = await User.last();

	const response = await client
		.get('/roles?embed&perPage=2&page=2&order=desc&orderBy=role')
		.loginVia(loggeduser, 'jwt')
		.end();
	response.assertStatus(200);
	response.assertJSONSubset(roles.toJSON());
	response.assertHeader('x-sabia-total', total);
	response.assertHeader('x-sabia-totalpages', totalPages);
});

test('GET list of roles embedded with the ids of the associated tables', async ({ client }) => {
	const roles = await Role.query()
		.withParams({
			...defaultParams,
			embed: { all: false, ids: true },
		})
		.fetch();

	const total = await Role.getCount();
	const totalPages = Math.ceil(total / defaultParams.perPage);

	const loggeduser = await User.last();

	const response = await client
		.get('roles?embed=ids')
		.loginVia(loggeduser, 'jwt')
		.end();
	response.assertStatus(200);
	response.assertJSONSubset(roles.toJSON());
	response.assertHeader('x-sabia-total', total);
	response.assertHeader('x-sabia-totalpages', totalPages);
});

test('GET role embedded with associated tables (with custom parameters)', async ({ client }) => {
	const roles = await Role.query()
		.withParams({
			...defaultParams,
			id: 1,
			embed: { all: true, ids: false },
		})
		.first();

	const total = await Role.getCount();
	const totalPages = Math.ceil(total / defaultParams.perPage);

	const loggeduser = await User.last();

	const response = await client
		.get('/roles/1?embed')
		.loginVia(loggeduser, 'jwt')
		.end();
	response.assertStatus(200);
	response.assertJSONSubset(roles.toJSON());
	response.assertHeader('x-sabia-total', total);
	response.assertHeader('x-sabia-totalpages', totalPages);
});

test('GET role embedded with the ids of the associated tables', async ({ client }) => {
	const roles = await Role.query()
		.withParams({
			...defaultParams,
			id: 1,
			embed: { all: false, ids: true },
		})
		.fetch();

	const total = await Role.getCount();
	const totalPages = Math.ceil(total / defaultParams.perPage);

	const loggeduser = await User.last();

	const response = await client
		.get('roles?embed=ids')
		.loginVia(loggeduser, 'jwt')
		.end();
	response.assertStatus(200);
	response.assertJSONSubset(roles.toJSON());
	response.assertHeader('x-sabia-total', total);
	response.assertHeader('x-sabia-totalpages', totalPages);
});

test('GET list of users embedded with associated tables', async ({ client }) => {
	const users = await User.query()
		.withParams({
			...defaultParams,
			embed: { all: true, ids: false },
		})
		.fetch();

	const total = await User.getCount();
	const totalPages = Math.ceil(total / defaultParams.perPage);

	const loggeduser = await User.last();

	const response = await client
		.get('users?embed')
		.loginVia(loggeduser, 'jwt')
		.end();
	response.assertStatus(200);
	response.assertJSONSubset(users.toJSON());
	response.assertHeader('x-sabia-total', total);
	response.assertHeader('x-sabia-totalpages', totalPages);
});

test('GET list of taxonomies embedded with associated tables', async ({ client }) => {
	const taxonomies = await Taxonomy.query()
		.withParams({
			...defaultParams,
			embed: { all: true, ids: false },
		})
		.fetch();

	const total = await Taxonomy.getCount();
	const totalPages = Math.ceil(total / defaultParams.perPage);

	const response = await client.get('taxonomies?embed').end();
	response.assertStatus(200);
	response.assertJSONSubset(taxonomies.toJSON());
	response.assertHeader('x-sabia-total', total);
	response.assertHeader('x-sabia-totalpages', totalPages);
});

test('GET list of terms embedded with associated tables', async ({ client }) => {
	const terms = await Term.query()
		.withParams({
			...defaultParams,
			embed: { all: true, ids: false },
		})
		.fetch();

	const total = await Term.getCount();
	const totalPages = Math.ceil(total / defaultParams.perPage);

	const response = await client.get('terms?embed').end();
	response.assertStatus(200);
	response.assertJSONSubset(terms.toJSON());
	response.assertHeader('x-sabia-total', total);
	response.assertHeader('x-sabia-totalpages', totalPages);
});

test('GET list of permissions embedded with associated tables', async ({ client }) => {
	const permissions = await Permission.query()
		.withParams({
			...defaultParams,
			embed: { all: true, ids: false },
		})
		.fetch();

	const total = await Permission.getCount();
	const totalPages = Math.ceil(total / defaultParams.perPage);

	const loggeduser = await User.last();

	const response = await client
		.get('permissions?embed')
		.loginVia(loggeduser, 'jwt')
		.end();
	response.assertStatus(200);
	response.assertJSONSubset(permissions.toJSON());
	response.assertHeader('x-sabia-total', total);
	response.assertHeader('x-sabia-totalpages', totalPages);
});

test('GET list of technologies embedded with associated tables', async ({ client }) => {
	const technologies = await Technology.query()
		.withParams({
			...defaultParams,
			embed: { all: true, ids: false },
		})
		.fetch();

	const total = await Technology.getCount();
	const totalPages = Math.ceil(total / defaultParams.perPage);

	const response = await client.get('technologies?embed').end();
	response.assertStatus(200);
	response.assertJSONSubset(technologies.toJSON());
	response.assertHeader('x-sabia-total', total);
	response.assertHeader('x-sabia-totalpages', totalPages);
});
