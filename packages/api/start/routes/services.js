/* eslint-disable jsdoc/check-tag-names */
/* eslint-disable jsdoc/check-indentation */

const { getMiddlewarePermissions, permissions } = require('../../app/Utils/roles_capabilities');

const Route = use('Route');
/**
 * @api {get} /services Lists all Services
 * @apiGroup Services
 * @apiParam (Query Param) {String} [name] Filters by service name.
 * @apiParam (Query Param) {String} [description] Filters by service description
 * @apiParam (Query Param) {String="labor","specialized_technical_work","consulting","analysis","examination","expertise","other"} [type] Filters by service type
 * @apiParam (Query Param) {String="hour","day","week","month","unit","other"} [measure_unit] Filters by service measure unit
 * @apiParam (Query Param) {Number[]} [keywords] Filters by Keywords ID List.
 * @apiParam (Query Param) {Number} [institution] Filters by Institution ID.
 * @apiUse Params
 * @apiParamExample  {json} Request sample:
 * GET /services?name=service1&description=test&type=labor&measure_unit=hour&keywords=105,205&institution=11
 * @apiSuccess {Object[]} services Service Collection
 * @apiSuccess {Number} services.id service ID.
 * @apiSuccess {String} services.name Service name.
 * @apiSuccess {String} services.description Service description.
 * @apiSuccess {String="labor","specialized_technical_work","consulting","analysis","examination","expertise","other"} services.type Service type.
 * @apiSuccess {Number} services.price Service price.
 * @apiSuccess {String="hour","day","week","month","unit","other"} services.measure_unit Service Measure Unit.
 * @apiSuccess {Number} services.user_id Service Responsible User ID.
 * @apiSuccess {Date} services.created_at Service Register date
 * @apiSuccess {Date} services.updated_at Service Update date
 * @apiSuccess {Object[]} services.keywords Service Keywords Collection
 * @apiSuccess {Number} services.keywords.id Term ID
 * @apiSuccess {String} services.keywords.taxonomy_id Taxonomy ID
 * @apiSuccess {String} services.keywords.parent_id Parent ID
 * @apiSuccess {String} services.keywords.term Term
 * @apiSuccess {String} services.keywords.slug Term Slug
 * @apiSuccess {Date} services.keywords.created_at Term Register date
 * @apiSuccess {Date} services.keywords.updated_at Term Update date
 * @apiSuccess {Object} services.keywords.pivot Pivot Table
 * @apiSuccess {Number} services.keywords.pivot.term_id Term ID in Pivot Table
 * @apiSuccess {Number} services.keywords.pivot.service_id Service ID Pivot Table
 * @apiSuccess {Object} services.user Service User Responsible
 * @apiSuccess {Number} services.user.id User Id
 * @apiSuccess {String} services.user.first_name User First Name
 * @apiSuccess {String} services.user.last_name User Last Name
 * @apiSuccess {String} services.user.email User Email
 * @apiSuccess {String} services.user.company User Company
 * @apiSuccess {String} services.user.zipcode User Zipcode
 * @apiSuccess {String} services.user.cpf User CPF
 * @apiSuccess {String} services.user.birth_date User Birth Date
 * @apiSuccess {String} services.user.phone_number User Phone Number
 * @apiSuccess {String} services.user.lattes_id User Lattes Id
 * @apiSuccess {String} services.user.address User Address
 * @apiSuccess {String} services.user.address2 User Address2
 * @apiSuccess {String} services.user.district User District
 * @apiSuccess {String} services.user.city User City
 * @apiSuccess {String} services.user.state User State
 * @apiSuccess {String} services.user.country User Country
 * @apiSuccess {String} services.user.status User Status
 * @apiSuccess {Number} services.user.role_id User Role Id
 * @apiSuccess {String} services.user.full_name User Full Name
 * @apiSuccess {Boolean} services.user.researcher Indicates if user is a researcher
 * @apiSuccess {Date} services.user.created_at User Register date
 * @apiSuccess {Date} services.user.updated_at User Update date
 * @apiSuccess {Object} services.user.institution Service User Responsible Institution
 * @apiSuccess {Number} services.user.institution.id Institution id
 * @apiSuccess {String} services.user.institution.responsible Institution owner id
 * @apiSuccess {String} services.user.institution.name Institution name
 * @apiSuccess {String} services.user.institution.initials Institution initials
 * @apiSuccess {String} services.user.institution.cnpj Institution CNPJ
 * @apiSuccess {String} services.user.institution.address Institution address
 * @apiSuccess {String} services.user.institution.district Institution district
 * @apiSuccess {String} services.user.institution.zipcode Institution zipcode
 * @apiSuccess {String} services.user.institution.city Institution city
 * @apiSuccess {String} services.user.institution.state Institution state
 * @apiSuccess {String} services.user.institution.lat Institution latitude
 * @apiSuccess {String} services.user.institution.lng Institution longitude
 * @apiSuccess {String} services.user.institution.email Institution email
 * @apiSuccess {String} services.user.institution.phone_number Institution Phone Number
 * @apiSuccess {String} services.user.institution.website Institution Web Site
 * @apiSuccess {String} services.user.institution.logo_id Institution Logo ID
 * @apiSuccess {String='public','private','mixed','other'} services.user.institution.type Institution Type
 * @apiSuccess {String='university','institute','association','foundation','cooperative','company','other'} services.user.institution.category Institution Category
 * @apiSuccess {Date} services.user.institution.created_at Institution register date
 * @apiSuccess {Date} services.user.institution.updated_at Institution update date
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 *[
 * {
 *   "id": 1,
 *   "name": "Wonder service",
 *   "description": "wonderfull service by alex",
 *   "type": "labor",
 *   "price": 50,
 *   "measure_unit": "hour",
 *   "user_id": 28,
 *   "created_at": "2021-01-02 19:48:00",
 *   "updated_at": "2021-01-02 19:48:00",
 *   "keywords": [
 *     {
 *       "id": 149,
 *       "term": "zapdaplazkekrefbig",
 *       "slug": "zapdaplazkekrefbig",
 *       "parent_id": null,
 *       "taxonomy_id": 2,
 *       "created_at": "2020-12-19 21:26:41",
 *       "updated_at": "2020-12-19 21:26:41",
 *       "pivot": {
 *         "term_id": 149,
 *         "service_id": 1
 *       }
 *     },
 *     {
 *       "id": 156,
 *       "term": "devsajizbuazko",
 *       "slug": "devsajizbuazko",
 *       "parent_id": null,
 *       "taxonomy_id": 2,
 *       "created_at": "2020-12-19 21:26:41",
 *       "updated_at": "2020-12-19 21:26:41",
 *       "pivot": {
 *         "term_id": 156,
 *         "service_id": 1
 *       }
 *     }
 *   ],
 *   "user": {
 *     "id": 28,
 *     "email": "alexandre.adames@gmail.com",
 *     "status": "verified",
 *     "first_name": "Alexandre",
 *     "last_name": "Pontes",
 *     "company": "UFERSA",
 *     "zipcode": "59619720",
 *     "cpf": "52100865005",
 *     "birth_date": "1900-01-01",
 *     "phone_number": "(99)23456789",
 *     "lattes_id": "3347733700670486",
 *     "address": "Testing address, 99",
 *     "address2": "Complement 99",
 *     "district": "99",
 *     "city": "Mossoró",
 *     "state": "RN",
 *     "country": "Brasil",
 *     "role_id": 1,
 *     "institution_id": 1,
 *     "created_at": "2020-12-20 10:23:49",
 *     "updated_at": "2021-01-03 10:37:09",
 *     "researcher": 1,
 *     "full_name": "Alexandre Pontes",
 *     "can_be_curator": true,
 *     "can_buy_technology": true,
 *     "institution": {
 *       "id": 1,
 *       "responsible": null,
 *       "name": "XO Communications Inc",
 *       "initials": "OYWMX",
 *       "cnpj": "75.924.905/9118-87",
 *       "address": "1014 Ozma Extension",
 *       "district": "0G5!2*n1Y1T&umvb",
 *       "zipcode": "64118",
 *       "city": "Bupcenih",
 *       "state": "WV",
 *       "lat": "-78.44143",
 *       "lng": "-178.24308",
 *       "created_at": "2020-12-19 21:26:38",
 *       "updated_at": "2020-12-19 21:26:38",
 *       "email": "fuhuir@ivibicad.et",
 *       "phone_number": "(22) 3923-2607",
 *       "website": "http://pojason.jo/vuw",
 *       "logo_id": null,
 *       "type": "mixed",
 *       "category": "institute"
 *     }
 *   }
 * },
 * {
 *   "id": 2,
 *   "name": "full service",
 *   "description": "wonderfull full service by alex",
 *   "type": "analysis",
 *   "price": 2500,
 *   "measure_unit": "month",
 *   "user_id": 28,
 *   "created_at": "2021-01-03 08:54:28",
 *   "updated_at": "2021-01-03 08:54:28",
 *   "keywords": [
 *     {
 *       "id": 150,
 *       "term": "saegefiajpizev",
 *       "slug": "saegefiajpizev",
 *       "parent_id": null,
 *       "taxonomy_id": 2,
 *       "created_at": "2020-12-19 21:26:41",
 *       "updated_at": "2020-12-19 21:26:41",
 *       "pivot": {
 *         "term_id": 150,
 *         "service_id": 2
 *       }
 *     },
 *     {
 *       "id": 156,
 *       "term": "devsajizbuazko",
 *       "slug": "devsajizbuazko",
 *       "parent_id": null,
 *       "taxonomy_id": 2,
 *       "created_at": "2020-12-19 21:26:41",
 *       "updated_at": "2020-12-19 21:26:41",
 *       "pivot": {
 *         "term_id": 156,
 *         "service_id": 2
 *       }
 *     }
 *   ],
 *   "user": {
 *     "id": 28,
 *     "email": "alexandre.adames@gmail.com",
 *     "status": "verified",
 *     "first_name": "Alexandre",
 *     "last_name": "Pontes",
 *     "company": "UFERSA",
 *     "zipcode": "59619720",
 *     "cpf": "52100865005",
 *     "birth_date": "1900-01-01",
 *     "phone_number": "(99)23456789",
 *     "lattes_id": "3347733700670486",
 *     "address": "Testing address, 99",
 *     "address2": "Complement 99",
 *     "district": "99",
 *     "city": "Mossoró",
 *     "state": "RN",
 *     "country": "Brasil",
 *     "role_id": 1,
 *     "institution_id": 1,
 *     "created_at": "2020-12-20 10:23:49",
 *     "updated_at": "2021-01-03 10:37:09",
 *     "researcher": 1,
 *     "full_name": "Alexandre Pontes",
 *     "can_be_curator": true,
 *     "can_buy_technology": true,
 *     "institution": {
 *       "id": 1,
 *       "responsible": null,
 *       "name": "XO Communications Inc",
 *       "initials": "OYWMX",
 *       "cnpj": "75.924.905/9118-87",
 *       "address": "1014 Ozma Extension",
 *       "district": "0G5!2*n1Y1T&umvb",
 *       "zipcode": "64118",
 *       "city": "Bupcenih",
 *       "state": "WV",
 *       "lat": "-78.44143",
 *       "lng": "-178.24308",
 *       "created_at": "2020-12-19 21:26:38",
 *       "updated_at": "2020-12-19 21:26:38",
 *       "email": "fuhuir@ivibicad.et",
 *       "phone_number": "(22) 3923-2607",
 *       "website": "http://pojason.jo/vuw",
 *       "logo_id": null,
 *       "type": "mixed",
 *       "category": "institute"
 *     }
 *   }
 * },
 * {
 *   "id": 3,
 *   "name": "design",
 *   "description": "wonderfull full service by alex",
 *   "type": "analysis",
 *   "price": 5000,
 *   "measure_unit": "month",
 *   "user_id": 28,
 *   "created_at": "2021-01-03 08:55:01",
 *   "updated_at": "2021-01-03 08:55:01",
 *   "keywords": [
 *     {
 *       "id": 148,
 *       "term": "vorojazobuhwiwile",
 *       "slug": "vorojazobuhwiwile",
 *       "parent_id": null,
 *       "taxonomy_id": 2,
 *       "created_at": "2020-12-19 21:26:41",
 *       "updated_at": "2020-12-19 21:26:41",
 *       "pivot": {
 *         "term_id": 148,
 *         "service_id": 3
 *       }
 *     },
 *     {
 *       "id": 156,
 *       "term": "devsajizbuazko",
 *       "slug": "devsajizbuazko",
 *       "parent_id": null,
 *       "taxonomy_id": 2,
 *       "created_at": "2020-12-19 21:26:41",
 *       "updated_at": "2020-12-19 21:26:41",
 *       "pivot": {
 *         "term_id": 156,
 *         "service_id": 3
 *       }
 *     }
 *   ],
 *   "user": {
 *     "id": 28,
 *     "email": "alexandre.adames@gmail.com",
 *     "status": "verified",
 *     "first_name": "Alexandre",
 *     "last_name": "Pontes",
 *     "company": "UFERSA",
 *     "zipcode": "59619720",
 *     "cpf": "52100865005",
 *     "birth_date": "1900-01-01",
 *     "phone_number": "(99)23456789",
 *     "lattes_id": "3347733700670486",
 *     "address": "Testing address, 99",
 *     "address2": "Complement 99",
 *     "district": "99",
 *     "city": "Mossoró",
 *     "state": "RN",
 *     "country": "Brasil",
 *     "role_id": 1,
 *     "institution_id": 1,
 *     "created_at": "2020-12-20 10:23:49",
 *     "updated_at": "2021-01-03 10:37:09",
 *     "researcher": 1,
 *     "full_name": "Alexandre Pontes",
 *     "can_be_curator": true,
 *     "can_buy_technology": true,
 *     "institution": {
 *       "id": 1,
 *       "responsible": null,
 *       "name": "XO Communications Inc",
 *       "initials": "OYWMX",
 *       "cnpj": "75.924.905/9118-87",
 *       "address": "1014 Ozma Extension",
 *       "district": "0G5!2*n1Y1T&umvb",
 *       "zipcode": "64118",
 *       "city": "Bupcenih",
 *       "state": "WV",
 *       "lat": "-78.44143",
 *       "lng": "-178.24308",
 *       "created_at": "2020-12-19 21:26:38",
 *       "updated_at": "2020-12-19 21:26:38",
 *       "email": "fuhuir@ivibicad.et",
 *       "phone_number": "(22) 3923-2607",
 *       "website": "http://pojason.jo/vuw",
 *       "logo_id": null,
 *       "type": "mixed",
 *       "category": "institute"
 *     }
 *   }
 * },
 * {
 *   "id": 4,
 *   "name": "Service fantastic",
 *   "description": "fantastic service",
 *   "type": "examination",
 *   "price": 10000,
 *   "measure_unit": "month",
 *   "user_id": 11,
 *   "created_at": "2021-01-03 09:04:29",
 *   "updated_at": "2021-01-03 09:04:29",
 *   "keywords": [
 *     {
 *       "id": 154,
 *       "term": "uhnahekenifacat",
 *       "slug": "uhnahekenifacat",
 *       "parent_id": null,
 *       "taxonomy_id": 2,
 *       "created_at": "2020-12-19 21:26:41",
 *       "updated_at": "2020-12-19 21:26:41",
 *       "pivot": {
 *         "term_id": 154,
 *         "service_id": 4
 *       }
 *     }
 *   ],
 *   "user": {
 *     "id": 11,
 *     "email": "sabiatestinge2e@gmail.com",
 *     "status": "verified",
 *     "first_name": "Sabia",
 *     "last_name": "Testing",
 *     "company": "UFERSA",
 *     "zipcode": null,
 *     "cpf": null,
 *     "birth_date": null,
 *     "phone_number": null,
 *     "lattes_id": "12345678890",
 *     "address": null,
 *     "address2": null,
 *     "district": null,
 *     "city": null,
 *     "state": null,
 *     "country": null,
 *     "role_id": 1,
 *     "institution_id": 11,
 *     "created_at": "2020-12-19 21:26:39",
 *     "updated_at": "2020-12-19 21:26:39",
 *     "researcher": 1,
 *     "full_name": "Sabia Testing",
 *     "can_be_curator": false,
 *     "can_buy_technology": false,
 *     "institution": {
 *       "id": 11,
 *       "responsible": 9,
 *       "name": "BMC Software, Inc.",
 *       "initials": "MDJPA",
 *       "cnpj": "23.037.510/5112-69",
 *       "address": "185 Gozu Lane",
 *       "district": "N$qxeN86I2i)q3mouGh",
 *       "zipcode": "26062",
 *       "city": "Kulutido",
 *       "state": "LA",
 *       "lat": "-62.28838",
 *       "lng": "-63.08356",
 *       "created_at": "2020-12-19 21:26:39",
 *       "updated_at": "2020-12-19 21:26:39",
 *       "email": "cakkom@rur.cf",
 *       "phone_number": "(34) 4272-4002",
 *       "website": "http://egreperu.mm/vu",
 *       "logo_id": null,
 *       "type": "public",
 *       "category": "institute"
 *     }
 *   }
 * }
 *]
 */
