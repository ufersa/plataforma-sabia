/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class UploadSchema extends Schema {
	up() {
		this.create('uploads', (table) => {
			table.increments();
			table.string('filename').notNullable();
			table
				.integer('user_id')
				.unsigned()
				.references('id')
				.inTable('users');
			table.string('object');
			table.integer('object_id');
			table.timestamps();
		});
	}

	down() {
		this.drop('uploads');
	}
}

module.exports = UploadSchema;
