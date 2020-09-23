/* eslint-disable jsdoc/check-tag-names */
/* eslint-disable jsdoc/check-indentation */

const { getMiddlewarePermissions, permissions } = require('../../app/Utils/roles_capabilities');

const Route = use('Route');

/** Uploads */
/**
 * @api {post} /uploads Uploads a file(s)
 * @apiGroup Uploads
 * @apiPermission CREATE_UPLOADS and uploadAuthorization if object_id is passed
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParam {File} files[] Mandatory File to upload. types: ['image', 'application'], size: '2mb',	extnames: ['jpg', 'jpeg', 'jfif', 'pjpeg', 'pjp', 'png', 'webp', 'pdf'],
 * @apiParam {String} [meta] Optional metadata json string. Ex. {"object":"technologies","object_id":3}
 * @apiSuccess {Number} id Upload ID
 * @apiSuccess {Number} user_id Upload User ID
 * @apiSuccess {String} filename Filename
 * @apiSuccess {String} url Upload URL
 * @apiSuccess {Date} created_at Upload Register date
 * @apiSuccess {Date} updated_at Upload Update date
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 *	[
 *	 {
 *	   "filename": "test-image.jpg",
 *	   "user_id": 11,
 *	   "created_at": "2020-08-19 20:59:22",
 *	   "updated_at": "2020-08-19 20:59:22",
 *	   "id": 1,
 *	   "url": "http://127.0.0.1:3333/uploads/test-image.jpg"
 *	 }
 *	]
 * @apiUse AuthError
 * @apiError (Bad Request 400) {File[]} fieldName Field Name
 * @apiError (Bad Request 400) {String} clientName File Name on Client
 * @apiError (Bad Request 400) {String} message Error message
 * @apiError (Bad Request 400) {String} type Error Type
 * @apiErrorExample {json} File Size Error
 *  HTTP/1.1 400 Bad Request
 *	[
 *	 {
 *	   "fieldName": "files[]",
 *	   "clientName": "hugefile.pdf",
 *	   "message": "File size should be less than 2MB",
 *	   "type": "size"
 *	 }
 *	]
 * @apiErrorExample {json} Invalid File Extension
 *  HTTP/1.1 400 Bad Request
 *	[
 *	 {
 *	   "fieldName": "files[]",
 *	   "clientName": "invalidextfile.test",
 *	   "message": "Invalid file extension test. Only jpg, jpeg, jfif, pjpeg, pjp, png, webp, pdf are allowed",
 *	   "type": "extname"
 *	 }
 *	[
 * @apiError (Forbidden 403) {Object} error Error object
 * @apiError (Forbidden 403) {String} error.error_code Error code
 * @apiError (Forbidden 403) {String} error.message Error message
 * @apiErrorExample {json} Unauthorized Access
 *    HTTP/1.1 403 Forbidden
 *		{
 * 			"error": {
 *   			"error_code": "UNAUTHORIZED_ACCESS",
 *   			"message":"Você não tem permissão para acessar esse recurso"
 * 			}
 *		}
 */
Route.post('/uploads', 'UploadController.store').middleware([
	'auth',
	getMiddlewarePermissions([permissions.CREATE_UPLOADS]),
	'uploadAuthorization',
]);
/**
 * @api {delete} /uploads/:id Deletes a Upload
 * @apiGroup Uploads
 * @apiPermission DELETE_UPLOADS or DELETE_UPLOAD
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParam {Number} id Mandatory Upload ID.
 * @apiParamExample  {json} Request sample:
 *	/uploads/1
 * @apiSuccess {Boolean} success Success Flag
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *		"success":"true"
 *    }
 * @apiUse AuthError
 * @apiError (Forbidden 403) {Object} error Error object
 * @apiError (Forbidden 403) {String} error.error_code Error code
 * @apiError (Forbidden 403) {String} error.message Error message
 * @apiErrorExample {json} Unauthorized Access
 *    HTTP/1.1 403 Forbidden
 *		{
 * 			"error": {
 *   			"error_code": "UNAUTHORIZED_ACCESS",
 *   			"message":"Você não tem permissão para acessar esse recurso"
 * 			}
 *		}
 * @apiErrorExample {json} Resource Upload was not found
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "RESOURCE_NOT_FOUND",
 *   			"message":"The resource Upload was not found"
 * 			}
 *		}
 */
Route.delete('/uploads/:id', 'UploadController.destroy').middleware([
	'auth',
	getMiddlewarePermissions([permissions.DELETE_UPLOADS, permissions.DELETE_UPLOAD]),
]);
/**
 * @api {get} /uploads Lists all Uploads
 * @apiGroup Uploads
 * @apiParam (Query Param) {String} [object] Optional object param for filter
 * @apiParam (Query Param) {Number} [object_id] Optional object_id param for filter
 * @apiUse Params
 * @apiSuccess {Object[]} uploads Uploads Collection
 * @apiSuccess {Number} uploads.id Upload ID
 * @apiSuccess {Number} uploads.user_id Upload User ID
 * @apiSuccess {String} uploads.filename Filename
 * @apiSuccess {String} uploads.object Object
 * @apiSuccess {Number} uploads.object_id Object ID
 * @apiSuccess {String} uploads.url Upload URL
 * @apiSuccess {Date} uploads.created_at Upload Register date
 * @apiSuccess {Date} uploads.updated_at Upload Update date
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 *	[
 *	 {
 *	   "id": 1,
 *	   "filename": "test-image.jpg",
 *	   "user_id": 11,
 *	   "object": null,
 *	   "object_id": null,
 *	   "created_at": "2020-08-19 20:59:22",
 *	   "updated_at": "2020-08-19 20:59:22",
 *	   "url": "http://127.0.0.1:3333/uploads/test-image.jpg"
 *	 },
 *	 {
 *	   "id": 3,
 *	   "filename": "test-image-1.jpg",
 *	   "user_id": 11,
 *	   "object": null,
 *	   "object_id": null,
 *	   "created_at": "2020-08-19 21:25:20",
 *	   "updated_at": "2020-08-19 21:25:20",
 *	   "url": "http://127.0.0.1:3333/uploads/test-image-1.jpg"
 *	 },
 *	 {
 *	   "id": 4,
 *	   "filename": "test-image-2.jpg",
 *	   "user_id": 11,
 *	   "object": null,
 *	   "object_id": null,
 *	   "created_at": "2020-08-19 21:25:26",
 *	   "updated_at": "2020-08-19 21:25:26",
 *	   "url": "http://127.0.0.1:3333/uploads/test-image-2.jpg"
 *	 }
 *	]
 */
Route.get('/uploads', 'UploadController.index').middleware(['handleParams']);
Route.get('/uploads/:filename', 'UploadController.show');
Route.get('/uploads/:object/:filename', 'UploadController.showWithObject');