Route.get('services', 'ServiceController.index').middleware(['handleParams']);
/**
 * @api {get} /services/orders Lists user responsible service orders
 * @apiGroup Service Orders
 * @apiUse Params
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiSuccess {Object[]} serviceOrders collection.
 * @apiSuccess {Number} serviceOrders.id ServiceOrder ID.
 * @apiSuccess {Number} serviceOrders.quantity ServiceOrder quantity.
 * @apiSuccess {String="requested","performed","canceled"} serviceOrders.status Service Order Status.
 * @apiSuccess {Number} serviceOrders.user_id ServiceOrder user requester.
 * @apiSuccess {Number} serviceOrders.service_id ServiceOrder service related.
 * @apiSuccess {Date} serviceOrders.created_at ServiceOrder Register date
 * @apiSuccess {Date} serviceOrders.updated_at ServiceOrder Update date
 * @apiSuccess {Number} serviceOrders.service related service.
 * @apiSuccess {Number} serviceOrders.service.id service ID.
 * @apiSuccess {String} serviceOrders.service.name Service name.
 * @apiSuccess {String} serviceOrders.service.description Service description.
 * @apiSuccess {String="labor","specialized_technical_work","consulting","analysis","examination","expertise","other"} serviceOrders.service.type Service type.
 * @apiSuccess {Number} serviceOrders.service.price Service price.
 * @apiSuccess {String="hour","day","week","month","unit","other"} serviceOrders.service.measure_unit Service Measure Unit.
 * @apiSuccess {Number} serviceOrders.service.user_id Service Responsible User ID.
 * @apiSuccess {Date} serviceOrders.service.created_at Service Register date
 * @apiSuccess {Date} serviceOrders.service.updated_at Service Update date
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 *	[
 *	 {
 *	   "id": 2,
 *	   "user_id": 11,
 *	   "service_id": 2,
 *	   "quantity": 20,
 *	   "status": "performed",
 *	   "created_at": "2021-01-04 19:52:52",
 *	   "updated_at": "2021-01-11 16:04:37",
 *	   "service": {
 *	     "id": 2,
 *	     "name": "full service",
 *	     "description": "wonderfull full service by alex",
 *	     "type": "analysis",
 *	     "price": 2500,
 *	     "measure_unit": "month",
 *	     "user_id": 28,
 *	     "created_at": "2021-01-03 08:54:28",
 *	     "updated_at": "2021-01-03 08:54:28"
 *	   }
 *	 },
 *	 {
 *	   "id": 3,
 *	   "user_id": 11,
 *	   "service_id": 3,
 *	   "quantity": 15,
 *	   "status": "requested",
 *	   "created_at": "2021-01-04 19:52:52",
 *	   "updated_at": "2021-01-04 19:52:52",
 *	   "service": {
 *	     "id": 3,
 *	     "name": "design",
 *	     "description": "wonderfull full service by alex",
 *	     "type": "analysis",
 *	     "price": 5000,
 *	     "measure_unit": "month",
 *	     "user_id": 28,
 *	     "created_at": "2021-01-03 08:55:01",
 *	     "updated_at": "2021-01-03 08:55:01"
 *	   }
 *	 },
 *	 {
 *	   "id": 4,
 *	   "user_id": 11,
 *	   "service_id": 1,
 *	   "quantity": 10,
 *	   "status": "requested",
 *	   "created_at": "2021-01-04 20:09:50",
 *	   "updated_at": "2021-01-04 20:09:50",
 *	   "service": {
 *	     "id": 1,
 *	     "name": "Wonder service",
 *	     "description": "wonderfull service by alex",
 *	     "type": "labor",
 *	     "price": 50,
 *	     "measure_unit": "hour",
 *	     "user_id": 28,
 *	     "created_at": "2021-01-02 19:48:00",
 *	     "updated_at": "2021-01-02 19:48:00"
 *	   }
 *	 },
 *	 {
 *	   "id": 5,
 *	   "user_id": 11,
 *	   "service_id": 2,
 *	   "quantity": 20,
 *	   "status": "requested",
 *	   "created_at": "2021-01-04 20:09:50",
 *	   "updated_at": "2021-01-04 20:09:50",
 *	   "service": {
 *	     "id": 2,
 *	     "name": "full service",
 *	     "description": "wonderfull full service by alex",
 *	     "type": "analysis",
 *	     "price": 2500,
 *	     "measure_unit": "month",
 *	     "user_id": 28,
 *	     "created_at": "2021-01-03 08:54:28",
 *	     "updated_at": "2021-01-03 08:54:28"
 *	   }
 *	 },
 *	 {
 *	   "id": 6,
 *	   "user_id": 11,
 *	   "service_id": 3,
 *	   "quantity": 15,
 *	   "status": "requested",
 *	   "created_at": "2021-01-04 20:09:50",
 *	   "updated_at": "2021-01-04 20:09:50",
 *	   "service": {
 *	     "id": 3,
 *	     "name": "design",
 *	     "description": "wonderfull full service by alex",
 *	     "type": "analysis",
 *	     "price": 5000,
 *	     "measure_unit": "month",
 *	     "user_id": 28,
 *	     "created_at": "2021-01-03 08:55:01",
 *	     "updated_at": "2021-01-03 08:55:01"
 *	   }
 *	 },
 *	 {
 *	   "id": 7,
 *	   "user_id": 11,
 *	   "service_id": 1,
 *	   "quantity": 10,
 *	   "status": "requested",
 *	   "created_at": "2021-01-04 20:32:50",
 *	   "updated_at": "2021-01-04 20:32:50",
 *	   "service": {
 *	     "id": 1,
 *	     "name": "Wonder service",
 *	     "description": "wonderfull service by alex",
 *	     "type": "labor",
 *	     "price": 50,
 *	     "measure_unit": "hour",
 *	     "user_id": 28,
 *	     "created_at": "2021-01-02 19:48:00",
 *	     "updated_at": "2021-01-02 19:48:00"
 *	   }
 *	 },
 *	 {
 *	   "id": 8,
 *	   "user_id": 11,
 *	   "service_id": 2,
 *	   "quantity": 20,
 *	   "status": "requested",
 *	   "created_at": "2021-01-04 20:32:50",
 *	   "updated_at": "2021-01-04 20:32:50",
 *	   "service": {
 *	     "id": 2,
 *	     "name": "full service",
 *	     "description": "wonderfull full service by alex",
 *	     "type": "analysis",
 *	     "price": 2500,
 *	     "measure_unit": "month",
 *	     "user_id": 28,
 *	     "created_at": "2021-01-03 08:54:28",
 *	     "updated_at": "2021-01-03 08:54:28"
 *	   }
 *	 },
 *	 {
 *	   "id": 9,
 *	   "user_id": 11,
 *	   "service_id": 3,
 *	   "quantity": 15,
 *	   "status": "requested",
 *	   "created_at": "2021-01-04 20:32:50",
 *	   "updated_at": "2021-01-04 20:32:50",
 *	   "service": {
 *	     "id": 3,
 *	     "name": "design",
 *	     "description": "wonderfull full service by alex",
 *	     "type": "analysis",
 *	     "price": 5000,
 *	     "measure_unit": "month",
 *	     "user_id": 28,
 *	     "created_at": "2021-01-03 08:55:01",
 *	     "updated_at": "2021-01-03 08:55:01"
 *	   }
 *	 },
 *	 {
 *	   "id": 10,
 *	   "user_id": 11,
 *	   "service_id": 1,
 *	   "quantity": 10,
 *	   "status": "requested",
 *	   "created_at": "2021-01-04 20:34:32",
 *	   "updated_at": "2021-01-04 20:34:32",
 *	   "service": {
 *	     "id": 1,
 *	     "name": "Wonder service",
 *	     "description": "wonderfull service by alex",
 *	     "type": "labor",
 *	     "price": 50,
 *	     "measure_unit": "hour",
 *	     "user_id": 28,
 *	     "created_at": "2021-01-02 19:48:00",
 *	     "updated_at": "2021-01-02 19:48:00"
 *	   }
 *	 },
 *	 {
 *	   "id": 11,
 *	   "user_id": 11,
 *	   "service_id": 2,
 *	   "quantity": 20,
 *	   "status": "requested",
 *	   "created_at": "2021-01-04 20:34:32",
 *	   "updated_at": "2021-01-04 20:34:32",
 *	   "service": {
 *	     "id": 2,
 *	     "name": "full service",
 *	     "description": "wonderfull full service by alex",
 *	     "type": "analysis",
 *	     "price": 2500,
 *	     "measure_unit": "month",
 *	     "user_id": 28,
 *	     "created_at": "2021-01-03 08:54:28",
 *	     "updated_at": "2021-01-03 08:54:28"
 *	   }
 *	 }
 * ]
 * @apiUse AuthError
 */
