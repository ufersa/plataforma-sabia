class Params {
	register(Model) {
		Model.queryMacro('withParams', function({ page, perPage, order, orderBy }) {
			this.offset((page - 1) * perPage)
				.limit(perPage)
				.orderBy(orderBy, order);
			return this;
		});
	}
}
module.exports = Params;
