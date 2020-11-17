const Database = use('Database');

async function exists(data, field, message, args, get = () => data[field]) {
	const value = get(data, field);
	if (!value) {
		return;
	}

	const [table, column] = args;
	const row = await Database.table(table)
		.where(column, value)
		.first();

	if (!row) {
		throw message;
	}
}

module.exports = exists;