Route.get('services/orders', 'ServiceController.showServiceOrders').middleware([
	'auth',
	'handleParams',
]);
/**
 * @api {get} /services/orders/reviews Lists user responsible service order reviews
 * @apiGroup Service Order Reviews
 * @apiUse Params
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiSuccess {Object[]} serviceOrderReviews collection.
 * @apiSuccess {Number} serviceOrderReviews.id ServiceOrderReview ID
 * @apiSuccess {Number} serviceOrderReviews.user_id User User ID
 * @apiSuccess {Number} serviceOrderReviews.service_order_id ServiceOrderReview ID
 * @apiSuccess {String} serviceOrderReviews.content ServiceOrderReview Rating.
 * @apiSuccess {Number{1-5}} serviceOrderReviews.rating ServiceOrderReview Rating.
 * @apiSuccess {String[]} serviceOrderReviews.positive ServiceOrderReview Positives.
 * @apiSuccess {String[]} serviceOrderReviews.negative ServiceOrderReview Negatives.
 * @apiSuccess {Date} serviceOrderReviews.created_at ServiceOrderReview Register date
 * @apiSuccess {Date} serviceOrderReviews.updated_at ServiceOrderReview Update date
 * @apiSuccess {Number} serviceOrderReviews.serviceOrder ServiceOrder object
 * @apiSuccess {Number} serviceOrderReviews.serviceOrder.id ServiceOrder ID.
 * @apiSuccess {Number} serviceOrderReviews.serviceOrder.quantity ServiceOrder quantity.
 * @apiSuccess {String="requested","performed","canceled"} serviceOrderReviews.serviceOrder.status Service Order Status.
 * @apiSuccess {Number} serviceOrderReviews.serviceOrder.user_id ServiceOrder user requester.
 * @apiSuccess {Number} serviceOrderReviews.serviceOrder..service_id ServiceOrder service related.
 * @apiSuccess {Date} serviceOrderReviews.serviceOrder.created_at ServiceOrder Register date
 * @apiSuccess {Date} serviceOrderReviews.serviceOrder..updated_at ServiceOrder Update date
 * @apiSuccess {Number} serviceOrderReviews.serviceOrder.service related service.
 * @apiSuccess {Number} serviceOrderReviews.serviceOrder.service.id service ID.
 * @apiSuccess {String} serviceOrderReviews.serviceOrder.service.name Service name.
 * @apiSuccess {String} serviceOrderReviews.serviceOrder.service.description Service description.
 * @apiSuccess {String="labor","specialized_technical_work","consulting","analysis","examination","expertise","other"} serviceOrderReviews.serviceOrder.service.type Service type.
 * @apiSuccess {Number} serviceOrderReviews.serviceOrder.service.price Service price.
 * @apiSuccess {String="hour","day","week","month","unit","other"} serviceOrderReviews.serviceOrder.service.measure_unit Service Measure Unit.
 * @apiSuccess {Number} serviceOrderReviews.serviceOrder.service.user_id Service Responsible User ID.
 * @apiSuccess {Date} serviceOrderReviews.serviceOrder.service.created_at Service Register date
 * @apiSuccess {Date} serviceOrderReviews.serviceOrder.service.updated_at Service Update date
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 *[
 * {
 *   "id": 2,
 *   "user_id": 11,
 *   "service_order_id": 2,
 *   "content": "Gostei bastante do serviço",
 *   "rating": 5,
 *   "positive": [
 *     "profissional exclente",
 *     "entrega no prazo"
 *   ],
 *   "negative": [
 *     "nenhum"
 *   ],
 *   "created_at": "2021-01-12 15:43:33",
 *   "updated_at": "2021-01-12 15:43:33",
 *   "serviceOrder": {
 *     "id": 2,
 *     "user_id": 11,
 *     "service_id": 2,
 *     "quantity": 20,
 *     "status": "performed",
 *     "created_at": "2021-01-04 19:52:52",
 *     "updated_at": "2021-01-11 16:04:37",
 *     "service": {
 *       "id": 2,
 *       "name": "full service",
 *       "description": "wonderfull full service by alex",
 *       "type": "analysis",
 *       "price": 2500,
 *       "measure_unit": "month",
 *       "user_id": 28,
 *       "created_at": "2021-01-03 08:54:28",
 *       "updated_at": "2021-01-03 08:54:28"
 *     }
 *   }
 * },
 * {
 *   "id": 3,
 *   "user_id": 11,
 *   "service_order_id": 3,
 *   "content": "Gostei bastante do serviço",
 *   "rating": 5,
 *   "positive": [
 *     "profissional exclente",
 *     "entrega no prazo"
 *   ],
 *   "negative": [
 *     "nenhum"
 *   ],
 *   "created_at": "2021-01-12 15:43:37",
 *   "updated_at": "2021-01-12 15:43:37",
 *   "serviceOrder": {
 *     "id": 3,
 *     "user_id": 11,
 *     "service_id": 3,
 *     "quantity": 15,
 *     "status": "requested",
 *     "created_at": "2021-01-04 19:52:52",
 *     "updated_at": "2021-01-04 19:52:52",
 *     "service": {
 *       "id": 3,
 *       "name": "design",
 *       "description": "wonderfull full service by alex",
 *       "type": "analysis",
 *       "price": 5000,
 *       "measure_unit": "month",
 *       "user_id": 28,
 *       "created_at": "2021-01-03 08:55:01",
 *       "updated_at": "2021-01-03 08:55:01"
 *     }
 *   }
 * },
 * {
 *   "id": 4,
 *   "user_id": 11,
 *   "service_order_id": 4,
 *   "content": "Gostei bastante do serviço",
 *   "rating": 5,
 *   "positive": [
 *     "profissional exclente",
 *     "entrega no prazo"
 *   ],
 *   "negative": [
 *     "nenhum"
 *   ],
 *   "created_at": "2021-01-12 15:43:41",
 *   "updated_at": "2021-01-12 15:43:41",
 *   "serviceOrder": {
 *     "id": 4,
 *     "user_id": 11,
 *     "service_id": 1,
 *     "quantity": 10,
 *     "status": "requested",
 *     "created_at": "2021-01-04 20:09:50",
 *     "updated_at": "2021-01-04 20:09:50",
 *     "service": {
 *       "id": 1,
 *       "name": "Wonder service",
 *       "description": "wonderfull service by alex",
 *       "type": "labor",
 *       "price": 50,
 *       "measure_unit": "hour",
 *       "user_id": 28,
 *       "created_at": "2021-01-02 19:48:00",
 *       "updated_at": "2021-01-02 19:48:00"
 *     }
 *   }
 * },
 * {
 *   "id": 5,
 *   "user_id": 11,
 *   "service_order_id": 5,
 *   "content": "Gostei bastante do serviço",
 *   "rating": 5,
 *   "positive": [
 *     "profissional exclente",
 *     "entrega no prazo"
 *   ],
 *   "negative": [
 *     "nenhum"
 *   ],
 *   "created_at": "2021-01-12 15:43:45",
 *   "updated_at": "2021-01-12 15:43:45",
 *   "serviceOrder": {
 *     "id": 5,
 *     "user_id": 11,
 *     "service_id": 2,
 *     "quantity": 20,
 *     "status": "requested",
 *     "created_at": "2021-01-04 20:09:50",
 *     "updated_at": "2021-01-04 20:09:50",
 *     "service": {
 *       "id": 2,
 *       "name": "full service",
 *       "description": "wonderfull full service by alex",
 *       "type": "analysis",
 *       "price": 2500,
 *       "measure_unit": "month",
 *       "user_id": 28,
 *       "created_at": "2021-01-03 08:54:28",
 *       "updated_at": "2021-01-03 08:54:28"
 *     }
 *   }
 * },
 * {
 *   "id": 6,
 *   "user_id": 11,
 *   "service_order_id": 6,
 *   "content": "Gostei bastante do serviço",
 *   "rating": 5,
 *   "positive": [
 *     "profissional exclente",
 *     "entrega no prazo"
 *   ],
 *   "negative": [
 *     "nenhum"
 *   ],
 *   "created_at": "2021-01-12 15:43:50",
 *   "updated_at": "2021-01-12 15:43:50",
 *   "serviceOrder": {
 *     "id": 6,
 *     "user_id": 11,
 *     "service_id": 3,
 *     "quantity": 15,
 *     "status": "requested",
 *     "created_at": "2021-01-04 20:09:50",
 *     "updated_at": "2021-01-04 20:09:50",
 *     "service": {
 *       "id": 3,
 *       "name": "design",
 *       "description": "wonderfull full service by alex",
 *       "type": "analysis",
 *       "price": 5000,
 *       "measure_unit": "month",
 *       "user_id": 28,
 *       "created_at": "2021-01-03 08:55:01",
 *       "updated_at": "2021-01-03 08:55:01"
 *     }
 *   }
 * }
 *]
 * @apiUse AuthError
 */
