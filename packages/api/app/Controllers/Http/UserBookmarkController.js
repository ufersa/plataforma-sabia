const User = use('App/Models/User');
const Technology = use('App/Models/Technology');

class UserBookmarkController {
	async syncronizeLikes(technologyIds) {
		// Update likes in technology
		const updatePromises = technologyIds.map(async (technologyId) => {
			const technology = await Technology.findOrFail(technologyId);
			const likes = await technology.bookmarkUsers().count('* as likes');
			technology.merge({ likes: likes[0].likes });
			return technology.save();
		});

		await Promise.all(updatePromises);
	}

	/**
	 * Bookmarks a technology.
	 * POST bookmarks
	 */
	async store({ request, auth }) {
		const { technologyIds } = request.all();
		const user = await auth.getUser();
		const bookmarks = await user.bookmarks().attach(technologyIds);
		await this.syncronizeLikes(technologyIds);
		return bookmarks;
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
				await this.syncronizeLikes(technologyIds);
				return response.status(200).send({ success: true });
			}

			return response.status(204);
		}
		const bookmarks = await user.bookmarks().fetch();
		const bookmarksIds = bookmarks.rows.map((bookmark) => bookmark.id);
		await user.bookmarks().detach();
		await this.syncronizeLikes(bookmarksIds);
		return response.status(200).send({ success: true });
	}
}

module.exports = UserBookmarkController;
