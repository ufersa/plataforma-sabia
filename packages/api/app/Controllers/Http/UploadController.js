const Helpers = use('Helpers');
const Upload = use('App/Models/Upload');
const fs = require('fs');

const { antl, errors, errorPayload, getTransaction } = require('../../Utils');

const Config = use('Adonis/Src/Config');
const { uploadsPath } = Config.get('upload');

class UploadController {
	async index({ request }) {
		const allowedFilters = ['object_id', 'object'];
		const query = Object.fromEntries(
			Object.entries(request.get()).filter(([key]) => allowedFilters.includes(key)),
		);

		return Upload.query()
			.where(query)

			.withFilters(request)
			.withParams(request);
	}

	async store({ request, response, auth }) {
		const { meta } = request.all();
		const files = request.file('files');
		const objectInfo = meta ? JSON.parse(meta) : {};

		const uploadPath = objectInfo.object
			? `${uploadsPath}/${objectInfo.object}`
			: `${uploadsPath}`;

		const uploadedFiles = files.files;

		let trx;
		let uploads;
		try {
			const { init, commit } = getTransaction();
			trx = await init();

			await Promise.all(
				uploadedFiles.map(async (file) => {
					const filename = await Upload.getUniqueFileName(file, objectInfo.object);
					await file.move(Helpers.publicPath(uploadPath), {
						name: filename,
					});
				}),
			);

			if (!files.movedAll()) {
				throw new Error('Moving files error');
			}

			const user = await auth.getUser();

			uploads = await Promise.all(
				files.movedList().map((file) =>
					user.uploads().create(
						{
							filename: file.fileName,
							object: objectInfo.object,
							object_id: objectInfo.object_id,
						},
						trx,
					),
				),
			);

			await commit();
		} catch (error) {
			trx.rollback();
			for (const file of files.movedList()) {
				fs.unlinkSync(Helpers.publicPath(`${uploadPath}/${file.fileName}`));
			}
			return response
				.status(400)
				.send(
					errorPayload(
						errors.RESOURCE_SAVING_ERROR,
						antl('error.resource.resourceSavingError'),
					),
				);
		}
		return uploads;
	}

	async destroy({ params, response }) {
		const upload = await Upload.findOrFail(params.id);
		const uploadPath = upload.object ? `${uploadsPath}/${upload.object}` : `${uploadsPath}`;

		const result = await upload.delete();

		if (result) {
			const path = Helpers.publicPath(`${uploadPath}/${upload.filename}`);
			if (fs.existsSync(path)) {
				fs.unlinkSync(path);
			}
		} else {
			return response
				.status(400)
				.send(
					errorPayload(
						errors.RESOURCE_DELETED_ERROR,
						antl('error.resource.resourceDeletedError'),
					),
				);
		}

		return response.status(200).send({ success: true });
	}

	async show({ params, response }) {
		return response.download(Helpers.publicPath(`${uploadsPath}/${params.filename}`));
	}

	async showWithObject({ params, response }) {
		return response.download(
			Helpers.publicPath(`${uploadsPath}/${params.object}/${params.filename}`),
		);
	}
}

module.exports = UploadController;
