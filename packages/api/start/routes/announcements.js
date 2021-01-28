/* eslint-disable jsdoc/check-tag-names */
/* eslint-disable jsdoc/check-indentation */

const {
	getMiddlewarePermissions,
	getMiddlewareRoles,
	roles,
	permissions,
} = require('../../app/Utils/roles_capabilities');

const Route = use('Route');
/**
 * @api {get} /announcements Lists All Announcements
 * @apiDescription If user is ADMIN lists all status, otherwise only published.
 * @apiGroup Announcements
 * @apiParam (Query Param) {Number[]} [keywords] Filters by keyword id list.
 * @apiParam (Query Param) {Number[]} [targetAudiences] Filters by target audiences id list.
 * @apiParam (Query Param) {String} [title] Filters by title
 * @apiParam (Query Param) {String} [description] Filters by description
 * @apiUse Params
 * @apiParamExample  {json} Request sample:
 * GET /announcements?title=Terceiro
 * @apiSuccess {Object[]} announcements Announcement Collection
 * @apiSuccess {Number} announcements.id Announcement ID.
 * @apiSuccess {Number} announcements.user_id User ID.
 * @apiSuccess {Number} announcements.institution_id Announcement Institution ID.
 * @apiSuccess {String} announcements.announcement_number Announcement Number.
 * @apiSuccess {String} announcements.title Announcement title.
 * @apiSuccess {String} announcements.description Announcement description.
 * @apiSuccess {Number} announcements.financial_resources Announcement Financial Resources.
 * @apiSuccess {String} announcements.start_date Announcement Start Date.
 * @apiSuccess {String} announcements.end_date Announcement End Date.
 * @apiSuccess {String} announcements.comment Comment.
 * @apiSuccess {String} announcements.url Announcement Page Link.
 * @apiSuccess {String} announcements.status Announcement Status.
 * @apiSuccess {Date} announcements.created_at Announcement Register date
 * @apiSuccess {Date} announcements.updated_at Announcement Update date
 * @apiSuccess {Object[]} announcements.terms Terms Collection
 * @apiSuccess {Number} announcements.terms.id Term ID
 * @apiSuccess {String} announcements.terms.taxonomy_id Taxonomy ID
 * @apiSuccess {String} announcements.terms.parent_id Parent ID
 * @apiSuccess {String} announcements.terms.term Term
 * @apiSuccess {String} announcements.terms.slug Term Slug
 * @apiSuccess {Date} announcements.terms.created_at Term Register date
 * @apiSuccess {Date} announcements.terms.updated_at Term Update date
 * @apiSuccess {Object} announcements.terms.pivot Pivot Table
 * @apiSuccess {Number} announcements.terms.pivot.term_id Term ID in Pivot Table
 * @apiSuccess {Number} announcements.terms.pivot.announcement_id Announcement ID Pivot Table
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 *	[
 *	 	{
 *	 	  "id": 2,
 *	 	  "user_id": 18,
 *	 	  "institution_id": 1,
 *	 	  "announcement_number": "21/2020",
 *	 	  "title": "Segundo Edital de invoção da UFERSA",
 *	 	  "description": "Edital de invoção da UFERSA que vai ser realizado em dezembro",
 *	 	  "financial_resources": null,
 *	 	  "start_date": "2020-12-15",
 *	 	  "end_date": "2020-12-28",
 *	 	  "comment": null,
 *	 	  "url": "https://www.ufersa.edu.br/editais/202020",
 *	 	  "status": "published",
 *	 	  "created_at": "2020-12-03 18:49:29",
 *	 	  "updated_at": "2020-12-07 15:27:33",
 *	 	  "terms": [
 *	 	    {
 *	 	      "id": 79,
 *	 	      "term": "Empresários",
 *	 	      "slug": "empresarios",
 *	 	      "parent_id": null,
 *	 	      "taxonomy_id": 6,
 *	 	      "created_at": "2020-11-17 20:52:54",
 *	 	      "updated_at": "2020-11-17 20:52:54",
 *	 	      "pivot": {
 *	 	        "term_id": 79,
 *	 	        "announcement_id": 2
 *	 	      }
 *	 	    },
 *	 	    {
 *	 	      "id": 81,
 *	 	      "term": "Prefeituras",
 *	 	      "slug": "prefeituras",
 *	 	      "parent_id": null,
 *	 	      "taxonomy_id": 6,
 *	 	      "created_at": "2020-11-17 20:52:54",
 *	 	      "updated_at": "2020-11-17 20:52:54",
 *	 	      "pivot": {
 *	 	        "term_id": 81,
 *	 	        "announcement_id": 2
 *	 	      }
 *	 	    },
 *	 	    {
 *	 	      "id": 89,
 *	 	      "term": "rivedijbuzeco",
 *	 	      "slug": "rivedijbuzeco",
 *	 	      "parent_id": null,
 *	 	      "taxonomy_id": 2,
 *	 	      "created_at": "2020-11-17 20:52:54",
 *	 	      "updated_at": "2020-11-17 20:52:54",
 *	 	      "pivot": {
 *	 	        "term_id": 89,
 *	 	        "announcement_id": 2
 *	 	      }
 *	 	    },
 *	 	    {
 *	 	      "id": 92,
 *	 	      "term": "gofmodocilpaena",
 *	 	      "slug": "gofmodocilpaena",
 *	 	      "parent_id": null,
 *	 	      "taxonomy_id": 2,
 *	 	      "created_at": "2020-11-17 20:52:54",
 *	 	      "updated_at": "2020-11-17 20:52:55",
 *	 	      "pivot": {
 *	 	        "term_id": 92,
 *	 	        "announcement_id": 2
 *	 	      }
 *	 	    },
 *	 	    {
 *	 	      "id": 94,
 *	 	      "term": "oniacetigcetpucew",
 *	 	      "slug": "oniacetigcetpucew",
 *	 	      "parent_id": null,
 *	 	      "taxonomy_id": 2,
 *	 	      "created_at": "2020-11-17 20:52:54",
 *	 	      "updated_at": "2020-11-17 20:52:55",
 *	 	      "pivot": {
 *	 	        "term_id": 94,
 *	 	        "announcement_id": 2
 *	 	      }
 *	 	    }
 *	 	  ]
 *	 	},
 *	 	{
 *	 	  "id": 3,
 *	 	  "user_id": 18,
 *	 	  "institution_id": 2,
 *	 	  "announcement_number": "22/2020",
 *	 	  "title": "Terceiro Edital de invoção da UFERSA",
 *	 	  "description": "Terceiro Edital de invoção da UFERSA que vai ser realizado em dezembro",
 *	 	  "financial_resources": null,
 *	 	  "start_date": "2020-12-15",
 *	 	  "end_date": "2020-12-28",
 *	 	  "comment": null,
 *	 	  "url": "https://www.ufersa.edu.br/editais/202020",
 *	 	  "status": "pending",
 *	 	  "created_at": "2020-12-03 18:54:42",
 *	 	  "updated_at": "2020-12-03 20:19:46",
 *	 	  "terms": [
 *	 	    {
 *	 	      "id": 95,
 *	 	      "term": "hojgivugaiduvewko",
 *	 	      "slug": "hojgivugaiduvewko",
 *	 	      "parent_id": null,
 *	 	      "taxonomy_id": 2,
 *	 	      "created_at": "2020-11-17 20:52:54",
 *	 	      "updated_at": "2020-11-17 20:52:55",
 *	 	      "pivot": {
 *	 	        "term_id": 95,
 *	 	        "announcement_id": 3
 *	 	      }
 *	 	    },
 *	 	    {
 *	 	      "id": 79,
 *	 	      "term": "Empresários",
 *	 	      "slug": "empresarios",
 *	 	      "parent_id": null,
 *	 	      "taxonomy_id": 6,
 *	 	      "created_at": "2020-11-17 20:52:54",
 *	 	      "updated_at": "2020-11-17 20:52:54",
 *	 	      "pivot": {
 *	 	        "term_id": 79,
 *	 	        "announcement_id": 3
 *	 	      }
 *	 	    },
 *	 	    {
 *	 	      "id": 80,
 *	 	      "term": "Estudantes",
 *	 	      "slug": "estudantes",
 *	 	      "parent_id": null,
 *	 	      "taxonomy_id": 6,
 *	 	      "created_at": "2020-11-17 20:52:54",
 *	 	      "updated_at": "2020-11-17 20:52:54",
 *	 	      "pivot": {
 *	 	        "term_id": 80,
 *	 	        "announcement_id": 3
 *	 	      }
 *	 	    }
 *	 	  ]
 *	 	}
 *	]
 */
