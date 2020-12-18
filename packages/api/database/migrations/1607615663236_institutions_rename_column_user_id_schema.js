/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class InstitutionsRenameColumnUserIdSchema extends Schema {
	up() {
		this.alter('institutions', (table) => {
			// alter table
			table.renameColumn('user_id', 'responsible');
		});
	}

	down() {
		this.alter('institutions', (table) => {
			// reverse alternations
			table.renameColumn('responsible', 'user_id');
		});
	}
}

module.exports = InstitutionsRenameColumnUserIdSchema;
