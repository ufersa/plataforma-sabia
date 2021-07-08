/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');
const Database = use('Database');
const Env = use('Env');
const Config = use('Adonis/Src/Config');
const app_url = Env.get('APP_URL');
const { uploadsPath } = Config.get('upload');

class AddFieldUrlToUploadsSchema extends Schema {
	async up() {
		await this.hasColumn('uploads', 'url').then((exists) => {
			if (!exists) {
				this.table('uploads', (table) => {
					table.string('url', 255);
				});
			}
		});

		this.schedule(async (trx) => {
			await Database.table('uploads')
				.transacting(trx)
				.update(
					'url',
					Database.raw(
						`IF(uploads.object is not null,
							CONCAT('${app_url}/${uploadsPath}/', uploads.object, '/', uploads.filename),
							CONCAT('${app_url}/${uploadsPath}/', uploads.filename) )`,
					),
				);
		});
	}

	down() {
		this.table('uploads', (table) => {
			table.dropColumn('url');
		});
	}
}

module.exports = AddFieldUrlToUploadsSchema;
