const Helpers = use('Helpers');
// const Upload = use('App/Models/Upload');

class UploadController {
	async store({ request, auth }) {
		const { meta } = request.all();
		const files = request.file('files', {
			types: ['image'],
			size: '2mb',
			extnames: ['jpg', 'jpeg', 'jfif', 'pjpeg', 'pjp', 'png', 'webp'],
		});
		const objectInfo = meta ? JSON.parse(meta) : {};
		const uploadPath = objectInfo.object
			? `resources/uploads/${objectInfo.object}`
			: 'resources/uploads';

		await files.moveAll(Helpers.publicPath(uploadPath));

		if (!files.movedAll()) {
			return files.errors();
		}

		const user = await auth.getUser();

		await Promise.all(
			files.movedList().map((file) =>
				user.uploads().create({
					filename: file.fileName,
					object: objectInfo.object,
					object_id: objectInfo.object_id,
				}),
			),
		);

		return user.uploads().fetch();
	}

	async show({ params, response }) {
		return response.download(Helpers.publicPath(`resources/uploads/${params.filename}`));
	}

	async showWithObject({ params, response }) {
		return response.download(
			Helpers.publicPath(`resources/uploads/${params.object}/${params.filename}`),
		);
	}
}

module.exports = UploadController;
