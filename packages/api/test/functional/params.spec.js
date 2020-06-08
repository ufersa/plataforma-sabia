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
};

const getTermsDB = async (params = defaultParams) => {
	const terms = await Term.query()
		.with('taxonomy')
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
	const roles = await Role.query()
		.withParams(defaultParams)
		.fetch();

	const total = await Role.getCount();
	const totalPages = Math.ceil(total / defaultParams.perPage);

	const user = await User.first();
	const AdminRole = await Role.getRole('ADMIN');
	await user.role().associate(AdminRole);

	const response = await client
		.get('roles')
		.loginVia(user, 'jwt')
		.query({})
		.end();
	response.assertStatus(200);
	response.assertJSONSubset(roles.toJSON());
	response.assertHeader('x-sabia-total', total);
	response.assertHeader('x-sabia-totalpages', totalPages);
});

test('GET list of Permissions without parameters', async ({ client }) => {
	const permissions = await Permission.query()
		.withParams(defaultParams)
		.fetch();

	const total = await Permission.getCount();
	const totalPages = Math.ceil(total / defaultParams.perPage);

	const user = await User.first();
	const AdminRole = await Role.getRole('ADMIN');
	await user.role().associate(AdminRole);

	const response = await client
		.get('permissions')
		.loginVia(user, 'jwt')
		.query({})
		.end();
	response.assertStatus(200);
	response.assertJSONSubset(permissions.toJSON());
	response.assertHeader('x-sabia-total', total);
	response.assertHeader('x-sabia-totalpages', totalPages);
});
