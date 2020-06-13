/*
|--------------------------------------------------------------------------
| PermissionSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Permission = use('App/Models/Permission');
class PermissionSeeder {
	async run() {
		/** CREATE DEFAULT Permission */
		const defaultPermission = {
			permission: 'DEFAULT PERMISSION',
			description: 'default Permission',
		};

		await Permission.create(defaultPermission);
	}
}

module.exports = PermissionSeeder;
