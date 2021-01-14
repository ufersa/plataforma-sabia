/* eslint-disable jsdoc/check-tag-names */
/* eslint-disable jsdoc/check-indentation */

const Route = use('Route');

/**
 * @api {get} /researchers Searches in Researcher database
 * @apiGroup Researchers
 * @apiParam (Query Param) {String} [name] Filters by first name or last name.
 * @apiParam (Query Param) {String} [institution] Filters by institution name.
 * @apiParam (Query Param) {String} [keyword] Filters by related technology keywords.
 * @apiParam (Query Param) {String[]} [area] Filters by knowledge area.
 * @apiUse Params
 * @apiParamExample  {json} Request sample:
 * GET /researchers?name=Sabia&institution=ufersa&keyword=terra&area=10603026,10604014
 * @apiSuccess {Object[]} researchers Researcher Collection
 * @apiSuccess {String} researchers.full_name Researcher Full Name
 * @apiSuccess {String} researchers.institituion Researcher Institution Name
 * @apiSuccess {Object[]} researchers.areas Researcher Knowledge Areas
 * @apiSuccess {Number} researchers.areas.knowledge_area_id Knowledge Area ID
 * @apiSuccess {Number} researchers.areas.level Knowledge Area Level
 * @apiSuccess {String} researchers.areas.name Knowledge Area Name
 * @apiSuccess {Number} researchers.areas.great_area_id Knowledge Great Area ID
 * @apiSuccess {Number} researchers.areas.area_id Knowledge Area ID
 * @apiSuccess {Number} researchers.areas.sub_area_id Knowledge Sub Area ID
 * @apiSuccess {Number} researchers.areas.speciality_id Knowledge Speciality ID
 * @apiSuccess {Object} researchers.areas.pivot Pivot Relashionship
 * @apiSuccess {Number} researchers.areas.pivot.knowledge_area_id Pivot Relashionship Knowledge Area ID
 * @apiSuccess {Number} researchers.areas.pivot.user_id Pivot Relashionship User ID
 * @apiSuccess {Object[]} researchers.keywords Researcher Technologies Keywords
 * @apiSuccess {Number} researchers.keywords.id Term ID
 * @apiSuccess {String} researchers.keywords.term Term
 * @apiSuccess {String} researchers.keywords.slug Term Slug
 * @apiSuccess {Number} researchers.keywords.parent_id Term Parent ID
 * @apiSuccess {Number} researchers.keywords.taxonomy_id Term Taxonomy ID
 * @apiSuccess {Date} researchers.keywords.created_at Term Register date
 * @apiSuccess {Date} researchers.keywords.updated_at Term Update date
 * @apiSuccess {Object} researchers.keywords.pivot Term Technology Relashionship
 * @apiSuccess {Number} researchers.keywords.pivot.term_id Term ID
 * @apiSuccess {Number} researchers.keywords.pivot.technology_id Technology ID
 * @apiSuccess {String} researchers.lattes_link Researcher Lattes link
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 *  [
 *   {
 *     "full_name": "Alexandre Pontes",
 *     "institution": "XO Communications Inc",
 *     "areas": [
 *       {
 *         "knowledge_area_id": 10604014,
 *         "level": 4,
 *         "name": "Separação",
 *         "great_area_id": 10000003,
 *         "area_id": 10600000,
 *         "sub_area_id": 10604006,
 *         "speciality_id": 10604014,
 *         "pivot": {
 *           "knowledge_area_id": 10604014,
 *           "user_id": 28
 *         }
 *       }
 *     ],
 *     "keywords": [
 *       {
 *         "id": 104,
 *         "term": "agua",
 *         "slug": "zihmacgevnerarade",
 *         "parent_id": null,
 *         "taxonomy_id": 2,
 *         "created_at": "2020-12-19 21:26:41",
 *         "updated_at": "2020-12-19 21:26:41",
 *         "pivot": {
 *           "term_id": 104,
 *           "technology_id": 2
 *         }
 *       },
 *       {
 *         "id": 102,
 *         "term": "key1",
 *         "slug": "dojdeohewofisuf",
 *         "parent_id": null,
 *         "taxonomy_id": 2,
 *         "created_at": "2020-12-19 21:26:41",
 *         "updated_at": "2020-12-19 21:26:41",
 *         "pivot": {
 *           "term_id": 102,
 *           "technology_id": 2
 *         }
 *       },
 *       {
 *         "id": 103,
 *         "term": "solo",
 *         "slug": "riddizmirahaimnil",
 *         "parent_id": null,
 *         "taxonomy_id": 2,
 *         "created_at": "2020-12-19 21:26:41",
 *         "updated_at": "2020-12-19 21:26:41",
 *         "pivot": {
 *           "term_id": 103,
 *           "technology_id": 2
 *         }
 *       },
 *       {
 *         "id": 105,
 *         "term": "planta",
 *         "slug": "nofapujawarvulapu",
 *         "parent_id": null,
 *         "taxonomy_id": 2,
 *         "created_at": "2020-12-19 21:26:41",
 *         "updated_at": "2020-12-19 21:26:41",
 *         "pivot": {
 *           "term_id": 105,
 *           "technology_id": 2
 *         }
 *       },
 *       {
 *         "id": 107,
 *         "term": "rosa",
 *         "slug": "buteghidazovagi",
 *         "parent_id": null,
 *         "taxonomy_id": 2,
 *         "created_at": "2020-12-19 21:26:41",
 *         "updated_at": "2020-12-19 21:26:41",
 *         "pivot": {
 *           "term_id": 107,
 *           "technology_id": 2
 *         }
 *       }
 *     ],
 *     "lattes_link": "http://lattes.cnpq.br/3347733700670486"
 *   },
 *   {
 *     "full_name": "User Areas",
 *     "institution": "XO Communications Inc",
 *     "areas": [
 *       {
 *         "knowledge_area_id": 10603026,
 *         "level": 4,
 *         "name": "Eletroquímica",
 *         "great_area_id": 10000003,
 *         "area_id": 10600000,
 *         "sub_area_id": 10603000,
 *         "speciality_id": 10603026,
 *         "pivot": {
 *           "knowledge_area_id": 10603026,
 *           "user_id": 32
 *         }
 *       },
 *       {
 *         "knowledge_area_id": 10604014,
 *         "level": 4,
 *         "name": "Separação",
 *         "great_area_id": 10000003,
 *         "area_id": 10600000,
 *         "sub_area_id": 10604006,
 *         "speciality_id": 10604014,
 *         "pivot": {
 *           "knowledge_area_id": 10604014,
 *           "user_id": 32
 *         }
 *       }
 *     ],
 *     "keywords": [],
 *     "lattes_link": "http://lattes.cnpq.br/1234567890"
 *   }
 *  ]
 */
Route.get('researchers', 'ResearcherController.index').middleware(['handleParams']);