Route.get('announcements', 'AnnouncementController.index').middleware(['handleParams']);
/**
 * @api {get} /announcements/:id Gets an single Announcement
 * @apiDescription If user is ADMIN or Owner gets all status, otherwise only published.
 * @apiGroup Announcements
 * @apiParam (Route Param) {Number} id Mandatory Announcement ID
 * @apiUse Params
 * @apiParamExample  {json} Request sample:
 * GET /announcements/3
 * @apiSuccess {Number} id Announcement ID.
 * @apiSuccess {Number} user_id User ID.
 * @apiSuccess {Number} institution_id Announcement Institution ID.
 * @apiSuccess {String} announcement_number Announcement Number.
 * @apiSuccess {String} title Announcement title.
 * @apiSuccess {String} description Announcement description.
 * @apiSuccess {Number} financial_resources Announcement Financial Resources.
 * @apiSuccess {String} start_date Announcement Start Date.
 * @apiSuccess {String} end_date Announcement End Date.
 * @apiSuccess {String} comment Comment.
 * @apiSuccess {String} url Announcement Page Link.
 * @apiSuccess {String} status Announcement Status.
 * @apiSuccess {Date} created_at Announcement Register date
 * @apiSuccess {Date} updated_at Announcement Update date
 * @apiSuccess {Object[]} terms Terms Collection
 * @apiSuccess {Number} terms.id Term ID
 * @apiSuccess {String} terms.taxonomy_id Taxonomy ID
 * @apiSuccess {String} terms.parent_id Parent ID
 * @apiSuccess {String} terms.term Term
 * @apiSuccess {String} terms.slug Term Slug
 * @apiSuccess {Date} terms.created_at Term Register date
 * @apiSuccess {Date} terms.updated_at Term Update date
 * @apiSuccess {Object} terms.pivot Pivot Table
 * @apiSuccess {Number} terms.pivot.term_id Term ID in Pivot Table
 * @apiSuccess {Number} terms.pivot.announcement_id Announcement ID Pivot Table
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 * {
 *  "id": 3,
 *  "user_id": 18,
 *  "institution_id": 2,
 *  "announcement_number": "22/2020",
 *  "title": "Terceiro Edital de invoção da UFERSA",
 *  "description": "Terceiro Edital de invoção da UFERSA que vai ser realizado em dezembro",
 *  "financial_resources": null,
 *  "start_date": "2020-12-15",
 *  "end_date": "2020-12-28",
 *  "comment": null,
 *  "url": "https://www.ufersa.edu.br/editais/202020",
 *  "status": "pending",
 *  "created_at": "2020-12-03 18:54:42",
 *  "updated_at": "2020-12-03 20:19:46",
 *  "terms": [
 *    {
 *      "id": 95,
 *      "term": "hojgivugaiduvewko",
 *      "slug": "hojgivugaiduvewko",
 *      "parent_id": null,
 *      "taxonomy_id": 2,
 *      "created_at": "2020-11-17 20:52:54",
 *      "updated_at": "2020-11-17 20:52:55",
 *      "pivot": {
 *        "term_id": 95,
 *        "announcement_id": 3
 *      }
 *    },
 *    {
 *      "id": 79,
 *      "term": "Empresários",
 *      "slug": "empresarios",
 *      "parent_id": null,
 *      "taxonomy_id": 6,
 *      "created_at": "2020-11-17 20:52:54",
 *      "updated_at": "2020-11-17 20:52:54",
 *      "pivot": {
 *        "term_id": 79,
 *        "announcement_id": 3
 *      }
 *    },
 *    {
 *      "id": 80,
 *      "term": "Estudantes",
 *      "slug": "estudantes",
 *      "parent_id": null,
 *      "taxonomy_id": 6,
 *      "created_at": "2020-11-17 20:52:54",
 *      "updated_at": "2020-11-17 20:52:54",
 *      "pivot": {
 *        "term_id": 80,
 *        "announcement_id": 3
 *      }
 *    }
 *  ]
 * }
 * @apiErrorExample {json} Resource Announcement was not found
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "RESOURCE_NOT_FOUND",
 *   			"message":"The resource Announcement was not found"
 * 			}
 *		}
 */
