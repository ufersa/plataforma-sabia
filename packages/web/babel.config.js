module.exports = (api) => {
	api.cache.using(() => process.env.APP_ENV);

	return {
		presets: ['next/babel'],
		plugins: [
			[
				'styled-components',
				{
					ssr: true,
				},
			],
			process.env.APP_ENV === 'cypress'
				? [
						'istanbul',
						{
							exclude: [
								'/.next/',
								'/node_modules/',
								'/coverage/',
								'/stories/',
								'/.storybook/',
								'/tests/',
								'/__tests__/',
								'config.js',
								'server.js',
								'stories.js',
								'test.js',
							],
						},
				  ]
				: null,
		].filter(Boolean),
	};
};
