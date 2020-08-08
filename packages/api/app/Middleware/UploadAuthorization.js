const UnauthorizedException = use('App/Exceptions/UnauthorizedException');
const Permission = use('App/Models/Permission');

class UploadAuthorization {
	async handle({ request, auth }, next) {
		const { meta } = request.all();
		const objectInfo = meta ? JSON.parse(meta) : {};
		if (objectInfo.object) {
			switch (objectInfo.object) {
				case 'technologies': {
					const user = await auth.getUser();
					const params = {};
					params.id = objectInfo.object_id;
					const isAuthorized = await Permission.checkPermission(
						user,
						['update-technologies', 'update-technology'],
						params,
					);
					if (!isAuthorized) {
						throw new UnauthorizedException();
					}
					break;
				}

				default:
					throw new UnauthorizedException();
			}
		}

		await next();
	}
}

module.exports = UploadAuthorization;
