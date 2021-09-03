const BaseValidator = use('App/Validators/BaseValidator');

const LIMIT_NUMBER = 10;

class GetBlogPosts extends BaseValidator {
	get rules() {
		return {
			limit: `max:${LIMIT_NUMBER}`,
		};
	}

	get data() {
		const { limit } = this.ctx.request.all();
		return {
			limit: Number(limit) > LIMIT_NUMBER ? LIMIT_NUMBER : Number(limit),
		};
	}
}

module.exports = GetBlogPosts;
