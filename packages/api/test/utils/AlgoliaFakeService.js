const sinon = require('sinon');

const sandbox = sinon.createSandbox();

const indexMethods = sandbox.spy({
	saveObject() {},
	deleteObject() {},
});

const algoliaClientMethods = sandbox.spy({
	initIndex() {
		return indexMethods;
	},
});
module.exports = {
	...algoliaClientMethods,
};
