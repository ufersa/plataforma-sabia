/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class DeviceTokenSchema extends Schema {
	up() {
		this.create('device_tokens', (table) => {
			table.increments();
			table
				.integer('user_id')
				.unsigned()
				.references('id')
				.inTable('users');
			table.text('device_uuid').notNullable();
			table.text('device_token').notNullable();
			table.timestamps();
		});
	}

	down() {
		this.drop('device_tokens');
	}
}

module.exports = DeviceTokenSchema;
