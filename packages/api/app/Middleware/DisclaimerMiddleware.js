const { errors } = require('../Utils');

const Disclaimer = use('App/Models/Disclaimer');
class DisclaimerMiddleware {
	async handle({ auth, request, response }, next, properties) {
		let user;
		try {
			user = await auth.getUser();
		} catch (error) {
			user = false;
		}

		if (user) {
			const { disclaimers } = request.all();

			if (disclaimers) {
				await user.accept(disclaimers);
			}

			const disclaimersMandatoty = await Disclaimer.query()
				.where('required', true)
				.where('type', properties)
				.fetch();

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

			const disclaimersMandatotyIds = disclaimersMandatoty.toJSON().map((row) => {
				return row.id;
			});
			const disclaimersAcceptedIds = userDisclaimers.filter((id) =>
				disclaimersMandatotyIds.includes(id),
			);

			if (
				JSON.stringify(disclaimersAcceptedIds) !== JSON.stringify(disclaimersMandatotyIds)
			) {
				const disclaimerRequired = disclaimersMandatotyIds.filter(
					(id) => !disclaimersAcceptedIds.includes(id),
				);
				const error = {
					error: {
						error_code: errors.TERMSOFUSE,
						message: request.antl('error.termsOfUse'),
						payload: await Disclaimer.query()
							.whereIn('id', disclaimerRequired)
							.fetch(),
					},
				};
				return response.status(401).send(error);
			}
		}

		return next();
	}
}

module.exports = DisclaimerMiddleware;
