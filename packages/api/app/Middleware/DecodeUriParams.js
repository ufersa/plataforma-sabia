class DecodeUriParams {
	async handle({ request }, next) {
		if (request.intended() === 'GET') {
			const params = Object.entries(request.params);

			if (params.length) {
				request.params = params.reduce((acc, [key, value]) => {
					acc[key] = decodeURIComponent(value);
					return acc;
				}, {});
			}
		}

		await next();
	}
}

module.exports = DecodeUriParams;
