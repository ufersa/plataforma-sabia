/** @type {import('@adonisjs/framework/src/Env')} */

module.exports = {
	uploadsPath: 'uploads',
	allowedFormats: ['jpg', 'jpeg', 'jfif', 'pjpeg', 'pjp', 'png', 'webp', 'pdf'],
	maxFileSize: '5mb',
	fileTypes: ['image', 'application'],
	storageURL: 'https://plataforma-sabia-api-production.s3-sa-east-1.amazonaws.com',
};
