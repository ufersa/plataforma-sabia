const { errors, roles } = require('../Utils');

const Disclaimer = use('App/Models/Disclaimer');

class DisclaimerMiddleware {
	async handle({ auth, request, response }, next, properties) {
		const disclaimersMandatoty = await Disclaimer.disclaimersMandatotyType(properties);
		const disclaimersMandatotyIds = disclaimersMandatoty.toJSON().map((row) => {
			return row.id;
		});

		const containsAll = (container, elements) => {
			if (Array.isArray(container) && Array.isArray(elements)) {
				const temp = container.filter((i) => elements.includes(i));
				return JSON.stringify(temp) === JSON.stringify(elements);
			}
			return false;
		};

		const { disclaimers } = request.all();

		let user;
		try {
			user = await auth.getUser();
		} catch (error) {
			user = false;
			if (containsAll(disclaimers, disclaimersMandatotyIds) === false) {
				const error_data = {
					error: {
						error_code: errors.TERMSOFUSE,
						message: request.antl('error.termsOfUse'),
						payload: disclaimersMandatoty,
					},
				};
				return response.status(401).send(error_data);
			}
		}

		if (user) {
			const userRole = await user.getRole();
			if (userRole === roles.ADMIN) {
				return next();
			}

			if (disclaimers) {
				await user.accept(disclaimers);
			}

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

			const disclaimersAcceptedIds = userDisclaimers.filter((id) =>
				disclaimersMandatotyIds.includes(id),
			);

			if (
				JSON.stringify(disclaimersAcceptedIds) !== JSON.stringify(disclaimersMandatotyIds)
			) {
				const disclaimerRequired = disclaimersMandatotyIds.filter(
					(id) => !disclaimersAcceptedIds.includes(id),
				);
				const error_data = {
					error: {
						error_code: errors.TERMSOFUSE,
						message: request.antl('error.termsOfUse'),
						payload: await Disclaimer.query()
							.whereIn('id', disclaimerRequired)
							.fetch(),
					},
				};
				return response.status(401).send(error_data);
			}
		}

		return next();
	}
}

module.exports = DisclaimerMiddleware;
