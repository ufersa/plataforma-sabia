/* eslint-disable jsdoc/check-tag-names */
/* eslint-disable jsdoc/check-indentation */

const { getMiddlewarePermissions, permissions } = require('../../app/Utils/roles_capabilities');

const Route = use('Route');

Route.get(
	'technologies/:id/questions',
	'TechnologyQuestionController.showTechnologyQuestions',
).middleware(['handleParams']);

Route.get('questions', 'TechnologyQuestionController.index').middleware(['auth', 'handleParams']);

Route.post('technologies/:id/questions', 'TechnologyQuestionController.store')
	.middleware(['auth'])
	.validator('MakeQuestion');

Route.put('questions/:id/answer', 'TechnologyQuestionController.answer')
	.middleware(['auth', getMiddlewarePermissions([permissions.ANSWER_TECHNOLOGY_QUESTION])])
	.validator('AnswerQuestion');
