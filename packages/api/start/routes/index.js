/* eslint-disable jsdoc/check-tag-names */
/* eslint-disable jsdoc/check-indentation */

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

require('./announcements');
require('./auth');
require('./bookmarks');
require('./chat');
require('./contact');
require('./deviceTokens');
require('./disclaimers');
require('./ideas');
require('./institutions');
require('./knowledgeAreas');
require('./messages');
require('./orders');
require('./permissions');
require('./researchers');
require('./reviewers');
require('./roles');
require('./services');
require('./states');
require('./taxonomies');
require('./technologies');
require('./technologyCosts');
require('./technologyQuestions');
require('./technologyReviews');
require('./terms');
require('./uploads');
require('./users');

Route.get('/', 'AppController.index');
