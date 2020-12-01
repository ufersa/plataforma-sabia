const { test } = use('Test/Suite')('CPF');
const Role = use('App/Models/Role');

test('get paper by id or paper', async ({ assert }) => {
	const role = await Role.first();
	const getRoleById = await Role.getRole(role.id);
	const getRoleByName = await Role.getRole(role.role);
	assert.equal(getRoleById.id, getRoleByName.id);
});
