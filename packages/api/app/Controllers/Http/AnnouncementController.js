const Announcement = use('App/Models/Announcement');
const Term = use('App/Models/Term');
const Institution = use('App/Models/Institution');
const User = use('App/Models/User');

const Bull = use('Rocketseat/Bull');
const SendMailJob = use('App/Jobs/SendMail');

const {
	getTransaction,
	errorPayload,
	errors,
	announcementStatuses,
	roles,
	Algolia,
} = require('../../Utils');

class AnnouncementController {
	constructor() {
		this.algolia = Algolia.initIndex('announcement');
		this.fields = [
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
		];
	}

	async index({ auth, request }) {
		const filters = request.all();
		const announcements = Announcement.query();
		try {
			await auth.check();
			const user = await auth.getUser();
			const userRole = await user.getRole();
			announcements.published(user, userRole);
		} catch (error) {
			announcements.published();
		}
		return announcements
			.with('targetAudiences')
			.with('keywords')
			.withFilters(filters)
			.withParams(request);
	}

	async show({ auth, request }) {
		const announcement = Announcement.query();
		try {
			await auth.check();
			const user = await auth.getUser();
			const userRole = await user.getRole();
			if (userRole !== roles.ADMIN) {
				announcement.where({ user_id: user.id });
			}
		} catch (error) {
			announcement.published();
		}
		return announcement
			.with('targetAudiences')
			.with('keywords')
			.withParams(request);
	}

	async syncronizeTerms(trx, terms, announcement, detach = false) {
		const termInstances = await Promise.all(terms.map((term) => Term.getTerm(term)));
		const termInstancesIds = termInstances.map((term) => term.id);
		if (detach) {
			const taxonomyIds = termInstances.map((term) => term.taxonomy_id);
			await announcement
				.terms()
				.whereIn('taxonomy_id', taxonomyIds)
				.select('id')
				.detach(null, trx);
		}

		await announcement.terms().attach(termInstancesIds, null, trx);
	}

	async store({ auth, request }) {
		const { institution_id, targetAudiences = [], keywords = [], ...data } = request.only(
			this.fields,
		);
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
			const terms = [...targetAudiences, ...keywords];
			await this.syncronizeTerms(trx, terms, announcement);
			await announcement.loadMany(['institution', 'keywords', 'targetAudiences']);
			await commit();
		} catch (error) {
			await trx.rollback();
			throw error;
		}

		return announcement;
	}

	async update({ request, params }) {
		const { institution_id, targetAudiences = [], keywords = [], ...data } = request.only(
			this.fields,
		);
		const announcement = await Announcement.findOrFail(params.id);
		announcement.merge(data);
		announcement.status = announcementStatuses.PENDING;

		let trx;
		try {
			const { init, commit } = getTransaction();
			trx = await init();

			await announcement.save(trx);

			if (announcement.institution_id !== institution_id) {
				await announcement.institution().dissociate(trx);
				const institution = await Institution.findOrFail(institution_id);
				await announcement.institution().associate(institution, trx);
			}

			const terms = [...targetAudiences, ...keywords];
			await this.syncronizeTerms(trx, terms, announcement, true);
			await announcement.loadMany(['institution', 'keywords', 'targetAudiences']);
			await commit();
		} catch (error) {
			await trx.rollback();
			throw error;
		}

		return announcement;
	}

	async updateStatus({ request, params }) {
		const announcement = await Announcement.findOrFail(params.id);
		const { status } = request.all();
		announcement.merge({ status });
		await announcement.save();
		await announcement.loadMany(['institution', 'keywords', 'targetAudiences']);

		if (status === announcementStatuses.PUBLISHED) {
			const announcementOwner = await User.findOrFail(announcement.user_id);
			const mailData = {
				email: announcementOwner.email,
				subject: request.antl('message.announcement.announcementPublished'),
				template: 'emails.announcement-published',
				announcementOwner,
				announcement,
			};
			Bull.add(SendMailJob.key, mailData, { attempts: 3 });
			await Algolia.saveIndex('announcement', announcement);
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

		await this.algolia.deleteObject(announcement.toJSON().objectID);
		return response.status(200).send({ success: true });
	}
}

module.exports = AnnouncementController;
