const Database = use('Database');

module.exports.getTransaction = () => {
	// eslint-disable-next-line no-underscore-dangle
	const globalTrx = Database.connection('mysql')._globalTrx;
	let trx;
	return {
		init: async () => {
			trx = globalTrx || (await Database.beginTransaction());
			return trx;
		},
		commit: async () => {
			if (!globalTrx) {
				await trx.commit();
			}
		},
	};
};
