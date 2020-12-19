/* eslint-disable jsdoc/check-tag-names */
/* eslint-disable jsdoc/check-indentation */

const Route = use('Route');

/** Knowledge Areas Routes */
/**
 * @api {get} /areas/:knowledge_area_id Gets a single Knowledge Area
 * @apiGroup Knowledge Areas
 * @apiParam {Number} knowledge_area_id Mandatory Knowledge Area ID.
 * @apiParamExample  {json} Request sample:
 * GET /areas/10101063
 * @apiSuccess {Number} knowledge_area_id Knowledge Area ID
 * @apiSuccess {Number} level Knowledge Area Level
 * @apiSuccess {String} name Knowledge Area Name
 * @apiSuccess {Number} great_area_id Knowledge Great Area ID
 * @apiSuccess {Number} area_id Knowledge Area ID
 * @apiSuccess {Number} sub_area_id Knowledge Sub Area ID
 * @apiSuccess {Number} speciality_id Knowledge Speciality ID
 * @apiSuccess {Object} greatArea Knowledge Great Area
 * @apiSuccess {Number} greatArea.knowledge_area_id Knowledge Area ID
 * @apiSuccess {Number} greatArea.level Knowledge Area Level
 * @apiSuccess {String} greatArea.name Knowledge Area Name
 * @apiSuccess {Number} greatArea.great_area_id Knowledge Great Area ID
 * @apiSuccess {Number} greatArea.area_id Knowledge Area ID
 * @apiSuccess {Number} greatArea.sub_area_id Knowledge Sub Area ID
 * @apiSuccess {Number} greatArea.speciality_id Knowledge Speciality ID
 * @apiSuccess {Object} area Knowledge Area
 * @apiSuccess {Number} area.knowledge_area_id Knowledge Area ID
 * @apiSuccess {Number} area.level Knowledge Area Level
 * @apiSuccess {String} area.name Knowledge Area Name
 * @apiSuccess {Number} area.great_area_id Knowledge Great Area ID
 * @apiSuccess {Number} area.area_id Knowledge Area ID
 * @apiSuccess {Number} area.sub_area_id Knowledge Sub Area ID
 * @apiSuccess {Number} area.speciality_id Knowledge Speciality ID
 * @apiSuccess {Object} subArea Knowledge Sub Area
 * @apiSuccess {Number} subArea.knowledge_area_id Knowledge Area ID
 * @apiSuccess {Number} subArea.level Knowledge Area Level
 * @apiSuccess {String} subArea.name Knowledge Area Name
 * @apiSuccess {Number} subArea.great_area_id Knowledge Great Area ID
 * @apiSuccess {Number} subArea.area_id Knowledge Area ID
 * @apiSuccess {Number} subArea.sub_area_id Knowledge Sub Area ID
 * @apiSuccess {Number} subArea.speciality_id Knowledge Speciality ID
 * @apiSuccess {Object} speciality Knowledge Speciality
 * @apiSuccess {Number} speciality.knowledge_area_id Knowledge Area ID
 * @apiSuccess {Number} speciality.level Knowledge Area Level
 * @apiSuccess {String} speciality.name Knowledge Area Name
 * @apiSuccess {Number} speciality.great_area_id Knowledge Great Area ID
 * @apiSuccess {Number} speciality.area_id Knowledge Area ID
 * @apiSuccess {Number} speciality.sub_area_id Knowledge Sub Area ID
 * @apiSuccess {Number} speciality.speciality_id Knowledge Speciality ID
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 *  {
 *   "knowledge_area_id": 10101063,
 *   "level": 4,
 *   "name": "Geometria Algébrica",
 *   "great_area_id": 10000003,
 *   "area_id": 10100008,
 *   "sub_area_id": 10101004,
 *   "speciality_id": 10101063,
 *   "greatArea": {
 *     "knowledge_area_id": 10000003,
 *     "level": 1,
 *     "name": "Ciências Exatas e da Terra",
 *     "great_area_id": 10000003,
 *     "area_id": null,
 *     "sub_area_id": null,
 *     "speciality_id": null
 *   },
 *   "area": {
 *     "knowledge_area_id": 10100008,
 *     "level": 2,
 *     "name": "Matemática",
 *     "great_area_id": 10000003,
 *     "area_id": 10100008,
 *     "sub_area_id": null,
 *     "speciality_id": null
 *   },
 *   "subArea": {
 *     "knowledge_area_id": 10101004,
 *     "level": 3,
 *     "name": "Álgebra",
 *     "great_area_id": 10000003,
 *     "area_id": 10100008,
 *     "sub_area_id": 10101004,
 *     "speciality_id": null
 *   },
 *   "speciality": {
 *     "knowledge_area_id": 10101063,
 *     "level": 4,
 *     "name": "Geometria Algébrica",
 *     "great_area_id": 10000003,
 *     "area_id": 10100008,
 *     "sub_area_id": 10101004,
 *     "speciality_id": 10101063
 *   }
 *  }
 * */
