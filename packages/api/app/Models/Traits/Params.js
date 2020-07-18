class Params {
	register(Model) {
		const relationships = {
			technologies: ['users', 'terms', 'reviews', 'bookmarkUsers', 'technologyCosts'],
			roles: ['permissions', 'users'],
			users: ['role', 'permissions', 'technologies', 'reviews', 'bookmarks'],
			taxonomies: ['terms'],
			terms: ['taxonomy', 'technologies'],
			permissions: ['roles', 'users'],
			technology_reviews: ['technology', 'user'],
			user_bookmarks: ['technology', 'user'],
			technology_costs: ['technology', 'costs'],
			costs: ['technologyCost'],
		};

		Model.queryMacro('withParams', function withParams(
			{ id, embed, page, perPage, order, orderBy, ids, notIn },
			options = { filterById: true },
		) {
			// eslint-disable-next-line no-underscore-dangle
			const resource = this._single.table;

			const isIdInteger = Number.isInteger(Number(id));
			if (id && isIdInteger && options.filterById) {
				this.where({ id });
			} else if (typeof id === 'undefined' || id === false) {
				this.offset((page - 1) * perPage)
					.limit(perPage)
					.orderBy(orderBy, order);
				if (ids) {
					this.whereIn('id', ids);
				}
				if (notIn) {
					this.whereNotIn('id', notIn);
				}
			}

			if (embed.all) {
				relationships[resource].map((model) => this.with(model));
			} else if (embed.ids) {
				relationships[resource].map((model) =>
					this.with(model, (builder) => builder.select('id')),
				);
			}

			return this;
		});

		Model.queryMacro('withAssociations', function withAssociations(id) {
			this.withParams({ id, ids: false, embed: { all: true, ids: false } });
			return this.first();
		});
	}
}
module.exports = Params;
