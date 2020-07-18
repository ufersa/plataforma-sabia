module.exports = (api) => {
	const cypress = api.env('cypress');

	return {
		presets: ['next/babel'],
		plugins: [
			[
				'i18next-extract',
				{
					locales: ['pt', 'en'],
					outputPath: './public/static/locales/{{locale}}/{{ns}}.json',
				},
			],
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
								'/node_modules/',
								'/coverage/',
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
