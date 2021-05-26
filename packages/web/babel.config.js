module.exports = (api) => {
	const cypress = api.env('cypress');

	return {
		presets: ['next/babel'],
		plugins: [
			[
				'styled-components',
				{
					ssr: true,
				},
			],
			cypress
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
