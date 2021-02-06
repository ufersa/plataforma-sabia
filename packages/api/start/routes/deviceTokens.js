/* eslint-disable jsdoc/check-tag-names */
/* eslint-disable jsdoc/check-indentation */

const Route = use('Route');

Route.get('device-tokens', 'DeviceTokenController.index').middleware(['auth']);
Route.get('device-tokens/:uuid', 'DeviceTokenController.show').middleware(['auth']);
Route.post('device-tokens', 'DeviceTokenController.store')
	.middleware(['auth'])
	.validator('StoreDeviceToken');
Route.put('device-tokens/:uuid', 'DeviceTokenController.update').middleware(['auth']);
Route.delete('device-tokens/:uuid', 'DeviceTokenController.destroy').middleware(['auth']);
Route.delete('device-tokens', 'DeviceTokenController.destroyMany').middleware(['auth']);
