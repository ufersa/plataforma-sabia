/* eslint-disable jsdoc/check-tag-names */
/* eslint-disable jsdoc/check-indentation */
/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

/** Contact routes */
/**
 * @api {get} /blog/posts Get blog posts
 * @apiGroup Blog
 * @apiParam {Number} limit Posts limit
 * @apiParamExample  {json} Request sample:
 * {
 *   "limit": 3
 * }
 * @apiSuccess {String} id Post ID
 * @apiSuccess {String} title Post title
 * @apiSuccess {String} subtitle Post subitle
 * @apiSuccess {String} published_at Post publication date
 * @apiSuccess {String} url Post url
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 * {
 *   "id": "1",
 *   "title": "Post title",
 *   "subtitle": "Post subtitle",
 *   "published_at": "2021-01-01T00:00:00.000Z",
 *   "slug": "post-slug"
 * }
 * @apiErrorExample {json} Validation Error
 * HTTP/1.1 400 Bad Request
 * {
 *   "error": {
 *     "error_code": "VALIDATION_ERROR",
 *     "message": [
 *       {
 *         "message": "The limit should be an NUMBER.",
 *         "field": "limit",
 *         "validation": "number"
 *       }
 *     ]
 *   }
 * }
 */
Route.get('/blog/posts', 'BlogController.getPosts').validator('GetBlogPosts');
