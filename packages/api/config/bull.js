const Env = use('Env');

module.exports = {
	// redis connection
	connection: Env.get('BULL_CONNECTION', 'bull'),
	bull: {
		redis: {
			host: '127.0.0.1',
			port: 6379,
			password: null,
			db: 0,
			keyPrefix: '',
		},
	},
	remote: 'redis://redis.example.com?password=correcthorsebatterystaple',
};
