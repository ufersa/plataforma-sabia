const Env = use('Env');
const fetch = require('node-fetch');
const FormData = require('form-data');

class CheckReCaptchaToken {
	async handle({ request, response }, next) {
		const recaptchatoken = request.header('recaptchatoken');

		const form = new FormData();
		const url = 'https://www.google.com/recaptcha/api/siteverify';

		form.append('secret', Env.get('GOOGLE_RECAPTCHA_V3_SECRET_KEY'));
		form.append('response', recaptchatoken);

		const result = await fetch(url, { method: 'POST', body: form }).then((res) => res.json());

		if (!result.success) {
			return response.status(401).send({ 'Error ReCaptcha': result });
		}

		if (result.score < 0.5) {
			return response.status(401).send({ Error: 'Tente mais tarde' });
		}
		return next();
	}
}

module.exports = CheckReCaptchaToken;