Route.get('announcements/:id', 'AnnouncementController.show').middleware(['handleParams']);
/**
 * @api {post} /announcements Creates a new Announcement
 * @apiDescription User needs complete your profile to create an Announcement
 * @apiGroup Announcements
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParam {Number} institution_id Mandatory Institution ID
 * @apiParam {String} announcement_number Mandatory Announcement Number
 * @apiParam {String} title Mandatory Announcement title
 * @apiParam {String} description Mandatory Announcement description
 * @apiParam {Number[]|String[]} targetAudiences Target Audiences Array, can be ID or slug
 * @apiParam {Number[]|String[]} keywords Keyword Array, can be ID or slug
 * @apiParam {Number} [financial_resources] Optional Announcement financial resources
 * @apiParam {String} start_date Mandatory Announcement Start Date
 * @apiParam {String} end_date Mandatory Announcement End Date
 * @apiParam {String} [comment] Optional Announcement Comment
 * @apiParam {String} url Mandatory Announcement Link
 * @apiSuccess {Number} id Announcement ID.
 * @apiSuccess {Number} user_id User ID.
 * @apiSuccess {Number} institution_id Announcement Institution ID.
 * @apiSuccess {String} announcement_number Announcement Number.
 * @apiSuccess {String} title Announcement title.
 * @apiSuccess {String} description Announcement description.
 * @apiSuccess {Number} financial_resources Announcement Financial Resources.
 * @apiSuccess {String} start_date Announcement Start Date.
 * @apiSuccess {String} end_date Announcement End Date.
 * @apiSuccess {String} comment Comment.
 * @apiSuccess {String} url Announcement Page Link.
 * @apiSuccess {String} status Announcement Status.
 * @apiSuccess {Date} created_at Announcement Register date
 * @apiSuccess {Date} updated_at Announcement Update date
 * @apiSuccess {Object} institution Announcement Institution
 * @apiSuccess {Number} institution.id Institution id
 * @apiSuccess {String} institution.user_id Institution owner id
 * @apiSuccess {String} institution.name Institution name
 * @apiSuccess {String} institution.initials Institution initials
 * @apiSuccess {String} institution.cnpj Institution CNPJ
 * @apiSuccess {String} institution.address Institution address
 * @apiSuccess {String} institution.district Institution district
 * @apiSuccess {String} institution.zipcode Institution zipcode
 * @apiSuccess {String} institution.city Institution city
 * @apiSuccess {String} institution.state Institution state
 * @apiSuccess {String} institution.lat Institution latitude
 * @apiSuccess {String} institution.lng Institution longitude
 * @apiSuccess {Date} institution.created_at Institution register date
 * @apiSuccess {Date} institution.updated_at Institution update date
 * @apiSuccess {Object[]} terms Terms Collection
 * @apiSuccess {Number} terms.id Term ID
 * @apiSuccess {String} terms.taxonomy_id Taxonomy ID
 * @apiSuccess {String} terms.parent_id Parent ID
 * @apiSuccess {String} terms.term Term
 * @apiSuccess {String} terms.slug Term Slug
 * @apiSuccess {Date} terms.created_at Term Register date
 * @apiSuccess {Date} terms.updated_at Term Update date
 * @apiSuccess {Object} terms.pivot Pivot Table
 * @apiSuccess {Number} terms.pivot.term_id Term ID in Pivot Table
 * @apiSuccess {Number} terms.pivot.announcement_id Announcement ID Pivot Table
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 *	{
 *	 "id": 4,
 *	 "user_id": 18,
 *	 "institution_id": 1,
 *	 "announcement_number": "31/2020",
 *	 "title": "Primeiro Edital de invoção da plataforma sabiá",
 *	 "description": "Primeiro Edital de invoção da plataforma sabiá que vai ser realizado em dezembro",
 *	 "financial_resources": null,
 *	 "start_date": "2020-12-01",
 *	 "end_date": "2020-12-15",
 *	 "comment": null,
 *	 "url": "https://www.ufersa.edu.br/editais/312020",
 *	 "status": "pending",
 *	 "created_at": "2020-12-08 16:28:22",
 *	 "updated_at": "2020-12-08 16:28:22",
 *	 "terms": [
 *	   {
 *	     "id": 79,
 *	     "term": "Empresários",
 *	     "slug": "empresarios",
 *	     "parent_id": null,
 *	     "taxonomy_id": 6,
 *	     "created_at": "2020-11-17 20:52:54",
 *	     "updated_at": "2020-11-17 20:52:54",
 *	     "pivot": {
 *	       "term_id": 79,
 *	       "announcement_id": 4
 *	     }
 *	   },
 *	   {
 *	     "id": 81,
 *	     "term": "Prefeituras",
 *	     "slug": "prefeituras",
 *	     "parent_id": null,
 *	     "taxonomy_id": 6,
 *	     "created_at": "2020-11-17 20:52:54",
 *	     "updated_at": "2020-11-17 20:52:54",
 *	     "pivot": {
 *	       "term_id": 81,
 *	       "announcement_id": 4
 *	     }
 *	   },
 *	   {
 *	     "id": 89,
 *	     "term": "rivedijbuzeco",
 *	     "slug": "rivedijbuzeco",
 *	     "parent_id": null,
 *	     "taxonomy_id": 2,
 *	     "created_at": "2020-11-17 20:52:54",
 *	     "updated_at": "2020-11-17 20:52:54",
 *	     "pivot": {
 *	       "term_id": 89,
 *	       "announcement_id": 4
 *	     }
 *	   },
 *	   {
 *	     "id": 92,
 *	     "term": "gofmodocilpaena",
 *	     "slug": "gofmodocilpaena",
 *	     "parent_id": null,
 *	     "taxonomy_id": 2,
 *	     "created_at": "2020-11-17 20:52:54",
 *	     "updated_at": "2020-11-17 20:52:55",
 *	     "pivot": {
 *	       "term_id": 92,
 *	       "announcement_id": 4
 *	     }
 *	   },
 *	   {
 *	     "id": 94,
 *	     "term": "oniacetigcetpucew",
 *	     "slug": "oniacetigcetpucew",
 *	     "parent_id": null,
 *	     "taxonomy_id": 2,
 *	     "created_at": "2020-11-17 20:52:54",
 *	     "updated_at": "2020-11-17 20:52:55",
 *	     "pivot": {
 *	       "term_id": 94,
 *	       "announcement_id": 4
 *	     }
 *	   }
 *	 ],
 *	 "institution": {
 *	   "id": 1,
 *	   "user_id": 18,
 *	   "name": "UFERSA",
 *	   "initials": "UFERSA",
 *	   "cnpj": "24.529.265/0001-40",
 *	   "address": "Av .Francisco Mota, 572",
 *	   "district": "Costa e Silva",
 *	   "zipcode": "59.625-900",
 *	   "city": "Mossoró",
 *	   "state": "RN",
 *	   "lat": "-5.2041563",
 *	   "lng": "-37.3245685",
 *	   "created_at": "2020-12-03 21:38:56",
 *	   "updated_at": "2020-12-03 21:38:56"
 *	 }
 *  }
 * @apiUse AuthError
 * @apiError (Forbidden 403) {Object} error Error object
 * @apiError (Forbidden 403) {String} error.error_code Error code
 * @apiError (Forbidden 403) {String} error.message Error message
 * @apiErrorExample {json} Uncompleted Registration
 *    HTTP/1.1 403 Forbidden
 *		{
 * 			"error": {
 *   			"error_code": "REGISTRATION_UNCOMPLETED",
 *   			"message":"You need to complete your registration to access this resource"
 * 			}
 *		}
 * @apiError (Bad Request 400) {Object} error Error object
 * @apiError (Bad Request 400) {String} error.error_code Error code
 * @apiError (Bad Request 400) {String} error.message Error message
 * @apiErrorExample {json} Validation Error: institution_id Required
 *    HTTP/1.1 400 Bad Request
 *		{
 *    		"error": {
 *        		"error_code": "VALIDATION_ERROR",
 *        		"message": [
 *            		{
 *                		"message": "institution_id is required.",
 *                		"field": "institution_id",
 *                		"validation": "required"
 *            		}
 *        		]
 *   		}
 *		}
 * @apiErrorExample {json} Validation Error: institution_id should exist in institutions
 *    HTTP/1.1 400 Bad Request
 *		{
 *    		"error": {
 *        		"error_code": "VALIDATION_ERROR",
 *        		"message": [
 *            		{
 *                		"message": "The institution_id should exist in institutions.",
 *                		"field": "institution_id",
 *                		"validation": "exists"
 *            		}
 *        		]
 *   		}
 *		}
 * @apiErrorExample {json} Validation Error: announcement_number Required
 *    HTTP/1.1 400 Bad Request
 *		{
 *    		"error": {
 *        		"error_code": "VALIDATION_ERROR",
 *        		"message": [
 *            		{
 *                		"message": "announcement_number is required.",
 *                		"field": "announcement_number",
 *                		"validation": "required"
 *            		}
 *        		]
 *   		}
 *		}
 * @apiErrorExample {json} Validation Error: title Required
 *    HTTP/1.1 400 Bad Request
 *		{
 *    		"error": {
 *        		"error_code": "VALIDATION_ERROR",
 *        		"message": [
 *            		{
 *                		"message": "title is required.",
 *                		"field": "title",
 *                		"validation": "required"
 *            		}
 *        		]
 *   		}
 *		}
 * @apiErrorExample {json} Validation Error: description Required
 *    HTTP/1.1 400 Bad Request
 *		{
 *    		"error": {
 *        		"error_code": "VALIDATION_ERROR",
 *        		"message": [
 *            		{
 *                		"message": "description is required.",
 *                		"field": "description",
 *                		"validation": "required"
 *            		}
 *        		]
 *   		}
 *		}
 * @apiErrorExample {json} Validation Error: targetAudiences Required
 *    HTTP/1.1 400 Bad Request
 *		{
 *    		"error": {
 *        		"error_code": "VALIDATION_ERROR",
 *        		"message": [
 *            		{
 *                		"message": "targetAudiences is required.",
 *                		"field": "targetAudiences",
 *                		"validation": "required"
 *            		}
 *        		]
 *   		}
 *		}
 * @apiErrorExample {json} Validation Error: keywords Required
 *    HTTP/1.1 400 Bad Request
 *		{
 *    		"error": {
 *        		"error_code": "VALIDATION_ERROR",
 *        		"message": [
 *            		{
 *                		"message": "keywords is required.",
 *                		"field": "keywords",
 *                		"validation": "required"
 *            		}
 *        		]
 *   		}
 *		}
 * @apiErrorExample {json} Validation Error: start_date Required
 *    HTTP/1.1 400 Bad Request
 *		{
 *    		"error": {
 *        		"error_code": "VALIDATION_ERROR",
 *        		"message": [
 *            		{
 *                		"message": "start_date is required.",
 *                		"field": "start_date",
 *                		"validation": "required"
 *            		}
 *        		]
 *   		}
 *		}
 * @apiErrorExample {json} Validation Error: end_date Required
 *    HTTP/1.1 400 Bad Request
 *		{
 *    		"error": {
 *        		"error_code": "VALIDATION_ERROR",
 *        		"message": [
 *            		{
 *                		"message": "end_date is required.",
 *                		"field": "end_date",
 *                		"validation": "required"
 *            		}
 *        		]
 *   		}
 *		}
 * @apiErrorExample {json} Validation Error: url Required
 *    HTTP/1.1 400 Bad Request
 *		{
 *    		"error": {
 *        		"error_code": "VALIDATION_ERROR",
 *        		"message": [
 *            		{
 *                		"message": "url is required.",
 *                		"field": "url",
 *                		"validation": "required"
 *            		}
 *        		]
 *   		}
 *		}
 * @apiErrorExample {json} Validation Error: url should be a valid URL
 *    HTTP/1.1 400 Bad Request
 *		{
 *    		"error": {
 *        		"error_code": "VALIDATION_ERROR",
 *        		"message": [
 *            		{
 *                		"message": "The url should be a valid URL.",
 *                		"field": "url",
 *                		"validation": "url"
 *            		}
 *        		]
 *   		}
 *		}
 * @apiError (Forbidden 403) {Object} error Error object
 * @apiError (Forbidden 403) {String} error.error_code Error code
 * @apiError (Forbidden 403) {String} error.message Error message
 * @apiErrorExample {json} Registration Uncompleted
 *    HTTP/1.1 403 Forbidden
 *		{
 * 			"error": {
 *   			"error_code": "REGISTRATION_UNCOMPLETED",
 *   			"message":"You need to complete your registration to access this resource. Uncompleted Fields: {Uncompleted fields}"
 * 			}
 *		}
 */
