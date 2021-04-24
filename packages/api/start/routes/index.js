/* eslint-disable jsdoc/check-tag-names */
/* eslint-disable jsdoc/check-indentation */

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/**
 * @apiDefine ADMIN User access only
 * Only User with role ADMIN can access this route
 */

/**
 * @apiDefine Params
 * @apiParam (Query Param) {Number} [page] The page number for offset.
 * @apiParam (Query Param) {Number} [perPage] Number rows for page.
 * @apiParam (Query Param) {String="ASC","DESC"} [order] Sorts the records in ascending or descending order.
 * @apiParam (Query Param) {String} [orderBy] Sorts the records by one column.
 * @apiParam (Query Param) embed Activate Embedding.
 * @apiParam (Query Param) {Number[]} [ids] Filter by Id Array.
 * @apiParam (Query Param) {Number[]} [notIn] Exclude Ids from query.
 */

/**
 * @apiDefine AuthError
 * @apiErrorExample {json} Unauthorized
 *    HTTP/1.1 401 Unauthorized
 */

const Route = use('Route');

require('./auth');
require('./roles');
require('./permissions');
require('./technologies');
require('./technologyReviews');
require('./taxonomies');
require('./terms');
require('./users');
require('./bookmarks');
require('./technologyCosts');
require('./uploads');
require('./reviewers');
require('./disclaimers');
require('./institutions');
require('./contact');
require('./orders');
require('./chat');
require('./technologyQuestions');
require('./knowledgeAreas');
require('./announcements');
require('./messages');
require('./ideas');
require('./services');
require('./researchers');
require('./deviceTokens');
require('./city');

Route.get('/', 'AppController.index');
