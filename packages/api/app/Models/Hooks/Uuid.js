const { v4: uuidv4 } = require('uuid');
// eslint-disable-next-line no-multi-assign
const uuidHook = (exports = module.exports = {});

uuidHook.generate = async (model) => {
	model.id = uuidv4();
};