Route.post('announcements', 'AnnouncementController.store')
	.middleware(['auth', 'registrationCompleted:check_personal_data'])
	.validator('StoreAnnouncement');
/**
 * @api {put} /announcements/:id Updates an Announcement
 * @apiDescription Only Announcement owner can update it
 * @apiGroup Announcements
 * @apiPermission UPDATE_ANNOUNCEMENT
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParam (Route Param) {Number} id Mandatory Announcement ID
 * @apiParam {Number} [institution_id] Optional Institution ID
 * @apiParam {String} [announcement_number] Optional Announcement Number
 * @apiParam {String} [title] Optional Announcement title
 * @apiParam {String} [description] Optional Announcement description
 * @apiParam {Number[]|String[]} [targetAudiences] Target Audiences Array, can be ID or slug
 * @apiParam {Number[]|String[]} [keywords] Keyword Array, can be ID or slug
 * @apiParam {Number} [financial_resources] Optional Announcement financial resources
 * @apiParam {String} [start_date] Optional Announcement Start Date
 * @apiParam {String} [end_date] Optional Announcement End Date
 * @apiParam {String} [comment] Optional Announcement Comment
 * @apiParam {String} [url] Optional Announcement Link
 * @apiSuccess {Number} id Announcement ID.
 * @apiSuccess {Number} user_id User ID.
 * @apiSuccess {Number} institution_id Announcement Institution ID.
 * @apiSuccess {String} announcement_number Announcement Number.
 * @apiSuccess {String} title Announcement title.
 * @apiSuccess {String} description Announcement description.
 * @apiSuccess {Number} financial_resources Announcement Financial Resources.
 * @apiSuccess {String} start_date Announcement Start Date.
 * @apiSuccess {String} end_date Announcement End Date.
 * @apiSuccess {String} comment Comment.
 * @apiSuccess {String} url Announcement Page Link.
 * @apiSuccess {String} status Announcement Status.
 * @apiSuccess {Date} created_at Announcement Register date
 * @apiSuccess {Date} updated_at Announcement Update date
 * @apiSuccess {Object} institution Announcement Institution
 * @apiSuccess {Number} institution.id Institution id
 * @apiSuccess {String} institution.user_id Institution owner id
 * @apiSuccess {String} institution.name Institution name
 * @apiSuccess {String} institution.initials Institution initials
 * @apiSuccess {String} institution.cnpj Institution CNPJ
 * @apiSuccess {String} institution.address Institution address
 * @apiSuccess {String} institution.district Institution district
 * @apiSuccess {String} institution.zipcode Institution zipcode
 * @apiSuccess {String} institution.city Institution city
 * @apiSuccess {String} institution.state Institution state
 * @apiSuccess {String} institution.lat Institution latitude
 * @apiSuccess {String} institution.lng Institution longitude
 * @apiSuccess {Date} institution.created_at Institution register date
 * @apiSuccess {Date} institution.updated_at Institution update date
 * @apiSuccess {Object[]} terms Terms Collection
 * @apiSuccess {Number} terms.id Term ID
 * @apiSuccess {String} terms.taxonomy_id Taxonomy ID
 * @apiSuccess {String} terms.parent_id Parent ID
 * @apiSuccess {String} terms.term Term
 * @apiSuccess {String} terms.slug Term Slug
 * @apiSuccess {Date} terms.created_at Term Register date
 * @apiSuccess {Date} terms.updated_at Term Update date
 * @apiSuccess {Object} terms.pivot Pivot Table
 * @apiSuccess {Number} terms.pivot.term_id Term ID in Pivot Table
 * @apiSuccess {Number} terms.pivot.announcement_id Announcement ID Pivot Table
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 *	{
 *	 "id": 3,
 *	 "user_id": 18,
 *	 "institution_id": 2,
 *	 "announcement_number": "22/2020",
 *	 "title": "Titulo do Edital atualizado.",
 *	 "description": "Terceiro Edital de invoção da UFERSA que vai ser realizado em dezembro",
 *	 "financial_resources": null,
 *	 "start_date": "2020-12-15",
 *	 "end_date": "2020-12-28",
 *	 "comment": null,
 *	 "url": "https://www.ufersa.edu.br/editais/202020",
 *	 "status": "pending",
 *	 "created_at": "2020-12-03 18:54:42",
 *	 "updated_at": "2020-12-03 20:19:46",
 *	 "institution": {
 *	   "id": 2,
 *	   "user_id": 15,
 *	   "name": "UFPB",
 *	   "initials": "UFPB",
 *	   "cnpj": "111111",
 *	   "address": "Rua Paraiba",
 *	   "district": "Alto de sao",
 *	   "zipcode": "56987999",
 *	   "city": "Joao Pessoa",
 *	   "state": "PB",
 *	   "lat": "12344",
 *	   "lng": "123456",
 *	   "created_at": "2020-12-03 23:06:39",
 *	   "updated_at": "2020-12-03 23:06:39"
 *	 },
 *	 "terms": [
 *	   {
 *	     "id": 95,
 *	     "term": "hojgivugaiduvewko",
 *	     "slug": "hojgivugaiduvewko",
 *	     "parent_id": null,
 *	     "taxonomy_id": 2,
 *	     "created_at": "2020-11-17 20:52:54",
 *	     "updated_at": "2020-11-17 20:52:55",
 *	     "pivot": {
 *	       "term_id": 95,
 *	       "announcement_id": 3
 *	     }
 *	   },
 *	   {
 *	     "id": 79,
 *	     "term": "Empresários",
 *	     "slug": "empresarios",
 *	     "parent_id": null,
 *	     "taxonomy_id": 6,
 *	     "created_at": "2020-11-17 20:52:54",
 *	     "updated_at": "2020-11-17 20:52:54",
 *	     "pivot": {
 *	       "term_id": 79,
 *	       "announcement_id": 3
 *	     }
 *	   },
 *	   {
 *	     "id": 80,
 *	     "term": "Estudantes",
 *	     "slug": "estudantes",
 *	     "parent_id": null,
 *	     "taxonomy_id": 6,
 *	     "created_at": "2020-11-17 20:52:54",
 *	     "updated_at": "2020-11-17 20:52:54",
 *	     "pivot": {
 *	       "term_id": 80,
 *	       "announcement_id": 3
 *	     }
 *	   }
 *	 ]
 * }
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
 * @apiError (Bad Request 400) {Object} error Error object
 * @apiError (Bad Request 400) {String} error.error_code Error code
 * @apiError (Bad Request 400) {String} error.message Error message
 * @apiErrorExample {json} Resource Announcement was not found
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "RESOURCE_NOT_FOUND",
 *   			"message":"The resource Announcement was not found"
 * 			}
 *		}
 */
