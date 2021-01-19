const { servicesTypes, serviceMeasureUnits } = require('../../app/Utils');

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ServiceSchema extends Schema {
	up() {
		this.create('services', (table) => {
			table.increments();
			table.string('name').notNullable();
			table.text('description').notNullable();
			table.enu('type', Object.values(servicesTypes)).notNullable();
			table.integer('price');
			table.enu('measure_unit', Object.values(serviceMeasureUnits)).notNullable();
			table
				.integer('user_id')
				.unsigned()
				.references('id')
				.inTable('users')
				.onUpdate('CASCADE')
				.onDelete('SET NULL');
			table.timestamps();
		});
	}

	down() {
		this.drop('services');
	}
}

module.exports = ServiceSchema;
