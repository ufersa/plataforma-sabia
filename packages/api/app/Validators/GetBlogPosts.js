const BaseValidator = use('App/Validators/BaseValidator');

const LIMIT_NUMBER = 10;

class GetBlogPosts extends BaseValidator {
	get rules() {
		return {
			start: `max:${LIMIT_NUMBER}`,
			limit: `max:${LIMIT_NUMBER}`,
		};
	}

	get data() {
		const { start, limit } = this.ctx.request.all();
		return {
			start: Number(start) || 0,
			limit: Number(limit) > LIMIT_NUMBER ? LIMIT_NUMBER : Number(limit),
		};
	}
}

module.exports = GetBlogPosts;