Route.put('announcements/:id', 'AnnouncementController.update').middleware([
	'auth',
	getMiddlewarePermissions([permissions.UPDATE_ANNOUNCEMENT, permissions.UPDATE_ANNOUNCEMENTS]),
]);
/**
 * @api {put} /announcements/:id/update-status Updates Announcement Status
 * @apiDescription Only ADMIN can update the Announcement Status
 * @apiGroup Announcements
 * @apiPermission ADMIN
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParam (Route Param) {Number} id Mandatory Announcement ID
 * @apiParam {String="pending","published"} status Mandatory status
 * @apiSuccess {Number} id Announcement ID.
 * @apiSuccess {Number} user_id User ID.
 * @apiSuccess {Number} institution_id Announcement Institution ID.
 * @apiSuccess {String} announcement_number Announcement Number.
 * @apiSuccess {String} title Announcement title.
 * @apiSuccess {String} description Announcement description.
 * @apiSuccess {Number} financial_resources Announcement Financial Resources.
 * @apiSuccess {String} start_date Announcement Start Date.
 * @apiSuccess {String} end_date Announcement End Date.
 * @apiSuccess {String} comment Comment.
 * @apiSuccess {String} url Announcement Page Link.
 * @apiSuccess {String} status Announcement Status.
 * @apiSuccess {Date} created_at Announcement Register date
 * @apiSuccess {Date} updated_at Announcement Update date
 * @apiSuccess {Object} institution Announcement Institution
 * @apiSuccess {Number} institution.id Institution id
 * @apiSuccess {String} institution.user_id Institution owner id
 * @apiSuccess {String} institution.name Institution name
 * @apiSuccess {String} institution.initials Institution initials
 * @apiSuccess {String} institution.cnpj Institution CNPJ
 * @apiSuccess {String} institution.address Institution address
 * @apiSuccess {String} institution.district Institution district
 * @apiSuccess {String} institution.zipcode Institution zipcode
 * @apiSuccess {String} institution.city Institution city
 * @apiSuccess {String} institution.state Institution state
 * @apiSuccess {String} institution.lat Institution latitude
 * @apiSuccess {String} institution.lng Institution longitude
 * @apiSuccess {Date} institution.created_at Institution register date
 * @apiSuccess {Date} institution.updated_at Institution update date
 * @apiSuccess {Object[]} terms Terms Collection
 * @apiSuccess {Number} terms.id Term ID
 * @apiSuccess {String} terms.taxonomy_id Taxonomy ID
 * @apiSuccess {String} terms.parent_id Parent ID
 * @apiSuccess {String} terms.term Term
 * @apiSuccess {String} terms.slug Term Slug
 * @apiSuccess {Date} terms.created_at Term Register date
 * @apiSuccess {Date} terms.updated_at Term Update date
 * @apiSuccess {Object} terms.pivot Pivot Table
 * @apiSuccess {Number} terms.pivot.term_id Term ID in Pivot Table
 * @apiSuccess {Number} terms.pivot.announcement_id Announcement ID Pivot Table
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 *	{
 *	 "id": 3,
 *	 "user_id": 18,
 *	 "institution_id": 2,
 *	 "announcement_number": "22/2020",
 *	 "title": "Titulo do Edital atualizado.",
 *	 "description": "Terceiro Edital de invoção da UFERSA que vai ser realizado em dezembro",
 *	 "financial_resources": null,
 *	 "start_date": "2020-12-15",
 *	 "end_date": "2020-12-28",
 *	 "comment": null,
 *	 "url": "https://www.ufersa.edu.br/editais/202020",
 *	 "status": "published",
 *	 "created_at": "2020-12-03 18:54:42",
 *	 "updated_at": "2020-12-03 20:19:46",
 *	 "institution": {
 *	   "id": 2,
 *	   "user_id": 15,
 *	   "name": "UFPB",
 *	   "initials": "UFPB",
 *	   "cnpj": "111111",
 *	   "address": "Rua Paraiba",
 *	   "district": "Alto de sao",
 *	   "zipcode": "56987999",
 *	   "city": "Joao Pessoa",
 *	   "state": "PB",
 *	   "lat": "12344",
 *	   "lng": "123456",
 *	   "created_at": "2020-12-03 23:06:39",
 *	   "updated_at": "2020-12-03 23:06:39"
 *	 },
 *	 "terms": [
 *	   {
 *	     "id": 95,
 *	     "term": "hojgivugaiduvewko",
 *	     "slug": "hojgivugaiduvewko",
 *	     "parent_id": null,
 *	     "taxonomy_id": 2,
 *	     "created_at": "2020-11-17 20:52:54",
 *	     "updated_at": "2020-11-17 20:52:55",
 *	     "pivot": {
 *	       "term_id": 95,
 *	       "announcement_id": 3
 *	     }
 *	   },
 *	   {
 *	     "id": 79,
 *	     "term": "Empresários",
 *	     "slug": "empresarios",
 *	     "parent_id": null,
 *	     "taxonomy_id": 6,
 *	     "created_at": "2020-11-17 20:52:54",
 *	     "updated_at": "2020-11-17 20:52:54",
 *	     "pivot": {
 *	       "term_id": 79,
 *	       "announcement_id": 3
 *	     }
 *	   },
 *	   {
 *	     "id": 80,
 *	     "term": "Estudantes",
 *	     "slug": "estudantes",
 *	     "parent_id": null,
 *	     "taxonomy_id": 6,
 *	     "created_at": "2020-11-17 20:52:54",
 *	     "updated_at": "2020-11-17 20:52:54",
 *	     "pivot": {
 *	       "term_id": 80,
 *	       "announcement_id": 3
 *	     }
 *	   }
 *	 ]
 * }
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
 * @apiError (Bad Request 400) {Object} error Error object
 * @apiError (Bad Request 400) {String} error.error_code Error code
 * @apiError (Bad Request 400) {String} error.message Error message
 * @apiErrorExample {json} Resource Announcement was not found
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "RESOURCE_NOT_FOUND",
 *   			"message":"The resource Announcement was not found"
 * 			}
 *		}
 * @apiErrorExample {json} Validation Error: status Required
 *    HTTP/1.1 400 Bad Request
 *		{
 *    		"error": {
 *        		"error_code": "VALIDATION_ERROR",
 *        		"message": [
 *            		{
 *                		"message": "status is required.",
 *                		"field": "status",
 *                		"validation": "required"
 *            		}
 *        		]
 *   		}
 *		}
 * @apiErrorExample {json} Validation Error: status should fall within defined values
 *    HTTP/1.1 400 Bad Request
 *		{
 *    		"error": {
 *        		"error_code": "VALIDATION_ERROR",
 *        		"message": [
 *            		{
 *                		"message": "The status should fall within defined values of (pending,published).",
 *                		"field": "status",
 *                		"validation": "in"
 *            		}
 *        		]
 *   		}
 *		}
 */
Route.put('announcements/:id/update-status', 'AnnouncementController.updateStatus')
	.middleware(['auth', getMiddlewareRoles([roles.ADMIN])])
	.validator('UpdateAnnouncementStatus');
/**
 * @api {delete} /announcements/:id Deletes an Announcement
 * @apiDescription Only Announcement owner can delete it.
 * @apiGroup Announcements
 * @apiPermission DELETE_ANNOUNCEMENT
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParam (Route Param) {Number} id Mandatory Announcement ID.
 * @apiParamExample  {json} Request sample:
 * DELETE /announcements/1
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
 * @apiErrorExample {json} Resource Announcement was not found
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "RESOURCE_NOT_FOUND",
 *   			"message":"The resource Announcement was not found"
 * 			}
 *		}
 */
Route.delete('announcements/:id', 'AnnouncementController.destroy').middleware([
	'auth',
	getMiddlewarePermissions([permissions.DELETE_ANNOUNCEMENT, permissions.DELETE_ANNOUNCEMENTS]),
]);
