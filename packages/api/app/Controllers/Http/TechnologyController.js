/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

const { antl, errors, errorPayload } = require('../../Utils');

const Technology = use('App/Models/Technology');

class TechnologyController {
	async index() {
		const technologies = Technology.all();

		return technologies;
	}

	async show({ params }) {
		return Technology.findOrFail(params.id);
	}

	async destroy({ params, response }) {
		const technology = await Technology.find(params.id);

		if (!technology) {
			return response
				.status(400)
				.send(
					errorPayload(
						errors.RESOURCE_NOT_FOUND,
						antl('error.resource.resourceNotFound'),
					),
				);
		}

		await technology.delete();
		return response.status(200).send({ success: true });
	}

	async store({ request }) {
		const data = request.all([
			'title',
			'initials',
			'description',
			'logo',
			'site_url',
			'private',
		]);

		try {
			return Technology.create({ ...data });
		} catch (error) {
			return error;
		}
	}

	async update({ params, request }) {
		const technology = await Technology.find(params.id);

		const data = request.all();

		technology.merge(data);
		technology.save();

		return technology;
	}
}

module.exports = TechnologyController;
