/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class OnDeleteInTokenSchema extends Schema {
	up() {
		this.table('tokens', (table) => {
			// alter table
			table.dropForeign('user_id');

			table
				.foreign('user_id')
				.references('users.id')
				.onUpdate('CASCADE')
				.onDelete('CASCADE');
		});
	}

	down() {
		this.table('tokens', (table) => {
			// reverse alternations
			table.dropForeign('user_id');

			table
				.foreign('user_id')
				.references('users.id')
		});
	}
}

module.exports = OnDeleteInTokenSchema;
