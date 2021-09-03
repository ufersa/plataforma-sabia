const sinon = require('sinon');

const sandbox = sinon.createSandbox();

const methods = sandbox.spy({
	getPosts() {},
});

module.exports = {
	...methods,
	sandbox,
};
