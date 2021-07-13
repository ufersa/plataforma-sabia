/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');
const Database = use('Database');

class UserCityStateSchema extends Schema {
	up() {
		this.alter('users', (table) => {
			// alter table
			table
				.integer('city_id')
				.after('city')
				.unsigned()
				.references('id')
				.inTable('cities')
				.onUpdate('CASCADE')
				.onDelete('SET NULL');
			table
				.integer('state_id')
				.after('state')
				.unsigned()
				.references('id')
				.inTable('states')
				.onUpdate('CASCADE')
				.onDelete('SET NULL');
		});
		this.schedule(async (trx) => {
			const usersWithCity = await Database.table('users')
				.whereNotNull('city')
				.transacting(trx);

			for await (const user of usersWithCity) {
				// Tryng update user city
				const userCity = await Database.table('cities')
					.whereRaw(`UPPER(name) = UPPER('${user.city}')`)
					.first();

				if (userCity) {
					await Database.table('users')
						.where('id', user.id)
						.update({ city_id: userCity.id });
				}

				// Tryng update user state
				const userState = await Database.table('states')
					.whereRaw(
						`UPPER(name) = UPPER('${user.state}') OR UPPER(initials) = UPPER('${user.state}')`,
					)
					.first();

				if (userState) {
					await Database.table('users')
						.where('id', user.id)
						.update({ state_id: userState.id });
				}
			}
		});
	}

	down() {
		this.alter('users', (table) => {
			// reverse alternations
			table.dropForeign(['city_id']).dropColumn('city_id');
			table.dropForeign(['state_id']).dropColumn('state_id');
		});
	}
}

module.exports = UserCityStateSchema;
