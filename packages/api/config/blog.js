const Env = use('Env');

const env = Env.getOrFail('APP_ENV');
const apiSubdomain = env === 'production' ? 'blog-api' : 'blog-api-staging';
const clientSubdomain = env === 'production' ? 'blog' : 'blog-staging';

module.exports = {
	apiUrl: `https://${apiSubdomain}.plataformasabia.com`,
	clientUrl: `https://${clientSubdomain}.plataformasabia.com`,
};
