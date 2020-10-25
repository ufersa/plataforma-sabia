/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class RevisionSchema extends Schema {
	up() {
		this.create('revisions', (table) => {
			table.increments();
			table
				.integer('technology_id')
				.unsigned()
				.references('id')
				.inTable('technologies')
				.onDelete('cascade');
			table
				.integer('reviewer_id')
				.unsigned()
				.references('id')
				.inTable('reviewers');
			table.text('description');
			table.enu('assessment', ['approved', 'requested_changes', 'rejected']).notNullable();
			table
				.integer('attachment_id')
				.unsigned()
				.references('id')
				.inTable('uploads');
			table.timestamps();
		});
	}

	down() {
		this.drop('revisions');
	}
}

module.exports = RevisionSchema;
