const Announcement = use('App/Models/Announcement');
const Term = use('App/Models/Term');
const Institution = use('App/Models/Institution');
const User = use('App/Models/User');

const Bull = use('Rocketseat/Bull');
const SendMailJob = use('App/Jobs/SendMail');

const { getTransaction, errorPayload, errors, announcementStatuses } = require('../../Utils');

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
			.with('terms')
			.withFilters(filters)
			.withParams(request);
	}

	async show({ auth, request }) {
		const announcements = Announcement.query();
		try {
			await auth.check();
			const user = await auth.getUser();
			const userRole = await user.getRole();
			announcements.published(user, userRole);
		} catch (error) {
			announcements.published();
		}
		return announcements.with('terms').withParams(request);
	}

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

	async updateStatus({ request, params }) {
		const announcement = await Announcement.findOrFail(params.id);
		const { status } = request.all();
		announcement.merge({ status });
		await announcement.save();
		await announcement.loadMany(['institution', 'terms']);
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
