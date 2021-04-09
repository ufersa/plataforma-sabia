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
 * @api {get} /services/my-services Retrieve a list of the user services
 * @apiGroup Services
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParamExample  {json} Request sample:
 * GET /services/my-services
 * @apiSuccess {Boolean} success Success Flag
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 *[
 *    {
 *       "id":22,
 *       "name":"Paz ga niez okevafuh ja.",
 *       "description":"Vurro ser la atvi zo vulo ma gucalvu der hok.",
 *       "type":"examination",
 *       "price":61836,
 *       "measure_unit":"month",
 *       "payment_message":"Mapep pad rajnonun san cude wu opla fen hathiga hi.",
 *       "user_id":35,
 *       "created_at":"2021-03-19 19:50:40",
 *       "updated_at":"2021-03-19 19:50:40",
 *       "thumbnail_id":null,
 *       "likes":0,
 *       "objectID":"service-22",
 *       "keywords":[
 *     
 *       ],
 *       "user":{
 *          "id":35,
 *          "email":"sabia-818-testing-492@gmail.com",
 *          "status":"verified",
 *          "first_name":"FirstName",
 *          "last_name":"LastName",
 *          "company":"Company",
 *          "zipcode":"9999999",
 *          "cpf":"52100865005",
 *          "birth_date":"1900-01-01",
 *          "phone_number":"(99)23456789",
 *          "lattes_id":"1234567890",
 *          "address":"Testing address, 99",
 *          "address2":"Complement 99",
 *          "district":"99",
 *          "city":"Test City",
 *          "state":"TT",
 *          "country":"Fictional Country",
 *          "role_id":1,
 *          "institution_id":19,
 *          "created_at":"2021-03-19 19:50:40",
 *          "updated_at":"2021-03-19 19:50:40",
 *          "researcher":0,
 *          "full_name":"FirstName LastName",
 *          "lattes_url":"http://lattes.cnpq.br/1234567890",
 *          "institution":{
 *             "id":19,
 *             "responsible":null,
 *             "name":"Pro-Fac Cooperative Inc.",
 *             "initials":"HRNKQ",
 *             "cnpj":"44.221.605/6980-77",
 *             "address":"677 Rehuge Point",
 *             "district":"ow5FZjjicM3Gn(qQ0kDM",
 *             "zipcode":"80778",
 *             "city":"Daiheb",
 *             "state":"OK",
 *             "lat":"86.11442",
 *             "lng":"37.3088",
 *             "created_at":"2021-03-19 19:50:40",
 *             "updated_at":"2021-03-19 19:50:40",
 *             "email":"og@ceklu.eh",
 *             "phone_number":"(63) 5998-7904",
 *             "website":"http://ec.mp/dufsutep",
 *             "logo_id":null,
 *             "type":"private",
 *             "category":"cooperative"
 *          }
 *       },
 *       "thumbnail":null
 *    },
 *    {
 *       "id":23,
 *       "name":"Zajfu kisito esmevjel imaho velkafmig.",
 *       "description":"Sooztal zinak sin iw ru fam ut megob hawtito kutdol.",
 *       "type":"examination",
 *       "price":63825,
 *       "measure_unit":"other",
 *       "payment_message":"Luv fawoj nav ifpekdi wufi ga ke ra serisap raugoid.",
 *       "user_id":35,
 *       "created_at":"2021-03-19 19:50:40",
 *       "updated_at":"2021-03-19 19:50:40",
 *       "thumbnail_id":null,
 *       "likes":0,
 *       "objectID":"service-23",
 *       "keywords":[
 
 *       ],
 *       "user":{
 *          "id":35,
 *          "email":"sabia-818-testing-492@gmail.com",
 *          "status":"verified",
 *          "first_name":"FirstName",
 *          "last_name":"LastName",
 *          "company":"Company",
 *          "zipcode":"9999999",
 *          "cpf":"52100865005",
 *          "birth_date":"1900-01-01",
 *          "phone_number":"(99)23456789",
 *          "lattes_id":"1234567890",
 *          "address":"Testing address, 99",
 *          "address2":"Complement 99",
 *          "district":"99",
 *          "city":"Test City",
 *          "state":"TT",
 *          "country":"Fictional Country",
 *          "role_id":1,
 *          "institution_id":19,
 *          "created_at":"2021-03-19 19:50:40",
 *          "updated_at":"2021-03-19 19:50:40",
 *          "researcher":0,
 *          "full_name":"FirstName LastName",
 *          "lattes_url":"http://lattes.cnpq.br/1234567890",
 *          "institution":{
 *             "id":19,
 *             "responsible":null,
 *             "name":"Pro-Fac Cooperative Inc.",
 *             "initials":"HRNKQ",
 *             "cnpj":"44.221.605/6980-77",
 *             "address":"677 Rehuge Point",
 *             "district":"ow5FZjjicM3Gn(qQ0kDM",
 *             "zipcode":"80778",
 *             "city":"Daiheb",
 *             "state":"OK",
 *             "lat":"86.11442",
 *             "lng":"37.3088",
 *             "created_at":"2021-03-19 19:50:40",
 *             "updated_at":"2021-03-19 19:50:40",
 *             "email":"og@ceklu.eh",
 *             "phone_number":"(63) 5998-7904",
 *             "website":"http://ec.mp/dufsutep",
 *             "logo_id":null,
 *             "type":"private",
 *             "category":"cooperative"
 *          }
 *       },
 *       "thumbnail":null
 *    }
 * ]
 */
