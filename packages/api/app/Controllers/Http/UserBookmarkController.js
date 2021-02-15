const User = use('App/Models/User');
const Technology = use('App/Models/Technology');
const Service = use('App/Models/Service');

class UserBookmarkController {
	async syncronizeTechnologyLikes(technologyIds) {
		// Update likes in technology
		const updatePromises = technologyIds.map(async (technologyId) => {
			const technology = await Technology.findOrFail(technologyId);
			const likes = await technology.bookmarkUsers().count('* as likes');
			technology.merge({ likes: likes[0].likes });
			return technology.save();
		});

		await Promise.all(updatePromises);
	}

	async syncronizeServiceLikes(serviceIds) {
		// Update likes in service
		const updatePromises = serviceIds.map(async (serviceId) => {
			const service = await Service.findOrFail(serviceId);
			const likes = await service.bookmarkUsers().count('* as likes');
			service.merge({ likes: likes[0].likes });
			return service.save();
		});

		await Promise.all(updatePromises);
	}

	/**
	 * Bookmarks a technology.
	 * POST bookmarks
	 */
	async store({ request, auth }) {
		const { technologyIds, serviceIds } = request.all();
		const user = await auth.getUser();
		let technologyBookmarks = [];
		let serviceBookmarks = [];
		if (technologyIds) {
			technologyBookmarks = await user.bookmarks().attach(technologyIds);
			await this.syncronizeTechnologyLikes(technologyIds);
		}

		if (serviceIds) {
			serviceBookmarks = await user.serviceBookmarks().attach(serviceIds);
			await this.syncronizeServiceLikes(serviceIds);
		}

		return [...technologyBookmarks, ...serviceBookmarks];
	}

	/**
	 * Get UserBookmarks by userid.
	 * GET /user/:id/bookmarks
	 */
	async show({ request, params }) {
		const user = await User.findOrFail(params.id);
		return Technology.query()
			.whereHas('bookmarkUsers', (builder) => {
				builder.where('user_id', user.id);
			})
			.withParams(request, { filterById: false });
	}

	/**
	 * Get UserBookmarks.
	 * GET /bookmarks
	 * If technologyId is passed returns all user that bookmarks the tecnology
	 */
	async index({ request }) {
		const filters = request.all();

		return User.query()
			.withBookmarksFilters(filters)
			.withParams(request);
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
				await this.syncronizeTechnologyLikes(technologyIds);
				return response.status(200).send({ success: true });
			}

			return response.status(204);
		}
		const bookmarks = await user.bookmarks().fetch();
		const bookmarksIds = bookmarks.rows.map((bookmark) => bookmark.id);
		await user.bookmarks().detach();
		await this.syncronizeTechnologyLikes(bookmarksIds);
		return response.status(200).send({ success: true });
	}
}

module.exports = UserBookmarkController;
