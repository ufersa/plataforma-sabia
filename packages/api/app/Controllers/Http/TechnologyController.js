/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

const Config = use('Adonis/Src/Config');
const Technology = use('App/Models/Technology');
const Term = use('App/Models/Term');
const TechnologyReview = use('App/Models/TechnologyReview');
const Taxonomy = use('App/Models/Taxonomy');
const User = use('App/Models/User');
const Upload = use('App/Models/Upload');
const TechnologyComment = use('App/Models/TechnologyComment');
const TechnologyQuestion = use('App/Models/TechnologyQuestion');
const Reviewer = use('App/Models/Reviewer');
const KnowledgeArea = use('App/Models/KnowledgeArea');
const ReviewerTechnologyHistory = use('App/Models/ReviewerTechnologyHistory');

const Bull = use('Rocketseat/Bull');
const TechnologyDistributionJob = use('App/Jobs/TechnologyDistribution');
const SendMailJob = use('App/Jobs/SendMail');

const {
	errors,
	errorPayload,
	getTransaction,
	roles,
	technologyStatuses,
	questionStatuses,
	Algolia,
	reviewerTechnologyHistoryStatuses,
} = require('../../Utils');

class TechnologyController {
	constructor() {
		this.fields = [
			'title',
			'description',
			'private',
			'thumbnail_id',
			'patent',
			'patent_number',
			'primary_purpose',
			'secondary_purpose',
			'application_mode',
			'application_examples',
			'installation_time',
			'solves_problem',
			'entailes_problem',
			'requirements',
			'risks',
			'contribution',
			'intellectual_property',
			'videos',
			'type',
			'public_domain',
			'knowledge_area_id',
		];
	}

	/**
	 * Show a list of all technologies.
	 * GET technologies?term=
	 */
	async index({ request, auth }) {
		const technologies = Technology.query();
		try {
			await auth.check();
			const user = await auth.getUser();
			const userRole = await user.getRole();
			technologies.available(user, userRole);
		} catch (error) {
			technologies.available();
		}
		return technologies
			.with('terms')
			.with('users.institution')
			.withFilters(request)
			.withParams(request);
	}

	/**
	 * Get a single technology.
	 * GET technologies/:id
	 */
	async show({ request }) {
		return Technology.query()
			.getTechnology(request.params.id)
			.withFilters(request)
			.withParams(request);
	}

	/**
	 * Get technology terms.
	 * GET /technologies/:id/terms?taxonomy=
	 */
	async showTechnologyTerms({ request, params }) {
		const { id } = params;
		const query = request.get();
		const technology = await Technology.findOrFail(id);
		if (query.taxonomy) {
			const taxonomy = await Taxonomy.getTaxonomy(query.taxonomy);
			return Term.query()
				.whereHas('technologies', (builder) => {
					builder.where('id', technology.id);
				})
				.where('taxonomy_id', taxonomy.id)
				.withParams(request, {
					filterById: false,
					skipRelationships: ['technologies'],
					skipPagination: true,
				});
		}

		return Term.query()
			.whereHas('technologies', (builder) => {
				builder.where('id', technology.id);
			})
			.withParams(request, {
				filterById: false,
				skipRelationships: ['technologies'],
				skipPagination: true,
			});
	}

	/**
	 * Get technology users.
	 * GET /technologies/:id/users?role=
	 */
	async showTechnologyUsers({ request, params }) {
		const { id } = params;
		const query = request.get();
		const technology = await Technology.findOrFail(id);
		if (query.role) {
			return User.query()
				.whereHas('technologies', (builder) => {
					builder.where('id', technology.id).where('role', query.role);
				})
				.withParams(request, { filterById: false });
		}
		return User.query()
			.whereHas('technologies', (builder) => {
				builder.where('id', technology.id);
			})
			.withParams(request, { filterById: false });
	}

	/**
	 * Get technology reviews.
	 * GET /technologies/:id/review
	 */
	async showTechnologyReviews({ params, request }) {
		const { id } = params;

		const technology = await Technology.findOrFail(id);

		return TechnologyReview.query()
			.with('user')
			.whereHas('technology', (builder) => {
				builder.where('id', technology.id);
			})
			.withParams(request, { filterById: false });
	}

