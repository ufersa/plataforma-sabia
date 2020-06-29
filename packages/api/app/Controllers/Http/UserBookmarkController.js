const User = use('App/Models/User');
const Technology = use('App/Models/Technology');

class UserBookmarkController {
	/**
	 * Bookmarks a technology.
	 * POST bookmarks
	 */
	async store({ request, auth }) {
		const { technologyIds } = request.all();
		const user = await auth.getUser();
		return user.bookmarks().attach(technologyIds);
	}

	/**
	 * Get UserBookmarks by userid.
	 * GET /user/:id/bookmarks
	 */
	async show({ params }) {
		const user = await User.findOrFail(params.id);
		return user.bookmarks().fetch();
	}

	/**
	 * Get UserBookmarks.
	 * GET /bookmarks
	 * If technologyId is passed returns all user that bookmarks the tecnology
	 */
	async index({ request }) {
		const query = request.get();
		if (query.technologyId) {
			const technology = await Technology.findOrFail(query.technologyId);
			return technology
				.bookmarkUsers()
				.withParams(request.params)
				.fetch();
		}

		return User.query()
			.with('bookmarks')
			.withParams(request.params)
			.fetch();
	}

	/**
	 * Delete UserBookmarks.
	 * DELETE /user/:id/bookmarks
	 */
	async destroy({ params, request, response }) {
		const user = await User.findOrFail(params.id);
		const { technologyIds } = request.all();
		if (technologyIds && technologyIds.length) {
			const result = await user.bookmarks().detach(technologyIds);
			if (result > 0) {
				return response.status(200).send({ success: true });
			}

			return response.status(204);
		}
		await user.bookmarks().detach();
		return response.status(200).send({ success: true });
	}
}

module.exports = UserBookmarkController;
