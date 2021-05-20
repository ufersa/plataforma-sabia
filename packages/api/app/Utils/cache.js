/** @type {import('ioredis').Redis} */
const Redis = use('Redis');

async function get(key = '') {
	const result = await Redis.get(key);
	return result ? JSON.parse(result) : false;
}

async function set(key = '', value = '', expires = 60, ...rest) {
	return Redis.set(key, JSON.stringify(value), 'EX', expires, ...rest);
}

async function keys(pattern) {
	return Redis.keys(pattern);
}

async function del(...params) {
	return Redis.del(...params);
}

/**
 * Deletes keys by prefix
 *
 * @param {string} keyPrefix Redis key prefix
 */
async function deleteByPrefix(keyPrefix) {
	const findedKeys = await keys(`${keyPrefix}*`);

	if (!findedKeys.length) {
		return null;
	}

	const pipeline = Redis.pipeline();

	findedKeys.forEach((key) => {
		pipeline.del(key);
	});

	return pipeline.exec();
}

function generateKey(prefix = '', filters = {}) {
	const filtersKey = Object.entries(filters)
		.map(([key, value]) => (value ? `${key}:${value}` : null))
		.filter(Boolean);

	return [prefix, ...filtersKey].join(':');
}

async function remember(key = '', expires, callback = async () => {}) {
	const value = await get(key);

	if (value) {
		return value;
	}

	const result = await callback();

	await set(key, result, expires);

	return result;
}

module.exports = {
	get,
	set,
	keys,
	del,
	deleteByPrefix,
	generateKey,
	remember,
};
