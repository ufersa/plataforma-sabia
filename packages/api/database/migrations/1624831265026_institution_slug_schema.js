/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');
const Database = use('Database');
const { createUniqueSlug } = require('../../app/Utils/slugify');

const Institution = use('App/Models/Institution');
class InstitutionSlugSchema extends Schema {
	up() {
		this.alter('institutions', (table) => {
			// alter table
			table
				.string('slug')
				.after('initials')
				.unique();
		});

		this.schedule(async (trx) => {
			const institutions = await Database.table('institutions').transacting(trx);

			for (const institution of institutions) {
				let institutionSlug;
				if (institution.slug === null) {
					// eslint-disable-next-line no-await-in-loop
					institutionSlug = await createUniqueSlug(
						Institution,
						institution.initials,
						'slug',
						'',
					);
				}
				// eslint-disable-next-line no-await-in-loop
				await Database.table('institutions')
					.where('id', institution.id)
					.update({ slug: institutionSlug });
			}
		});
	}

	down() {
		this.alter('institutions', (table) => {
			// alter table
			table.dropColumn('slug');
		});
	}
}

module.exports = InstitutionSlugSchema;
