const Announcement = use('App/Models/Announcement');
const Term = use('App/Models/Term');
const Institution = use('App/Models/Institution');

const { getTransaction, errorPayload, errors } = require('../../Utils');

// get only useful fields
const getFields = (request) =>
	request.only([
		'institution_id',
		'announcement_number',
		'title',
		'description',
		'targetAudiences',
		'keywords',
		'financial_resources',
		'start_date',
		'end_date',
		'comment',
		'url',
	]);

class AnnouncementController {
	async syncronizeTerms(trx, terms, announcement, detach = false) {
		const termInstances = await Promise.all(terms.map((term) => Term.getTerm(term)));
		if (detach) {
			const taxonomyIds = termInstances.map((term) => term.taxonomy_id);
			const announcementTerms = await Term.query()
				.whereHas('announcements', (builder) => {
					builder.where('id', announcement.id);
				})
				.whereIn('taxonomy_id', taxonomyIds)
				.fetch();

			const announcementTermsIds = announcementTerms
				? announcementTerms.rows.map((announcementTerm) => announcementTerm.id)
				: null;

			await announcement.terms().detach(announcementTermsIds, null, trx);
		}

		await announcement.terms().attach(
			termInstances.map((term) => term.id),
			null,
			trx,
		);
	}

	async store({ auth, request }) {
		const { institution_id, targetAudiences, keywords, ...data } = getFields(request);
		const announcementOwner = await auth.getUser();
		const institution = await Institution.findOrFail(institution_id);
		let announcement;
		let trx;
		try {
			const { init, commit } = getTransaction();
			trx = await init();

			announcement = await Announcement.create(data, trx);
			await announcement.user().associate(announcementOwner, trx);
			await announcement.institution().associate(institution, trx);
			if (targetAudiences) {
				await this.syncronizeTerms(trx, targetAudiences, announcement);
			}
			if (keywords) {
				await this.syncronizeTerms(trx, keywords, announcement);
			}
			await announcement.loadMany(['institution', 'terms']);
			await commit();
		} catch (error) {
			await trx.rollback();
			throw error;
		}

		return announcement;
	}

	async update({ request, params }) {
		const { institution_id, targetAudiences, keywords, ...data } = getFields(request);
		const announcement = await Announcement.findOrFail(params.id);
		announcement.merge(data);

		let trx;
		try {
			const { init, commit } = getTransaction();
			trx = await init();

			if (institution_id) {
				await announcement.institution().dissociate(trx);
				const institution = await Institution.findOrFail(institution_id);
				await announcement.institution().associate(institution, trx);
			}
			if (targetAudiences) {
				await this.syncronizeTerms(trx, targetAudiences, announcement, true);
			}
			if (keywords) {
				await this.syncronizeTerms(trx, keywords, announcement, true);
			}
			await announcement.loadMany(['institution', 'terms']);
			await commit();
		} catch (error) {
			await trx.rollback();
			throw error;
		}

		return announcement;
	}

	async destroy({ params, request, response }) {
		const announcement = await Announcement.findOrFail(params.id);
		// detaches related entities
		await announcement.terms().detach();
		const result = await announcement.delete();
		if (!result) {
			return response
				.status(400)
				.send(
					errorPayload(
						errors.RESOURCE_DELETED_ERROR,
						request.antl('error.resource.resourceDeletedError'),
					),
				);
		}

		return response.status(200).send({ success: true });
	}
}

module.exports = AnnouncementController;
