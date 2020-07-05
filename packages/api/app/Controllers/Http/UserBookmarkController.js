const User = use('App/Models/User');

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
	async show({ request, params }) {
		const user = await User.findOrFail(params.id);
		return user
			.bookmarks()
			.withParams(request.params, { filterById: false })
			.fetch();
	}

	/**
	 * Get UserBookmarks.
	 * GET /bookmarks
	 * If technologyId is passed returns all user that bookmarks the tecnology
	 */
	async index({ request }) {
		const filters = request.all();

		return User.query()
			.withParams(request.params)
			.withBookmarksFilters(filters)
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
