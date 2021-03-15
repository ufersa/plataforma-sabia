const { cache } = require('../../Utils');

const deleteKeysFromPrefix = async (prefix) => {
	const keys = await cache.keys(`${prefix}*`);

	for (const key of keys) {
		// eslint-disable-next-line no-await-in-loop
		await cache.del(key);
	}
};

class InvalidateCache {
	register(Model, prefix) {
		Model.addHook('afterSave', async () => deleteKeysFromPrefix(prefix));
		Model.addHook('afterDelete', async () => deleteKeysFromPrefix(prefix));
	}
}

module.exports = InvalidateCache;
