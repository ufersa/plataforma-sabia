const BaseValidator = use('App/Validators/BaseValidator');

class GetBlogPosts extends BaseValidator {
	get rules() {
		return {
			limit: 'number|max:10',
		};
	}
}

module.exports = GetBlogPosts;
