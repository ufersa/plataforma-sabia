class Params {
	register(Model) {
		Model.queryMacro('withParams', function({ page, perPage, order, orderBy }) {
			this.offset((page - 1) * perPage)
				.limit(perPage)
				.orderBy(orderBy, order);
			return this;
		});

		Model.queryMacro('withEmbed', function({ id, embed, resource }) {
			const relationships = {
				technologies: ['users', 'terms'],
				roles: ['permissions', 'users'],
				users: ['role', 'permissions', 'technologies'],
				taxonomies: ['terms'],
				terms: ['taxonomy', 'technologies'],
				permissions: ['roles', 'users'],
			};

			this.where('id', id);

			if (embed.all) {
				relationships[resource].map((column) => this.with(column));
			} else if (embed.ids) {
				relationships[resource].map((column) =>
					this.with(column, (builder) => builder.select('id')),
				);
			}

			return this;
		});
	}
}
module.exports = Params;
