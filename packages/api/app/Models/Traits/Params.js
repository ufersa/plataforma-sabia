class Params {
	register(Model) {
		const relationships = {
			technologies: [
				'users',
				'terms',
				'reviews',
				'bookmarkUsers',
				'costs',
				'thumbnail',
				'reviewers',
				'revisions',
			],
			roles: ['permissions', 'users'],
			users: [
				'tokens',
				'role',
				'permissions',
				'technologies',
				'reviews',
				'bookmarks',
				'uploads',
				'disclaimers',
				'institution',
				'announcements',
				'messages',
				'ideas',
				'orders',
				'services',
			],
			taxonomies: ['terms'],
			terms: ['taxonomy', 'technologies', 'metas', 'reviewers', 'announcements'],
			permissions: ['roles', 'users'],
			technology_reviews: ['technology', 'user'],
			user_bookmarks: ['technology', 'user'],
			technology_costs: ['technology', 'costs'],
			costs: ['technologyCost'],
			uploads: ['user'],
			reviewers: ['user', 'categories', 'technologies', 'revisions'],
			revisions: ['reviewer', 'technology', 'attachment'],
			disclaimers: [],
			technology_comments: ['technology', 'user'],
			technology_questions: ['technology', 'user'],
			institution: ['users', 'announcements'],
			technology_orders: ['technology', 'user'],
			announcements: ['user', 'institution', 'terms'],
			institutions: ['users', 'logo'],
			messages: ['user'],
			ideas: ['user', 'terms'],
			services: ['user', 'terms'],
		};
		const listOrder = ['asc', 'desc'];
		const listOrderBy = {
			technologies: ['id', 'title', 'slug', 'likes', 'created_at'],
			roles: ['id', 'role', 'created_at', 'updated_at'],
			users: ['id', 'first_name', 'last_name', 'email', 'created_at', 'updated_at'],
			taxonomies: ['id', 'taxonomy', 'created_at', 'updated_at'],
			terms: ['id', 'term', 'slug', 'created_at', 'updated_at'],
			permissions: ['id', 'permission', 'created_at', 'updated_at'],
			technology_reviews: ['id', 'content', 'rating', 'created_at', 'updated_at'],
			user_bookmarks: ['user_id', 'technology_id'],
			technology_costs: ['id', 'funding_required', 'funding_type'],
			costs: ['id', 'cost_type', 'description'],
			uploads: ['id', 'filename', 'created_at', 'updated_at'],
			reviewers: ['id', 'user_id', 'status', 'created_at', 'updated_at'],
			revisions: [
				'id',
				'description',
				'assessment',
				'reviewer_id',
				'technology_id',
				'created_at',
				'updated_at',
			],
			disclaimers: ['id', 'description', 'required', 'type', 'version'],
			technology_comments: ['id', 'comment', 'created_at', 'updated_at'],
			technology_questions: [
				'id',
				'question',
				'answer',
				'status',
				'created_at',
				'updated_at',
			],
			institutions: [
				'id',
				'name',
				'initials',
				'cnpj',
				'address',
				'district',
				'zipcode',
				'city',
				'state',
				'created_at',
				'updated_at',
				'type',
				'category',
			],
			technology_orders: [
				'id',
				'status',
				'unit_value',
				'user_id',
				'created_at',
				'updated_at',
			],
			announcements: [
				'id',
				'announcement_number',
				'title',
				'description',
				'start_date',
				'end_date',
				'created_at',
				'updated_at',
			],
			messages: ['id', 'user_id', 'subject', 'content', 'created_at', 'updated_at'],
			ideas: ['id', 'title', 'description', 'user_id', 'created_at', 'updated_at'],
		};

		Model.queryMacro('withParams', async function withParams(request, options = {}) {
			const { id, embed, page, perPage, order, orderBy, ids, notIn } = request.params;

			// eslint-disable-next-line no-underscore-dangle
			const resource = this._single.table;

			const { filterById = true, skipRelationships = [], skipPagination = false } = options;

			if (embed.all) {
				relationships[resource].map(
					(model) => !skipRelationships.includes(model) && this.with(model),
				);
			} else if (embed.ids) {
				relationships[resource].map((model) =>
					this.with(model, (builder) => builder.select('id')),
				);
			}

			const isIdInteger = Number.isInteger(Number(id));
			if (id && isIdInteger && filterById) {
				this.where({ id });
			} else if (typeof id === 'undefined' || id === false || !filterById) {
				if (ids) {
					this.whereIn('id', ids);
				}
				if (notIn) {
					this.whereNotIn('id', notIn);
				}
				this.orderBy(
					listOrderBy[resource].includes(orderBy) ? orderBy : 'id',
					listOrder.includes(order) ? order : listOrder[0],
				);

				const countQuery = await this.clone().count('* as total');

				const { total } = countQuery[0];

				let totalPages = 1;
				if (!skipPagination) {
					totalPages = Math.ceil(total / perPage);

					this.offset((page - 1) * perPage).limit(perPage);
				}

				request.params = {
					...request.params,
					total,
					totalPages,
				};
				return this.fetch();
			}

			return this.firstOrFail();
		});

		Model.queryMacro('withAssociations', function withAssociations(id) {
			return this.withParams({
				params: { id, ids: false, embed: { all: true, ids: false } },
			});
		});
	}
}
module.exports = Params;
