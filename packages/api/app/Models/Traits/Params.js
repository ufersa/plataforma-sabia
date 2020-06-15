class Params {
	register(Model) {
		const relationships = {
			technologies: ['users', 'terms'],
			roles: ['permissions', 'users'],
			users: ['role', 'permissions', 'technologies'],
			taxonomies: ['terms'],
			terms: ['taxonomy', 'technologies'],
			permissions: ['roles', 'users'],
		};

		Model.queryMacro('withParams', function({ id, embed, page, perPage, order, orderBy }) {
			// eslint-disable-next-line no-underscore-dangle
			const resource = this._single.table;

			if (id) {
				this.where({ id });
			} else {
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

		Model.queryMacro('withAssociations', function(id) {
			this.withParams({ id, embed: { all: true, ids: false } });
			return this.first();
		});
	}
}
module.exports = Params;
