/* eslint-disable jsdoc/check-tag-names */
/* eslint-disable jsdoc/check-indentation */

const Route = use('Route');

Route.post('device-tokens', 'DeviceTokenController.store')
	.middleware(['auth'])
	.validator('StoreDeviceToken');
