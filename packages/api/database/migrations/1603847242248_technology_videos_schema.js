/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TechnologyVideosSchema extends Schema {
	up () {
		this.table('technologies', (table) => {
			table.json('videos');
		});
	}
}

module.exports = TechnologyVideosSchema;