	/**
	 * Delete a technology with id.
	 * DELETE technologies/:id
	 */
	async destroy({ params, request, response }) {
		const technology = await Technology.findOrFail(params.id);
		// detaches related entities
		await Promise.all([technology.users().detach(), technology.terms().detach()]);
		const result = await technology.delete();
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

	/**
	 * Delete a technology term.
	 * DELETE technologies/:id/terms/:term
	 */
	async deleteTechnologyTerm({ params, response }) {
		const { id, term } = params;
		const [technology, termObj] = await Promise.all([
			Technology.findOrFail(id),
			Term.getTerm(term),
		]);
		await technology.terms().detach([termObj.id]);
		return response.status(200).send({ success: true });
	}

	/**
	 * Delete a technology user.
	 * DELETE technologies/:id/users/:idUser
	 */
	async deleteTechnologyUser({ params, response }) {
		const { id, idUser } = params;
		const [technology, user] = await Promise.all([
			Technology.findOrFail(id),
			User.findOrFail(idUser),
		]);
		await technology.users().detach([user.id]);
		return response.status(200).send({ success: true });
	}

	async syncronizeUsers(trx, users, technology, detach = false, provisionUser = false) {
		const usersToFind = [];
		let resultUsers = [];
		users.forEach((user) => {
			if (user.id) {
				resultUsers.push(user);
			} else {
				usersToFind.push(User.invite(user, provisionUser));
			}
		});

		// Returns the users found in the db, the provisioned ones and null (in case the user was not found and not provisioned)
		const foundUsers = await Promise.all(usersToFind);
		resultUsers = [...resultUsers, ...foundUsers.filter(Boolean)];

		const usersMap = resultUsers.reduce(
			(obj, currentUser) => {
				const { id, role } = currentUser;
				obj.ids.push(id);
				obj.users[id] = typeof role === 'string' ? role : 'DEFAULT_USER';
				return obj;
			},
			{ ids: [], users: {} },
		);

		if (detach) {
			await technology.users().sync(
				usersMap.ids,
				(row) => {
					// eslint-disable-next-line no-param-reassign
					row.role = usersMap.users[row.user_id];
				},
				trx,
			);
		} else {
			await technology.users().attach(
				usersMap.ids,
				(row) => {
					// eslint-disable-next-line no-param-reassign
					row.role = usersMap.users[row.user_id];
				},
				trx,
			);
		}

		return resultUsers;
	}

	async syncronizeTerms(trx, terms, technology, detach = false) {
		const termInstances = await Promise.all(terms.map((term) => Term.getTerm(term)));
		if (detach) {
			const taxonomyIds = termInstances.map((term) => term.taxonomy_id);
			const technologyTerms = await Term.query()
				.whereHas('technologies', (builder) => {
					builder.where('id', technology.id);
				})
				.whereIn('taxonomy_id', taxonomyIds)
				.fetch();

			const technologyTermsIds = technologyTerms
				? technologyTerms.rows.map((technologyTerm) => technologyTerm.id)
				: null;

			await technology.terms().detach(technologyTermsIds, null, trx);
		}
		await technology.terms().attach(
			termInstances.map((term) => term.id),
			null,
			trx,
		);
	}

	/**
	 * Create/save a new technology.
	 * If terms is provided, it adds the related terms
	 * If users is provided, it adds the related users
	 */
	async store({ auth, request }) {
		const { thumbnail_id, knowledge_area_id, ...data } = request.only(this.fields);

		let technology;
		let trx;

		try {
			const { init, commit } = getTransaction();
			trx = await init();
			const user = await auth.getUser();

			technology = await Technology.create(
				{ ...data, likes: 0, status: technologyStatuses.DRAFT },
				trx,
			);

			if (thumbnail_id) {
				const thumbnail = await Upload.findOrFail(thumbnail_id);
				await technology.thumbnail().associate(thumbnail, trx);
			} else {
				technology.thumbnail_id = null;
			}

			let { users } = request.only(['users']);

			// if users arent supplied, defaults to the logged in user.
			if (!users) {
				users = [{ ...user.toJSON(), role: roles.OWNER }];
			}

			await this.syncronizeUsers(trx, users, technology);

			const { terms } = request.only(['terms']);
			if (terms) {
				await this.syncronizeTerms(trx, terms, technology);
			}

			const knowledgeArea = await KnowledgeArea.findBy(
				'knowledge_area_id',
				knowledge_area_id,
			);

			await technology.knowledgeArea().associate(knowledgeArea, trx);

			await commit();
			await technology.loadMany([
				'users',
				'terms.taxonomy',
				'thumbnail',
				'technologyCosts.costs',
			]);
		} catch (error) {
			await trx.rollback();
			throw error;
		}

		return technology;
	}

	/**
	 * Send invitation emails to the users that have been just syncronized.
	 *
	 * @param {Array} users The users who have been just associated to the technology
	 * @param {object} title The title of the technology
	 * @param {Function} antl Function to translate the messages
	 */
	async sendInvitationEmails(users, title, antl) {
		const { webURL } = Config.get('app');
		users.forEach(async (user) => {
			const { token } = user.isInvited()
				? await user.generateToken('reset-pw')
				: { token: null };

			const mailData = {
				email: user.email,
				subject: antl('message.user.invitationEmailSubject'),
				template: 'emails.technology-invitation',
				user,
				token,
				title,
				url: `${webURL}/auth/reset-password`,
			};
			Bull.add(SendMailJob.key, mailData, { attempts: 3 });
		});
	}

	/** POST technologies/:idTechnology/users */
	async associateTechnologyUser({ params, request }) {
		const { users } = request.only(['users']);
		const { id } = params;
		const technology = await Technology.findOrFail(id);
		const currentUsers = (await technology.users().fetch()).toJSON();

		let trx;
		let sincronizedUsers = [];

		try {
			const { init, commit } = getTransaction();
			trx = await init();

			sincronizedUsers = await this.syncronizeUsers(trx, users, technology, false, true);

			await commit();
		} catch (error) {
			trx.rollback();
			throw error;
		}

		// only send invitation emails for newly-added users
		const usersToSendInvitationEmail = sincronizedUsers.filter((syncronizedUser) => {
			return !currentUsers.find((user) => user.id === syncronizedUser.id);
		});

		if (usersToSendInvitationEmail.length > 0) {
			await this.sendInvitationEmails(
				usersToSendInvitationEmail,
				technology.title,
				request.antl,
			);
		}

		return technology.users().fetch();
	}

	/** POST technologies/:id/terms */
	async associateTechnologyTerm({ params, request }) {
		const { id } = params;
		const technology = await Technology.findOrFail(id);
		const { terms } = request.only(['terms']);
		let trx;
		try {
			const { init, commit } = getTransaction();
			trx = await init();

			await this.syncronizeTerms(trx, terms, technology);

			await commit();
		} catch (error) {
			trx.rollback();
			throw error;
		}
		return technology.terms().fetch();
	}

	async associateTechnologyReviewer({ params, request }) {
		const { reviewer } = request.all();
		const { id } = params;
		const technology = await Technology.getTechnology(id);
		const newReviewer = await Reviewer.findOrFail(reviewer);
		const oldReviewer = await technology.getReviewer();
		if (oldReviewer) {
			await technology.reviewers().detach(oldReviewer.id);
			await ReviewerTechnologyHistory.create({
				technology_id: technology.id,
				reviewer_id: oldReviewer.id,
				status: reviewerTechnologyHistoryStatuses.UNASSIGNED,
			});
			const userOldReviewer = await oldReviewer.user().first();
			const mailData = {
				email: userOldReviewer.email,
				subject: request.antl('message.reviewer.technologyReviewRevoked'),
				template: 'emails.technology-revision-revoked',
				userOldReviewer,
				technology,
			};
			Bull.add(SendMailJob.key, mailData, { attempts: 3 });
		}
		await newReviewer.technologies().attach([technology.id]);
		await ReviewerTechnologyHistory.create({
			technology_id: technology.id,
			reviewer_id: newReviewer.id,
			status: reviewerTechnologyHistoryStatuses.ASSIGNED,
		});
		const userNewReviewer = await newReviewer.user().first();
		const mailData = {
			email: userNewReviewer.email,
			subject: request.antl('message.reviewer.technologyReview'),
			template: 'emails.technology-reviewer',
			user: userNewReviewer,
			technology,
		};
		Bull.add(SendMailJob.key, mailData, { attempts: 3 });
		await newReviewer.load('technologies');
		return newReviewer;
	}

	async disassociateTechnologyReviewer({ params, request }) {
		const { id } = params;
		const technology = await Technology.getTechnology(id);
		const oldReviewer = await technology.getReviewer();
		if (oldReviewer) {
			await technology.reviewers().detach(oldReviewer.id);
			await ReviewerTechnologyHistory.create({
				technology_id: technology.id,
				reviewer_id: oldReviewer.id,
				status: reviewerTechnologyHistoryStatuses.UNASSIGNED,
			});
			const userOldReviewer = await oldReviewer.user().first();
			const mailData = {
				email: userOldReviewer.email,
				subject: request.antl('message.reviewer.technologyReviewRevoked'),
				template: 'emails.technology-revision-revoked',
				userOldReviewer,
				technology,
			};
			Bull.add(SendMailJob.key, mailData, { attempts: 3 });
		}
		technology.status = technologyStatuses.PENDING;
		await technology.save();
		Bull.add(TechnologyDistributionJob.key, technology);
		return technology;
	}

	/**
	 * Update technology details.
	 * PUT or PATCH technologies/:id
	 * If terms are provided, the related terms are updated
	 * If users are provided, the related users are updated
	 */
	async update({ params, request }) {
		const technology = await Technology.findOrFail(params.id);
		const { thumbnail_id, ...data } = request.only(this.fields);
		technology.merge(data);

		let trx;

		try {
			const { init, commit } = getTransaction();
			trx = await init();

			await technology.save(trx);

			if (thumbnail_id) {
				const thumbnail = await Upload.findOrFail(thumbnail_id);
				await technology.thumbnail().associate(thumbnail, trx);
			}

			const { terms } = request.only(['terms']);
			if (terms) {
				await this.syncronizeTerms(trx, terms, technology, true);
			}

			const { users } = request.only(['users']);
			if (users) {
				await this.syncronizeUsers(trx, users, technology, true);
			}

			await commit();

			await technology.loadMany([
				'users',
				'terms.taxonomy',
				'terms.metas',
				'thumbnail',
				'technologyCosts.costs',
			]);
		} catch (error) {
			await trx.rollback();
			throw error;
		}

		return technology;
	}

	async updateTechnologyStatus({ params, request }) {
		const technology = await Technology.findOrFail(params.id);
		const { status } = request.all();
		technology.merge({ status });
		await technology.save();
		await technology.loadMany([
			'users',
			'terms.taxonomy',
			'terms.metas',
			'thumbnail',
			'technologyCosts.costs',
		]);
		if (status === technologyStatuses.PUBLISHED) {
			Algolia.saveIndex('technology', technology);
		}
		return technology;
	}

	/**
	 * Updates technology active status.
	 * PUT technologies/:id/active
	 * If it is active, it changes to inactive.
	 * If it is inactive, it changes to active.
	 */
	async updateActiveStatus({ params, response }) {
		const technology = await Technology.findOrFail(params.id);
		technology.merge({ active: !technology.active });
		await technology.save();
		await technology.loadMany([
			'users',
			'terms.taxonomy',
			'terms.metas',
			'thumbnail',
			'technologyCosts.costs',
		]);

		if (technology.active && technology.status === technologyStatuses.PUBLISHED) {
			Algolia.saveIndex('technology', technology);
		} else {
			Algolia.initIndex('technology').deleteObject(technology.toJSON().objectID);
		}

		return response.status(204).send();
	}

	async finalizeRegistration({ params, request, auth }) {
		const technology = await Technology.findOrFail(params.id);
		const { comment } = request.all();
		if (comment) {
			const user = await auth.getUser();
			const technologyComment = await TechnologyComment.create({ comment });
			await Promise.all([
				technologyComment.technology().associate(technology),
				technologyComment.user().associate(user),
			]);
			await technology.load('comments');
		}
		technology.status = technologyStatuses.PENDING;
		await technology.save();
		Bull.add(TechnologyDistributionJob.key, technology);
		return technology;
	}

	async sendEmailToReviewer(technology, comment = null, antl) {
		const reviewer = await technology.getReviewer();
		const userReviewer = await reviewer.user().first();
		const mailData = {
			email: userReviewer.email,
			subject: antl('message.reviewer.changesMade'),
			template: 'emails.changes-made',
			userReviewer,
			technology,
			comment,
		};
		Bull.add(SendMailJob.key, mailData, { attempts: 3 });
	}

	async sendToRevision({ params, request, auth }) {
		const technology = await Technology.findOrFail(params.id);
		const { comment } = request.all();
		if (comment) {
			const user = await auth.getUser();
			const technologyComment = await TechnologyComment.create({ comment });
			await Promise.all([
				technologyComment.technology().associate(technology),
				technologyComment.user().associate(user),
			]);
			await technology.load('comments');
		}
		technology.status = technologyStatuses.CHANGES_MADE;
		await technology.save();
		await this.sendEmailToReviewer(technology, comment, request.antl);
		return technology;
	}

	async showComments({ params, request }) {
		const technology = await Technology.findOrFail(params.id);
		return TechnologyComment.query()
			.where({ technology_id: technology.id })
			.withParams(request, { filterById: false, skipRelationships: ['technology'] });
	}

	async showQuestions({ params, request }) {
		return TechnologyQuestion.query()
			.where({ technology_id: params.id })
			.where({ status: questionStatuses.ANSWERED })
			.withParams(request, { filterById: false });
	}

	async getRevisionHistory({ params }) {
		const technology = await Technology.query()
			.getTechnology(params.id)
			.with('comments')
			.with('revisions.reviewer')
			.first();

		return [...technology.toJSON().comments, ...technology.toJSON().revisions].sort((a, b) => {
			return new Date(a.created_at) - new Date(b.created_at);
		});
	}

	async getReviewerTechnologyHistory({ params, request }) {
		const reviewerTechnologyHistory = await ReviewerTechnologyHistory.query()
			.where({
				technology_id: params.id,
			})
			.with('technology')
			.with('reviewer')
			.withParams(request, { filterById: false });

		return reviewerTechnologyHistory;
	}
}

module.exports = TechnologyController;