Route.get('services/orders/reviews', 'ServiceController.showServiceOrderReviews').middleware([
	'auth',
	'handleParams',
]);
/**
 * @api {get} /services/:id Gets a single Service
 * @apiGroup Services
 * @apiParam (Route Param) {Number} id Mandatory Service ID
 * @apiSuccess {Number} id service ID.
 * @apiSuccess {String} name Service name.
 * @apiSuccess {String} description Service description.
 * @apiSuccess {String="labor","specialized_technical_work","consulting","analysis","examination","expertise","other"} type Service type.
 * @apiSuccess {Number} price Service price.
 * @apiSuccess {String="hour","day","week","month","unit","other"} measure_unit Service Measure Unit.
 * @apiSuccess {Number} user_id Service Responsible User ID.
 * @apiSuccess {Date} created_at Service Register date
 * @apiSuccess {Date} updated_at Service Update date
 * @apiSuccess {Object[]} keywords Service Keywords Collection
 * @apiSuccess {Number} keywords.id Term ID
 * @apiSuccess {String} keywords.taxonomy_id Taxonomy ID
 * @apiSuccess {String} keywords.parent_id Parent ID
 * @apiSuccess {String} keywords.term Term
 * @apiSuccess {String} keywords.slug Term Slug
 * @apiSuccess {Date} keywords.created_at Term Register date
 * @apiSuccess {Date} keywords.updated_at Term Update date
 * @apiSuccess {Object} keywords.pivot Pivot Table
 * @apiSuccess {Number} keywords.pivot.term_id Term ID in Pivot Table
 * @apiSuccess {Number} keywords.pivot.service_id Service ID Pivot Table
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 * {
 *  "id": 8,
 *  "name": "Water/earth test service updated",
 *  "description": "Water/earth analysis",
 *  "type": "analysis",
 *  "price": 1000,
 *  "measure_unit": "hour",
 *  "user_id": 11,
 *  "created_at": "2021-01-14 13:54:25",
 *  "updated_at": "2021-01-14 13:54:25",
 *  "keywords": [
 *    {
 *      "id": 237,
 *      "term": "agua",
 *      "slug": "agua",
 *      "parent_id": null,
 *      "taxonomy_id": 2,
 *      "created_at": "2020-12-20 11:05:06",
 *      "updated_at": "2020-12-20 11:05:06",
 *      "pivot": {
 *        "term_id": 237,
 *        "service_id": 8
 *      }
 *    },
 *    {
 *      "id": 238,
 *      "term": "terra",
 *      "slug": "terra",
 *      "parent_id": null,
 *      "taxonomy_id": 2,
 *      "created_at": "2020-12-20 11:05:13",
 *      "updated_at": "2020-12-20 11:05:13",
 *      "pivot": {
 *        "term_id": 238,
 *        "service_id": 8
 *      }
 *    }
 *  ]
 *}
 * @apiError (Bad Request 400) {Object} error Error object
 * @apiError (Bad Request 400) {String} error.error_code Error code
 * @apiError (Bad Request 400) {String} error.message Error message
 * @apiErrorExample {json} Resource Service was not found
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "RESOURCE_NOT_FOUND",
 *   			"message":"The resource Service was not found"
 * 			}
 *		}
 */
