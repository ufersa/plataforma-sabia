/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class PermissionSchema extends Schema {
	up() {
		this.create('permissions', (table) => {
			table.increments();
			table
				.string('permission')
				.notNullable()
				.unique();
			table.text('description').notNullable();
			table.timestamps();
		});
	}

	down() {
		this.drop('permissions');
	}
}

module.exports = PermissionSchema;
