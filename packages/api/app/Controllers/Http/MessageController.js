const Message = use('App/Models/Message');
class MessageController {
	async index({ auth, request }) {
		const filters = request.all();
		const user = await auth.getUser();
		return Message.query()
			.where({ user_id: user.id })
			.withFilters(filters)
			.withParams(request);
	}
}

module.exports = MessageController;
