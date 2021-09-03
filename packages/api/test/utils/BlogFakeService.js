const sinon = require('sinon');

const sandbox = sinon.createSandbox();

const methods = sandbox.spy({
	getPosts: async () => [],
});

module.exports = {
	...methods,
	sandbox,
};
