/* eslint-disable jsdoc/check-tag-names */
/* eslint-disable jsdoc/check-indentation */

// const { getMiddlewarePermissions, permissions } = require('../../app/Utils/roles_capabilities');

const Route = use('Route');

Route.post('technologies/:id/questions', 'TechnologyQuestionController.store')
	.middleware(['auth'])
	.validator('MakeQuestion');