Route.get('services/:id', 'ServiceController.show').middleware(['handleParams']);
/**
 * @api {post} /services Creates a new Service
 * @apiDescription User needs belongs to an institituion for offer a service
 * @apiGroup Services
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParam {String} name Mandatory service name.
 * @apiParam {String} description Mandatory service description
 * @apiParam {String="labor","specialized_technical_work","consulting","analysis","examination","expertise","other"} type Mandatory service type
 * @apiParam {Number} price Mandatory service price
 * @apiParam {String="hour","day","week","month","unit","other"} measure_unit Mandatory service measure unit
 * @apiParam {String[]|Number[]} keywords Mandatory Keywords ID or Slug Array.
 * @apiParam {Number} [thumbnail_id] Optional Thumbnail ID file
 * @apiParamExample  {json} Request sample:
 *	{
 *		"name":"Water/earth test service",
 *		"description":"Water/earth analysis",
 *		"type":"analysis",
 *		"price":1000,
 *		"measure_unit":"hour",
 *		"keywords":[237,238],
 *		"thumbnail_id": 1
 *	}
 * @apiSuccess {Number} id service ID.
 * @apiSuccess {String} name Service name.
 * @apiSuccess {String} description Service description.
 * @apiSuccess {String="labor","specialized_technical_work","consulting","analysis","examination","expertise","other"} type Service type.
 * @apiSuccess {Number} price Service price.
 * @apiSuccess {String="hour","day","week","month","unit","other"} measure_unit Service Measure Unit.
 * @apiSuccess {Number} user_id Service Responsible User ID.
 * @apiSuccess {Date} created_at Service Register date
 * @apiSuccess {Date} updated_at Service Update date
 * @apiSuccess {Object[]} keywords Service Keywords Collection
 * @apiSuccess {Number} keywords.id Term ID
 * @apiSuccess {String} keywords.taxonomy_id Taxonomy ID
 * @apiSuccess {String} keywords.parent_id Parent ID
 * @apiSuccess {String} keywords.term Term
 * @apiSuccess {String} keywords.slug Term Slug
 * @apiSuccess {Date} keywords.created_at Term Register date
 * @apiSuccess {Date} keywords.updated_at Term Update date
 * @apiSuccess {Object} keywords.pivot Pivot Table
 * @apiSuccess {Number} keywords.pivot.term_id Term ID in Pivot Table
 * @apiSuccess {Number} keywords.pivot.service_id Service ID Pivot Table
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 * {
 *  "id": 8,
 *  "name": "Water/earth test service",
 *  "description": "Water/earth analysis",
 *  "type": "analysis",
 *  "price": 1000,
 *  "measure_unit": "hour",
 *  "user_id": 11,
 *  "created_at": "2021-01-14 13:54:25",
 *  "updated_at": "2021-01-14 13:54:25",
 *  "keywords": [
 *    {
 *      "id": 237,
 *      "term": "agua",
 *      "slug": "agua",
 *      "parent_id": null,
 *      "taxonomy_id": 2,
 *      "created_at": "2020-12-20 11:05:06",
 *      "updated_at": "2020-12-20 11:05:06",
 *      "pivot": {
 *        "term_id": 237,
 *        "service_id": 8
 *      }
 *    },
 *    {
 *      "id": 238,
 *      "term": "terra",
 *      "slug": "terra",
 *      "parent_id": null,
 *      "taxonomy_id": 2,
 *      "created_at": "2020-12-20 11:05:13",
 *      "updated_at": "2020-12-20 11:05:13",
 *      "pivot": {
 *        "term_id": 238,
 *        "service_id": 8
 *      }
 *    }
 *  ]
 *}
 * @apiUse AuthError
 * @apiError (Bad Request 400) {Object} error Error object
 * @apiError (Bad Request 400) {String} error.error_code Error code
 * @apiError (Bad Request 400) {String} error.message Error message
 * @apiErrorExample {json} Validation Error: name Required
 *    HTTP/1.1 400 Bad Request
 *		{
 *    		"error": {
 *        		"error_code": "VALIDATION_ERROR",
 *        		"message": [
 *            		{
 *                		"message": "name is required.",
 *                		"field": "name",
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
 * @apiErrorExample {json} Validation Error: type Required
 *    HTTP/1.1 400 Bad Request
 *		{
 *    		"error": {
 *        		"error_code": "VALIDATION_ERROR",
 *        		"message": [
 *            		{
 *                		"message": "type is required.",
 *                		"field": "type",
 *                		"validation": "required"
 *            		}
 *        		]
 *   		}
 *		}
 * @apiErrorExample {json} Validation Error: The type should fall within defined values
 *    HTTP/1.1 400 Bad Request
 *		{
 *    		"error": {
 *        		"error_code": "VALIDATION_ERROR",
 *        		"message": [
 *            		{
 *                		"message": "The type should fall within defined values of (labor,specialized_technical_work,consulting,analysis,examination,expertise,other).",
 *                		"field": "type",
 *                		"validation": "in"
 *            		}
 *        		]
 *   		}
 *		}
 * @apiErrorExample {json} Validation Error: price Required
 *    HTTP/1.1 400 Bad Request
 *		{
 *    		"error": {
 *        		"error_code": "VALIDATION_ERROR",
 *        		"message": [
 *            		{
 *                		"message": "price is required.",
 *                		"field": "price",
 *                		"validation": "required"
 *            		}
 *        		]
 *   		}
 *		}
 * @apiErrorExample {json} Validation Error: measure_unit Required
 *    HTTP/1.1 400 Bad Request
 *		{
 *    		"error": {
 *        		"error_code": "VALIDATION_ERROR",
 *        		"message": [
 *            		{
 *                		"message": "measure_unit is required.",
 *                		"field": "measure_unit",
 *                		"validation": "required"
 *            		}
 *        		]
 *   		}
 *		}
 * @apiErrorExample {json} Validation Error: The measure_unit should fall within defined values
 *    HTTP/1.1 400 Bad Request
 *		{
 *    		"error": {
 *        		"error_code": "VALIDATION_ERROR",
 *        		"message": [
 *            		{
 *                		"message": "The measure_unit should fall within defined values of (hour,day,week,month,unit,other).",
 *                		"field": "measure_unit",
 *                		"validation": "in"
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
Route.post('services', 'ServiceController.store')
	.middleware(['auth', 'registrationCompleted:check_personal_data,check_organizational_data'])
	.validator('StoreService');
/**
 * @api {post} /services/orders Creates Service Orders
 * @apiDescription Any User can request multiple service orders
 * @apiGroup Service Orders
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParam {String} [comment] Optional comment.
 * @apiParam {Object[]} services Mandatory service array.
 * @apiParam {Number} services.service_id Mandatory service id.
 * @apiParam {Number} services.quantity Mandatory service order quantity.
 * @apiParamExample  {json} Request sample:
 *	{
 *	 	"comment": "Test comment",
 *		"services":[
 *			{
 *						"service_id": 7,
 *						"quantity": 20
 *			},
 *			{
 *						"service_id": 8,
 *						"quantity": 15
 *			}
 *
 *		]
 *	}
 * @apiSuccess {Object[]} serviceOrders collection.
 * @apiSuccess {Number} serviceOrders.id ServiceOrder ID.
 * @apiSuccess {Number} serviceOrders.quantity ServiceOrder quantity.
 * @apiSuccess {String="requested","performed","canceled"} serviceOrders.status Service Order Status.
 * @apiSuccess {Number} serviceOrders.user_id ServiceOrder user requester.
 * @apiSuccess {Number} serviceOrders.service_id ServiceOrder service related.
 * @apiSuccess {String} serviceOrders.comment ServiceOrder comment.
 * @apiSuccess {Date} serviceOrders.created_at ServiceOrder Register date
 * @apiSuccess {Date} serviceOrders.updated_at ServiceOrder Update date
 * @apiSuccess {Number} serviceOrders.service related service.
 * @apiSuccess {Number} serviceOrders.service.id service ID.
 * @apiSuccess {String} serviceOrders.service.name Service name.
 * @apiSuccess {String} serviceOrders.service.description Service description.
 * @apiSuccess {String="labor","specialized_technical_work","consulting","analysis","examination","expertise","other"} serviceOrders.service.type Service type.
 * @apiSuccess {Number} serviceOrders.service.price Service price.
 * @apiSuccess {String="hour","day","week","month","unit","other"} serviceOrders.service.measure_unit Service Measure Unit.
 * @apiSuccess {Number} serviceOrders.service.user_id Service Responsible User ID.
 * @apiSuccess {Date} serviceOrders.service.created_at Service Register date
 * @apiSuccess {Date} serviceOrders.service.updated_at Service Update date
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 *	[
 *	 {
 *	   "service_id": 7,
 *	   "quantity": 20,
 *	   "user_id": 28,
 *	   "status": "requested",
 *	   "created_at": "2021-01-14 14:35:47",
 *	   "updated_at": "2021-01-14 14:35:47",
 *	   "id": 19,
 *	   "service": {
 *	     "id": 7,
 *	     "name": "Water/earth test service",
 *	     "description": "Water/earth analysis",
 *	     "type": "analysis",
 *	     "price": 1000,
 *	     "measure_unit": "hour",
 *	     "user_id": 11,
 *	     "created_at": "2021-01-14 13:46:29",
 *	     "updated_at": "2021-01-14 13:46:29"
 *	   }
 *	 },
 *	 {
 *	   "service_id": 8,
 *	   "quantity": 15,
 *	   "user_id": 28,
 *	   "status": "requested",
 *	   "created_at": "2021-01-14 14:35:47",
 *	   "updated_at": "2021-01-14 14:35:47",
 *	   "id": 20,
 *	   "service": {
 *	     "id": 8,
 *	     "name": "Water/earth test service updated",
 *	     "description": "Water/earth analysis",
 *	     "type": "analysis",
 *	     "price": 1000,
 *	     "measure_unit": "hour",
 *	     "user_id": 11,
 *	     "created_at": "2021-01-14 13:54:25",
 *	     "updated_at": "2021-01-14 14:12:36"
 *	   }
 *	 }
 *	]
 * @apiUse AuthError
 * @apiError (Bad Request 400) {Object} error Error object
 * @apiError (Bad Request 400) {String} error.error_code Error code
 * @apiError (Bad Request 400) {String} error.message Error message
 * @apiErrorExample {json} Validation Error: services Required
 *    HTTP/1.1 400 Bad Request
 *		{
 *    		"error": {
 *        		"error_code": "VALIDATION_ERROR",
 *        		"message": [
 *            		{
 *                		"message": "services is required.",
 *                		"field": "services",
 *                		"validation": "required"
 *            		}
 *        		]
 *   		}
 *		}
 * @apiErrorExample {json} Validation Error: The services.*.service_id required
 *    HTTP/1.1 400 Bad Request
 *		{
 *    		"error": {
 *        		"error_code": "VALIDATION_ERROR",
 *        		"message": [
 *            		{
 *                		"message": "The services.0.service_id is required",
 *                		"field": "services.*.service_id",
 *                		"validation": "required"
 *            		}
 *        		]
 *   		}
 *		}
 * @apiErrorExample {json} Validation Error: The services.*.service_id should exist in services
 *    HTTP/1.1 400 Bad Request
 *		{
 *    		"error": {
 *        		"error_code": "VALIDATION_ERROR",
 *        		"message": [
 *            		{
 *                		"message": "The services.*.service_id should exist in services",
 *                		"field": "services.*.service_id",
 *                		"validation": "exists"
 *            		}
 *        		]
 *   		}
 *		}
 * @apiErrorExample {json} Validation Error: The services.*.quantity required
 *    HTTP/1.1 400 Bad Request
 *		{
 *    		"error": {
 *        		"error_code": "VALIDATION_ERROR",
 *        		"message": [
 *            		{
 *                		"message": "The services.0.quantity is required",
 *                		"field": "services.*.quantity",
 *                		"validation": "required"
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
Route.post('services/orders', 'ServiceController.storeServiceOrder')
	.middleware(['auth', 'registrationCompleted:check_personal_data'])
	.validator('StoreServiceOrder');
/**
 * @api {post} /services/orders/:id/reviews Creates a new Service Order Review
 * @apiDescription User that requested service order can create a review
 * @apiGroup Service Order Reviews
 * @apiPermission CREATE_SERVICE_ORDER_REVIEW
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParam (Route Param) {Number} id Mandatory ServiceOrder ID for review.
 * @apiParam {String} content Mandatory ServiceOrderReview Content.
 * @apiParam {Number{1-5}} rating Mandatory ServiceOrderReview Rating.
 * @apiParam {String[]} positive Mandatory ServiceOrderReview Positives.
 * @apiParam {String[]} negative Mandatory ServiceOrderReview Negatives.
 * @apiParamExample  {json} Request sample:
 *	{
 *		"content":"A test content for review",
 *		"rating":5,
 *		"positive":["positive 01","positive 02"],
 *		"negative":["negative 01","negative 02"],
 *	}
 * @apiSuccess {Number} id ServiceOrderReview ID
 * @apiSuccess {Number} user_id User User ID
 * @apiSuccess {Number} service_order_id ServiceOrderReview ID
 * @apiSuccess {String} content ServiceOrderReview Rating.
 * @apiSuccess {Number{1-5}} rating ServiceOrderReview Rating.
 * @apiSuccess {String[]} positive ServiceOrderReview Positives.
 * @apiSuccess {String[]} negative ServiceOrderReview Negatives.
 * @apiSuccess {Date} created_at ServiceOrderReview Register date
 * @apiSuccess {Date} updated_at ServiceOrderReview Update date
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 *	{
 *	 "content": "A test content for review",
 *	 "rating": 5,
 *	 "positive": "[\"positive 01\",\"positive 02\"]",
 *	 "negative": "[\"negative 01\",\"negative 02\"]",
 *	 "created_at": "2020-08-19 19:21:26",
 *	 "updated_at": "2020-08-19 19:21:26",
 *	 "id": 11,
 *	 "service_order_id": 1,
 *	 "user_id": 1
 *	}
 *@apiUse AuthError
 *@apiError (Bad Request 400) {Object} error Error object
 *@apiError (Bad Request 400) {String} error.error_code Error code
 *@apiError (Bad Request 400) {Object[]} error.message Error messages
 *@apiErrorExample {json} Validation Error: Content Required
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "VALIDATION_ERROR",
 *   			"message": [
 *     				{
 *       				"message": "The content is required.",
 *       				"field": "content",
 *       				"validation": "required"
 *     				}
 *   			]
 * 			}
 *		}
 *@apiErrorExample {json} Validation Error: Rating Required
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "VALIDATION_ERROR",
 *   			"message": [
 *     				{
 *       				"message": "The rating is required.",
 *       				"field": "rating",
 *       				"validation": "required"
 *     				}
 *   			]
 * 			}
 *		}
 *@apiErrorExample {json} Validation Error: Rating Range
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "VALIDATION_ERROR",
 *   			"message": [
 *     				{
 *       				"message": "The rating should be between 0 and 6.",
 *       				"field": "rating",
 *       				"validation": "range"
 *     				}
 *   			]
 * 			}
 *		}
 *@apiErrorExample {json} Validation Error: Positive Required
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "VALIDATION_ERROR",
 *   			"message": [
 *     				{
 *       				"message": "The positive is required.",
 *       				"field": "positive",
 *       				"validation": "required"
 *     				}
 *   			]
 * 			}
 *		}
 *@apiErrorExample {json} Validation Error: Negative Required
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "VALIDATION_ERROR",
 *   			"message": [
 *     				{
 *       				"message": "The negative is required.",
 *       				"field": "negative",
 *       				"validation": "required"
 *     				}
 *   			]
 * 			}
 *		}
 * @apiErrorExample {json} Resource ServiceOrder was not found
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "RESOURCE_NOT_FOUND",
 *   			"message":"The resource ServiceOrder was not found"
 * 			}
 *		}
 *@apiError (Forbidden 403) {Object} error Error object
 *@apiError (Forbidden 403) {String} error.error_code Error code
 *@apiError (Forbidden 403) {String} error.message Error message
 *@apiErrorExample {json} Unauthorized Access
 *    HTTP/1.1 403 Forbidden
 *		{
 * 			"error": {
 *   			"error_code": "UNAUTHORIZED_ACCESS",
 *   			"message":"Você não tem permissão para acessar esse recurso"
 * 			}
 *		}
 */
