/** @type {import('@adonisjs/framework/src/Env')} */

module.exports = {
	uploadsPath: 'resources/uploads',
	allowedFormats: ['jpg', 'jpeg', 'jfif', 'pjpeg', 'pjp', 'png', 'webp', 'pdf'],
	maxFileSize: '5mb',
	fileTypes: ['image', 'application'],
};
