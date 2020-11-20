/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class UserDisclaimerSchema extends Schema {
	up() {
		this.create('user_disclaimers', (table) => {
			table.increments();
			table.timestamps();

			table
				.integer('disclaimer_id')
				.unsigned()
				.index('disclaimer_id');
			table
				.integer('user_id')
				.unsigned()
				.index('user_id');
			table
				.foreign('disclaimer_id')
				.references('disclaimers.id')
				.onDelete('cascade');
			table
				.foreign('user_id')
				.references('users.id')
				.onDelete('cascade');
		});
	}

	down() {
		this.drop('user_disclaimers');
	}
}

module.exports = UserDisclaimerSchema;