Route.post('services/orders/:id/reviews', 'ServiceController.storeServiceOrderReview')
	.middleware(['auth', getMiddlewarePermissions([permissions.CREATE_SERVICE_ORDER_REVIEW])])
	.validator('StoreServiceOrderReview');
/**
 * @api {put} /services/:id Updates a Service
 * @apiDescription Only Service responsible can update it
 * @apiGroup Services
 * @apiPermission UPDATE_SERVICE or UPDATE_SERVICES
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParam (Route Param) {Number} id Mandatory Service ID
 * @apiParam {String} [name] Optional service name.
 * @apiParam {String} [description] Optional service description
 * @apiParam {String="labor","specialized_technical_work","consulting","analysis","examination","expertise","other"} [type] Optional service type
 * @apiParam {Number} [price] Optional service price
 * @apiParam {String="hour","day","week","month","unit","other"} [measure_unit] Optional service measure unit
 * @apiParam {String[]|Number[]} [keywords] Optional Keywords ID or Slug Array.
 * @apiParamExample  {json} Request sample:
 *	{
 *		"name":"Water/earth test service updated",
 *		"description":"Water/earth analysis",
 *		"type":"analysis",
 *		"price":1000,
 *		"measure_unit":"hour",
 *		"keywords":[237,238]
 *	}
 * @apiSuccess {Number} id service ID.
 * @apiSuccess {String} name Service name.
 * @apiSuccess {String} description Service description.
 * @apiSuccess {String="labor","specialized_technical_work","consulting","analysis","examination","expertise","other"} type Service type.
 * @apiSuccess {Number} price Service price.
 * @apiSuccess {String="hour","day","week","month","unit","other"} measure_unit Service Measure Unit.
 * @apiSuccess {Number} user_id Service Responsible User ID.
 * @apiSuccess {Date} created_at Service Register date
 * @apiSuccess {Date} updated_at Service Update date
 * @apiSuccess {Object[]} keywords Service Keywords Collection
 * @apiSuccess {Number} keywords.id Term ID
 * @apiSuccess {String} keywords.taxonomy_id Taxonomy ID
 * @apiSuccess {String} keywords.parent_id Parent ID
 * @apiSuccess {String} keywords.term Term
 * @apiSuccess {String} keywords.slug Term Slug
 * @apiSuccess {Date} keywords.created_at Term Register date
 * @apiSuccess {Date} keywords.updated_at Term Update date
 * @apiSuccess {Object} keywords.pivot Pivot Table
 * @apiSuccess {Number} keywords.pivot.term_id Term ID in Pivot Table
 * @apiSuccess {Number} keywords.pivot.service_id Service ID Pivot Table
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 * {
 *  "id": 8,
 *  "name": "Water/earth test service updated",
 *  "description": "Water/earth analysis",
 *  "type": "analysis",
 *  "price": 1000,
 *  "measure_unit": "hour",
 *  "user_id": 11,
 *  "created_at": "2021-01-14 13:54:25",
 *  "updated_at": "2021-01-14 13:54:25",
 *  "keywords": [
 *    {
 *      "id": 237,
 *      "term": "agua",
 *      "slug": "agua",
 *      "parent_id": null,
 *      "taxonomy_id": 2,
 *      "created_at": "2020-12-20 11:05:06",
 *      "updated_at": "2020-12-20 11:05:06",
 *      "pivot": {
 *        "term_id": 237,
 *        "service_id": 8
 *      }
 *    },
 *    {
 *      "id": 238,
 *      "term": "terra",
 *      "slug": "terra",
 *      "parent_id": null,
 *      "taxonomy_id": 2,
 *      "created_at": "2020-12-20 11:05:13",
 *      "updated_at": "2020-12-20 11:05:13",
 *      "pivot": {
 *        "term_id": 238,
 *        "service_id": 8
 *      }
 *    }
 *  ]
 *}
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
 * @apiErrorExample {json} Resource Service was not found
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "RESOURCE_NOT_FOUND",
 *   			"message":"The resource Service was not found"
 * 			}
 *		}
 */
