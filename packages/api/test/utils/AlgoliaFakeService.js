const sinon = require('sinon');

const sandbox = sinon.createSandbox();

const indexMethods = sandbox.spy({
	saveObject() {},
	saveObjects() {},
	partialUpdateObject() {},
	partialUpdateObjects() {},
	deleteObject() {},
	clearObjects() {},
});

const algoliaClientMethods = sandbox.spy({
	initIndex() {
		return indexMethods;
	},
});
module.exports = {
	...algoliaClientMethods,
};
