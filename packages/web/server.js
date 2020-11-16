const express = require('express');
const next = require('next');
const nextI18NextMiddleware = require('next-i18next/middleware').default;
const basicAuth = require('express-basic-auth');
const nextI18next = require('./utils/i18n');

const port = process.env.PORT || 8000;
const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handle = app.getRequestHandler();

(async () => {
	await app.prepare();
	const server = express();

	await nextI18next.initPromise;
	server.use(nextI18NextMiddleware(nextI18next));

	if (process.env.APP_ENV === 'production') {
		server.use(
			basicAuth({
				users: { sabia: process.env.BASIC_AUTH },
				challenge: true,
			}),
		);
	}

	server.get('*', (req, res) => handle(req, res));

	await server.listen(port);
	console.log(`> Ready on http://localhost:${port}`); // eslint-disable-line no-console
})();