Route.put('services/:id', 'ServiceController.update')
	.middleware([
		'auth',
		getMiddlewarePermissions([permissions.UPDATE_SERVICE, permissions.UPDATE_SERVICES]),
	])
	.validator('UpdateService');
/**
 * @api {put} /services/orders/:id Updates a Service Order
 * @apiDescription User that requested service order can update it
 * @apiGroup Service Orders
 * @apiPermission UPDATE_SERVICE_ORDER or UPDATE_SERVICE_ORDERS
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParam (Route Param) {Number} id Mandatory Service Order ID
 * @apiParam {Number} [quantity] Optional service order quantity.
 * @apiParamExample  {json} Request sample:
 *	{
 * 		"quantity":9
 *	}
 * @apiSuccess {Number} id ServiceOrder ID.
 * @apiSuccess {Number} quantity ServiceOrder quantity.
 * @apiSuccess {String="requested","performed","canceled"} status Service Order Status.
 * @apiSuccess {Number} user_id ServiceOrder user requester.
 * @apiSuccess {Number} service_id ServiceOrder service related.
 * @apiSuccess {Date} created_at ServiceOrder Register date
 * @apiSuccess {Date} updated_at ServiceOrder Update date
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 * {
 *  "id": 19,
 *  "user_id": 28,
 *  "service_id": 7,
 *  "quantity": 9,
 *  "status": "requested",
 *  "created_at": "2021-01-14 14:35:47",
 *  "updated_at": "2021-01-14 14:58:30"
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
 * @apiErrorExample {json} Resource ServiceOrder was not found
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "RESOURCE_NOT_FOUND",
 *   			"message":"The resource ServiceOrder was not found"
 * 			}
 *		}
 */
