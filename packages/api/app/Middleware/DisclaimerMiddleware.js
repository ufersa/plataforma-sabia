const Disclaimer = use('App/Models/Disclaimer');

class DisclaimerMiddleware {
	async handle({ auth }, next, properties) {
		let user;
		try {
			user = await auth.getUser();
		} catch (error) {
			user = false;
		}

		if (user) {
			const disclaimersMandatoty = await Disclaimer.query()
				.where('required', true)
				.where('type', properties)
				.fetch()
				.then((result) =>
					result.toJSON().map((row) => {
						return row.id;
					}),
				);

			const userDisclaimers = await user
				.disclaimers((builde) => {
					return builde.select('id');
				})
				.fetch()
				.then((result) =>
					result.toJSON().map((row) => {
						return row.id;
					}),
				);

			console.log(userDisclaimers, '\n', disclaimersMandatoty);
		}

		await next();
	}
}

module.exports = DisclaimerMiddleware;