Route.get('areas/:knowledge_area_id', 'KnowledgeAreaController.show');
/**
 * @api {get} /areas Lists Knowledge Areas
 * @apiGroup Knowledge Areas
 * @apiParam (Query Param) {Number} [level] Optional Knowledge Area Level
 * @apiParam (Query Param) {String} [name] Optional Knowledge Area Name
 * @apiParam (Query Param) {Number} [greatArea] Optional Knowledge Great Area
 * @apiParam (Query Param) {Number} [area] Optional Knowledge Area
 * @apiParam (Query Param) {Number} [subarea] Optional Knowledge Sub Area
 * @apiParam (Query Param) {Number} [speciality] Optional Knowledge Area Speciality
 * @apiUse Params
 * @apiParamExample  {json} Request sample:
 * GET /areas?level=2&greatArea=10000003
 * @apiSuccess {Object[]} knowledge_areas Knowledge Area Collection
 * @apiSuccess {Number} knowledge_areas.knowledge_area_id Knowledge Area ID
 * @apiSuccess {Number} knowledge_areas.level Knowledge Area Level
 * @apiSuccess {String} knowledge_areas.name Knowledge Area Name
 * @apiSuccess {Number} knowledge_areas.great_area_id Knowledge Great Area ID
 * @apiSuccess {Number} knowledge_areas.area_id Knowledge Area ID
 * @apiSuccess {Number} knowledge_areas.sub_area_id Knowledge Sub Area ID
 * @apiSuccess {Number} knowledge_areas.speciality_id Knowledge Speciality ID
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 *  [
 *   {
 *     "knowledge_area_id": 10100008,
 *     "level": 2,
 *     "name": "Matemática",
 *     "great_area_id": 10000003,
 *     "area_id": 10100008,
 *     "sub_area_id": null,
 *     "speciality_id": null
 *   },
 *   {
 *     "knowledge_area_id": 10200002,
 *     "level": 2,
 *     "name": "Probabilidade e Estatística",
 *     "great_area_id": 10000003,
 *     "area_id": 10200002,
 *     "sub_area_id": null,
 *     "speciality_id": null
 *   },
 *   {
 *     "knowledge_area_id": 10300007,
 *     "level": 2,
 *     "name": "Ciência da Computação",
 *     "great_area_id": 10000003,
 *     "area_id": 10300007,
 *     "sub_area_id": null,
 *     "speciality_id": null
 *   },
 *   {
 *     "knowledge_area_id": 10400001,
 *     "level": 2,
 *     "name": "Astronomia",
 *     "great_area_id": 10000003,
 *     "area_id": 10400001,
 *     "sub_area_id": null,
 *     "speciality_id": null
 *   },
 *   {
 *     "knowledge_area_id": 10500006,
 *     "level": 2,
 *     "name": "Física",
 *     "great_area_id": 10000003,
 *     "area_id": 10500006,
 *     "sub_area_id": null,
 *     "speciality_id": null
 *   },
 *   {
 *     "knowledge_area_id": 10600000,
 *     "level": 2,
 *     "name": "Química",
 *     "great_area_id": 10000003,
 *     "area_id": 10600000,
 *     "sub_area_id": null,
 *     "speciality_id": null
 *   },
 *   {
 *     "knowledge_area_id": 10700005,
 *     "level": 2,
 *     "name": "Geociências",
 *     "great_area_id": 10000003,
 *     "area_id": 10700005,
 *     "sub_area_id": null,
 *     "speciality_id": null
 *   },
 *   {
 *     "knowledge_area_id": 10800000,
 *     "level": 2,
 *     "name": "Oceanografia",
 *     "great_area_id": 10000003,
 *     "area_id": 10800000,
 *     "sub_area_id": null,
 *     "speciality_id": null
 *   }
 *  ]
 * */
Route.get('areas', 'KnowledgeAreaController.index').middleware(['handleParams']);
