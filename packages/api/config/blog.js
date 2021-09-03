const Env = use('Env');

const env = Env.getOrFail('APP_ENV');
const subdomain = env === 'production' ? 'blog-api' : 'blog-api-staging';

module.exports = {
	url: `https://${subdomain}.plataformasabia.com`,
};
