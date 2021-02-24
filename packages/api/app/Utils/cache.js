const Redis = use('Redis');

const get = async (key = '') => {
	const result = await Redis.get(key);
	return result ? JSON.parse(result) : false;
};

const set = async (key = '', value = '', expires = 60, ...rest) => {
	return Redis.set(key, JSON.stringify(value), 'EX', expires, ...rest);
};

const keys = async (...params) => Redis.keys(...params);

const del = async (...params) => Redis.del(...params);

const generateKey = (prefix = '', filters = {}) => {
	const filtersKey = Object.entries(filters)
		.map(([key, value]) => (value ? `${key}:${value}` : null))
		.filter(Boolean);
	return [prefix, ...filtersKey].join(':');
};

const remember = async (key = '', expires, callback = () => {}) => {
	const value = await get(key);

	if (value) {
		return value;
	}

	const result = await callback();

	await set(key, result, expires);

	return result;
};

module.exports = {
	get,
	set,
	keys,
	del,
	generateKey,
	remember,
};
