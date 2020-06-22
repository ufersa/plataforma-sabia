class Params {
	register(Model) {
		const relationships = {
			technologies: ['users', 'terms', 'reviews'],
			roles: ['permissions', 'users'],
			users: ['role', 'permissions', 'technologies', 'reviews'],
			taxonomies: ['terms'],
			terms: ['taxonomy', 'technologies'],
			permissions: ['roles', 'users'],
			technology_reviews: ['technology', 'user'],
		};

		Model.queryMacro('withParams', function withParams(
			{ id, embed, page, perPage, order, orderBy },
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
			this.withParams({ id, embed: { all: true, ids: false } });
			return this.first();
		});
	}
}
module.exports = Params;
