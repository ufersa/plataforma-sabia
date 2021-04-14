const sinon = require('sinon');

const sandbox = sinon.createSandbox();

const indexMethods = sandbox.spy({
	saveObject() {},
	saveObjects() {},
	partialUpdateObject() {},
	partialUpdateObjects() {},
	deleteObject() {},
});

const algoliaClientMethods = sandbox.spy({
	initIndex() {
		return indexMethods;
	},
});
module.exports = {
	...algoliaClientMethods,
	sandbox,
};
