const Env = use('Env');

module.exports = {
	// redis connection
	connection: Env.get('BULL_CONNECTION', 'bull'),
	bull: {
		redis: {
			host: Env.get('REDIS_HOST', '127.0.0.1'),
			port: Env.get('REDIS_PORT', 6379),
			password: Env.get('REDIS_PASSWORD', null),
			db: 0,
			keyPrefix: '',
		},
	},
	remote: 'redis://redis.example.com?password=correcthorsebatterystaple',
};
