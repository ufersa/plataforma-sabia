class Params {
	register(Model) {
		const relationships = {
			technologies: [
				'users',
				'terms',
				'reviews',
				'bookmarkUsers',
				'technologyCosts',
				'thumbnail',
			],
			roles: ['permissions', 'users'],
			users: ['role', 'permissions', 'technologies', 'reviews', 'bookmarks'],
			taxonomies: ['terms'],
			terms: ['taxonomy', 'technologies', 'metas'],
			permissions: ['roles', 'users'],
			technology_reviews: ['technology', 'user'],
			user_bookmarks: ['technology', 'user'],
			technology_costs: ['technology', 'costs'],
			costs: ['technologyCost'],
			uploads: ['user'],
		};
		const listOrder = ['asc', 'desc'];
		const listOrderBy = {
			technologies: ['id', 'title', 'slug', 'likes'],
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
		};

		Model.queryMacro('withParams', async function withParams(
			request,
			options = { filterById: true },
		) {
			const { id, embed, page, perPage, order, orderBy, ids, notIn } = request.params;

			// eslint-disable-next-line no-underscore-dangle
			const resource = this._single.table;

			if (embed.all) {
				relationships[resource].map((model) => this.with(model));
			} else if (embed.ids) {
				relationships[resource].map((model) =>
					this.with(model, (builder) => builder.select('id')),
				);
			}

			const isIdInteger = Number.isInteger(Number(id));
			if (id && isIdInteger && options.filterById) {
				this.where({ id });
			} else if (typeof id === 'undefined' || id === false || !options.filterById) {
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
				const result = await this.fetch();
				const total = result.toJSON().length;
				const totalPages = Math.ceil(total / perPage);

				const currentPage = page > totalPages && totalPages > 0 ? totalPages : page;
				const start = (currentPage - 1) * perPage;
				const end = currentPage * perPage;
				request.params = {
					...request.params,
					total,
					totalPages,
				};
				return result.toJSON().slice(start, end);
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