Route.put('services/orders/:id', 'ServiceController.updateServiceOrder').middleware([
	'auth',
	getMiddlewarePermissions([permissions.UPDATE_SERVICE_ORDER, permissions.UPDATE_SERVICE_ORDERS]),
]);
/**
 * @api {put} /services/orders/:id/perform Performs a Service Order
 * @apiDescription User responsible for service order can perform it
 * @apiGroup Service Orders
 * @apiPermission PERFORM_SERVICE_ORDER
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParam (Route Param) {Number} id Mandatory Service Order ID
 * @apiSuccess {Number} id ServiceOrder ID.
 * @apiSuccess {Number} quantity ServiceOrder quantity.
 * @apiSuccess {String="performed"} status Service Order Status.
 * @apiSuccess {Number} user_id ServiceOrder user requester.
 * @apiSuccess {Number} service_id ServiceOrder service related.
 * @apiSuccess {Date} created_at ServiceOrder Register date
 * @apiSuccess {Date} updated_at ServiceOrder Update date
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 * {
 *  "id": 19,
 *  "user_id": 28,
 *  "service_id": 7,
 *  "quantity": 9,
 *  "status": "performed",
 *  "created_at": "2021-01-14 14:35:47",
 *  "updated_at": "2021-01-14 14:58:30"
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
 * @apiErrorExample {json} Resource ServiceOrder was not found
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "RESOURCE_NOT_FOUND",
 *   			"message":"The resource ServiceOrder was not found"
 * 			}
 *		}
 */
Route.put('services/orders/:id/perform', 'ServiceController.performServiceOrder').middleware([
	'auth',
	getMiddlewarePermissions([permissions.PERFORM_SERVICE_ORDER]),
]);
/**
 * @api {put} /services/orders/reviews/:id Updates Service Order Review
 * @apiDescription User that create service order review can update it
 * @apiGroup Service Order Reviews
 * @apiPermission UPDATE_SERVICE_ORDER_REVIEW
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParam (Route Param) {Number} id Mandatory ServiceOrderReview ID
 * @apiParam {String} [content] Optional ServiceOrderReview Content.
 * @apiParam {Number{1-5}} [rating] Optional ServiceOrderReview Rating.
 * @apiParam {String[]} [positive] Optional ServiceOrderReview Positives.
 * @apiParam {String[]} [negative] Optional ServiceOrderReview Negatives.
 * @apiParamExample  {json} Request sample:
 *	{
 *		"content":"A test content for review updated",
 *		"rating":5,
 *		"positive":["positive 01","positive 02"],
 *		"negative":["negative 01","negative 02"],
 *	}
 * @apiSuccess {Number} id ServiceOrderReview ID
 * @apiSuccess {Number} user_id User User ID
 * @apiSuccess {Number} service_order_id ServiceOrderReview ID
 * @apiSuccess {String} content ServiceOrderReview Rating.
 * @apiSuccess {Number{1-5}} rating ServiceOrderReview Rating.
 * @apiSuccess {String[]} positive ServiceOrderReview Positives.
 * @apiSuccess {String[]} negative ServiceOrderReview Negatives.
 * @apiSuccess {Date} created_at ServiceOrderReview Register date
 * @apiSuccess {Date} updated_at ServiceOrderReview Update date
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 *	{
 *	 "content": "A test content for review updated",
 *	 "rating": 5,
 *	 "positive": "[\"positive 01\",\"positive 02\"]",
 *	 "negative": "[\"negative 01\",\"negative 02\"]",
 *	 "created_at": "2020-08-19 19:21:26",
 *	 "updated_at": "2020-08-19 19:21:26",
 *	 "id": 11,
 *	 "service_order_id": 1,
 *	 "user_id": 1
 *	}
 *@apiUse AuthError
 * @apiErrorExample {json} Resource ServiceOrderReview was not found
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "RESOURCE_NOT_FOUND",
 *   			"message":"The resource ServiceOrderReview was not found"
 * 			}
 *		}
 *@apiError (Forbidden 403) {Object} error Error object
 *@apiError (Forbidden 403) {String} error.error_code Error code
 *@apiError (Forbidden 403) {String} error.message Error message
 *@apiErrorExample {json} Unauthorized Access
 *    HTTP/1.1 403 Forbidden
 *		{
 * 			"error": {
 *   			"error_code": "UNAUTHORIZED_ACCESS",
 *   			"message":"Você não tem permissão para acessar esse recurso"
 * 			}
 *		}
 */
Route.put('services/orders/reviews/:id', 'ServiceController.updateServiceOrderReview').middleware([
	'auth',
	getMiddlewarePermissions([permissions.UPDATE_SERVICE_ORDER_REVIEW]),
]);
/**
 * @api {delete} /services/:id Deletes a Service
 * @apiDescription Only Service responsible can delete it.
 * @apiGroup Services
 * @apiPermission DELETE_SERVICE or DELETE_SERVICES
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParam (Route Param) {Number} id Mandatory Service ID.
 * @apiParamExample  {json} Request sample:
 * DELETE /services/1
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
 * @apiErrorExample {json} Resource Service was not found
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "RESOURCE_NOT_FOUND",
 *   			"message":"The resource Service was not found"
 * 			}
 *		}
 */
Route.delete('services/:id', 'ServiceController.destroy').middleware([
	'auth',
	getMiddlewarePermissions([permissions.DELETE_SERVICE, permissions.DELETE_SERVICES]),
]);
/**
 * @api {delete} /services/orders/:id Deletes a Service Order
 * @apiDescription User that requested service order can delete it.
 * @apiGroup Service Orders
 * @apiPermission DELETE_SERVICE_ORDER or DELETE_SERVICE_ORDERS
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParam (Route Param) {Number} id Mandatory Service Order ID.
 * @apiParamExample  {json} Request sample:
 * DELETE /services/orders/1
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
 * @apiErrorExample {json} Resource ServiceOrder was not found
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "RESOURCE_NOT_FOUND",
 *   			"message":"The resource ServiceOrder was not found"
 * 			}
 *		}
 */
Route.delete('services/orders/:id', 'ServiceController.destroyServiceOrder').middleware([
	'auth',
	getMiddlewarePermissions([permissions.DELETE_SERVICE_ORDER, permissions.DELETE_SERVICE_ORDERS]),
]);
/**
 * @api {delete} /services/orders/reviews/:id Deletes a Service Order Review
 * @apiDescription User that create service order review can delete it,
 * @apiGroup Service Orders
 * @apiPermission DELETE_SERVICE_ORDER_REVIEW
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParam (Route Param) {Number} id Mandatory ServiceOrderReview ID.
 * @apiParamExample  {json} Request sample:
 * DELETE /services/orders/reviews/1
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
 * @apiErrorExample {json} Resource ServiceOrderReview was not found
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "RESOURCE_NOT_FOUND",
 *   			"message":"The resource ServiceOrderReview was not found"
 * 			}
 *		}
 */
Route.delete(
	'services/orders/reviews/:id',
	'ServiceController.destroyServiceOrderReview',
).middleware(['auth', getMiddlewarePermissions([permissions.DELETE_SERVICE_ORDER_REVIEW])]);