Route.get('services/my-services', 'ServiceController.getAuthenticatedUserServices').middleware([
	'handleParams',
	'auth',
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
 * @apiParam {String} [payment_message] Optional Payment Message
 * @apiParam {String[]|Number[]} keywords Mandatory Keywords ID or Slug Array.
 * @apiParam {Number} [thumbnail_id] Optional Thumbnail ID file
 * @apiParamExample  {json} Request sample:
 *	{
 *		"name":"Water/earth test service",
 *		"description":"Water/earth analysis",
 *		"type":"analysis",
 *		"price":1000,
 *		"measure_unit":"hour",
 *		"payment_message": "For payment use credit card..."
 *		"keywords":[237,238],
 *		"thumbnail_id": 1
 *	}
 * @apiSuccess {Number} id service ID.
 * @apiSuccess {String} name Service name.
 * @apiSuccess {String} description Service description.
 * @apiSuccess {String="labor","specialized_technical_work","consulting","analysis","examination","expertise","other"} type Service type.
 * @apiSuccess {Number} price Service price.
 * @apiSuccess {String="hour","day","week","month","unit","other"} measure_unit Service Measure Unit.
 * @apiSuccess {String} payment_message Payment Message
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
 * @apiParam {String} [payment_message] Optional Payment Message
 * @apiParam {String[]|Number[]} [keywords] Optional Keywords ID or Slug Array.
 * @apiParam {String|Number} [thumbnail_id] Optional Upload ID to set as thumbnail.
 * @apiParamExample  {json} Request sample:
 *	{
 *		"name":"Water/earth test service updated",
 *		"description":"Water/earth analysis",
 *		"type":"analysis",
 *		"price":1000,
 *		"measure_unit":"hour",
 *		"payment_message":"For payments use the credit card"
 *		"keywords":[237,238]
 *	}
 * @apiSuccess {Number} id service ID.
 * @apiSuccess {String} name Service name.
 * @apiSuccess {String} description Service description.
 * @apiSuccess {String="labor","specialized_technical_work","consulting","analysis","examination","expertise","other"} type Service type.
 * @apiSuccess {Number} price Service price.
 * @apiSuccess {String="hour","day","week","month","unit","other"} measure_unit Service Measure Unit.
 * @apiSuccess {String} payment_message Payment Message
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
 * @api {put} /services/:id/active Updates Service Active Status
 * @apiGroup Services
 * @apiPermission UPDATE_SERVICE_ACTIVE or UPDATE_SERVICES_ACTIVE
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParam (Route Param) {Number} id Mandatory Service ID
 * @apiSuccessExample {json} Success
 * HTTP/1.1 204 OK
 * @apiUse AuthError
 * @apiError (Forbidden 403) {Object} error Error object
 * @apiError (Forbidden 403) {String} error.error_code Error code
 * @apiError (Forbidden 403) {String} error.message Error message
 * @apiErrorExample {json} Unauthorized Access
 * HTTP/1.1 403 Forbidden
 * {
 * 		"error": {
 *  		"error_code": "UNAUTHORIZED_ACCESS",
 *  		"message":"Você não tem permissão para acessar esse recurso"
 * 		}
 * }
 * @apiErrorExample {json} Resource Service was not found
 * HTTP/1.1 400 Bad Request
 * {
 * 		"error": {
 *  		"error_code": "RESOURCE_NOT_FOUND",
 *  		"message":"The resource Service was not found"
 * 		}
 * }
 */
Route.put('services/:id/active', 'ServiceController.updateActiveStatus').middleware([
	'auth',
	getMiddlewarePermissions([
		permissions.UPDATE_SERVICE_ACTIVE,
		permissions.UPDATE_SERVICES_ACTIVE,
	]),
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
