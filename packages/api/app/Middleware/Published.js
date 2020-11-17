/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Technology = use('App/Models/Technology');
const { technologyStatuses } = require('../Utils');

const UnauthorizedException = use('App/Exceptions/UnauthorizedException');

class Published {
	async handle({ request, auth }, next) {
		const technology = await Technology.getTechnology(request.params.id);
		if (technology.status === technologyStatuses.PUBLISHED) {
			return next();
		}

		const user = await auth.getUser();
		const canAccessUnpublishedTechnology = await Technology.canAccessUnPublishedTechnology(
			technology,
			user,
		);
		if (!canAccessUnpublishedTechnology) throw new UnauthorizedException();
		return next();
	}
}

module.exports = Published;
