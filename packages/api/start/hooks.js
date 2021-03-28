const { hooks } = require('@adonisjs/ignitor');

hooks.after.providersBooted(() => {
	const Validator = use('Validator');

	// eslint-disable-next-line global-require
	const CustomValidators = require('../app/Utils/CustomValidators');

	Object.values(CustomValidators).forEach((validator) => {
		Validator.extend([validator.name], validator);
	});

	const Config = use('Adonis/Src/Config');
	const View = use('View');

	View.global('APP_URL', Config.get('app.appURL'));
	View.global('WEB_URL', Config.get('app.webURL'));
	View.global('STORAGE_URL', Config.get('upload.storageURL'));
	View.global('PLATFORM_MAIL', Config.get('mail.platform.mail'));
});
