/* eslint-disable jsdoc/check-tag-names */
/* eslint-disable jsdoc/check-indentation */

const {
	getMiddlewareRoles,
	roles,
	getMiddlewarePermissions,
	permissions,
} = require('../../app/Utils/roles_capabilities');

const Route = use('Route');

/** Reviewer Routes */
/**
 * @api {get} /reviewers Lists All Reviewers
 * @apiGroup Reviewers
 * @apiPermission ADMIN
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiUse Params
 * @apiSuccess {Object[]} reviewers Reviewers Collection
 * @apiSuccess {Number} reviewers.id Reviewer ID.
 * @apiSuccess {Number} reviewers.user_id Reviewer Related User ID.
 * @apiSuccess {String} reviewers.status Reviewer Status
 * @apiSuccess {Date} reviewers.created_at Reviewer Register date
 * @apiSuccess {Date} reviewers.updated_at Reviewer Update date
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 *	[
 *	 	{
 *	 	  "id": 1,
 *	 	  "user_id": null,
 *	 	  "status": "approved",
 *	 	  "created_at": "2020-08-30 17:08:18",
 *	 	  "updated_at": "2020-09-02 21:49:02"
 *	 	},
 *	 	{
 *	 	  "id": 2,
 *	 	  "user_id": 15,
 *	 	  "status": "approved",
 *	 	  "created_at": "2020-08-30 17:10:09",
 *	 	  "updated_at": "2020-09-02 18:53:31"
 *	 	},
 *	 	{
 *	 	  "id": 3,
 *	 	  "user_id": 16,
 *	 	  "status": "approved",
 *	 	  "created_at": "2020-09-01 21:38:11",
 *	 	  "updated_at": "2020-09-02 21:49:11"
 *	 	},
 *	 	{
 *	 	  "id": 4,
 *	 	  "user_id": 1,
 *	 	  "status": "pending",
 *	 	  "created_at": "2020-09-02 21:27:34",
 *	 	  "updated_at": "2020-09-02 21:27:34"
 *	 	}
 *	]
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
 */
Route.get('reviewers', 'ReviewerController.index').middleware([
	'auth',
	'handleParams',
	getMiddlewareRoles([roles.ADMIN]),
]);
/**
 * @api {get} /reviewers/:id Gets a single Reviewer
 * @apiGroup Reviewers
 * @apiPermission ADMIN
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParam (Route Param){Number} id Mandatory Reviewer ID.
 * @apiParam embed Activate Embedding.
 * @apiParamExample  {json} Request sample:
 *	/reviewers/2?embed
 * @apiSuccess {Number} id Reviewer ID.
 * @apiSuccess {Number} user_id Reviewer Related User ID.
 * @apiSuccess {String} status Reviewer Status
 * @apiSuccess {Date} created_at Reviewer Register date
 * @apiSuccess {Date} updated_at Reviewer Update date
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 *	{
 *	 "id": 2,
 *	 "user_id": 15,
 *	 "status": "approved",
 *	 "created_at": "2020-08-30 17:10:09",
 *	 "updated_at": "2020-09-02 18:53:31"
 *	}
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
 * @apiErrorExample {json} Resource Reviewer was not found
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "RESOURCE_NOT_FOUND",
 *   			"message":"The resource Reviewer was not found"
 * 			}
 *		}
 */
Route.get('reviewers/:id', 'ReviewerController.show').middleware([
	'auth',
	'handleParams',
	getMiddlewareRoles([roles.ADMIN]),
]);
/**
 * @api {post} /reviewers Creates a new Reviewer
 * @apiGroup Reviewers
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParam {String[]|Number[]} categories Mandatory Categories Array. Term ID or Term Slug is permited.
 * @apiParamExample  {json} Request sample:
 *	{
 *		"categories":["recursos-hidricos",13,14,15]
 *	}
 * @apiSuccess {Number} id Reviewer ID
 * @apiSuccess {Number} user_id Related User ID
 * @apiSuccess {Date} created_at Reviewer Register date
 * @apiSuccess {Date} updated_at Reviewer Update date
 * @apiSuccess {Object} user Related User
 * @apiSuccess {Number} user.id User Id
 * @apiSuccess {String} user.first_name User First Name
 * @apiSuccess {String} user.last_name User Last Name
 * @apiSuccess {String} user.email User Email
 * @apiSuccess {String} user.company User Company
 * @apiSuccess {String} user.zipcode User Zipcode
 * @apiSuccess {String} user.cpf User CPF
 * @apiSuccess {String} user.birth_date User Birth Date
 * @apiSuccess {String} user.phone_number User Phone Number
 * @apiSuccess {String} user.lattes_id User Lattes Id
 * @apiSuccess {String} user.address User Address
 * @apiSuccess {String} user.address2 User Address2
 * @apiSuccess {String} user.district User District
 * @apiSuccess {String} user.city User City
 * @apiSuccess {String} user.state User State
 * @apiSuccess {String} user.country User Country
 * @apiSuccess {String} user.status User Status
 * @apiSuccess {Number} user.role_id User Role Id
 * @apiSuccess {String} user.full_name User Full Name
 * @apiSuccess {Date} user.created_at User Register date
 * @apiSuccess {Date} user.updated_at User Update date
 * @apiSuccess {Object[]} categories Reviewer Related Categories
 * @apiSuccess {Number} categories.id Category ID
 * @apiSuccess {Number} categories.taxonomy_id Taxonomy ID
 * @apiSuccess {Number} categories.parent_id Parent ID
 * @apiSuccess {String} categories.term Category Term
 * @apiSuccess {String} categories.slug Category Term Slug
 * @apiSuccess {Date} categories.created_at Category Register date
 * @apiSuccess {Date} categories.updated_at Category Update date
 * @apiSuccess {Object} categories.pivot Category Reviewer Pivot Relashionship
 * @apiSuccess {Number} categories.pivot.term_id Term ID
 * @apiSuccess {Number} categories.pivot.reviewer_id Reviewer ID
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 *	{
 *	 "created_at": "2020-09-02 21:27:34",
 *	 "updated_at": "2020-09-02 21:27:34",
 *	 "id": 4,
 *	 "user_id": 1,
 *	 "user": {
 *	   "id": 1,
 *	   "email": "nopuoro@ezazu.bj",
 *	   "status": "pending",
 *	   "first_name": "ziWEMG95K9gr3aZ!%",
 *	   "last_name": "%T0$v3Mr]",
 *	   "company": "xtqyxR2nk$P",
 *	   "zipcode": "39489",
 *	   "cpf": "75002359176",
 *	   "birth_date": "2085-03-05 23:55:20.859",
 *	   "phone_number": "92906561437",
 *	   "lattes_id": "74452478485",
 *	   "address": "VbMpMytJsy",
 *	   "address2": "Ur^R@3sedSti",
 *	   "district": "4ZOO68osgAWH*",
 *	   "city": "T3oh(GQ%W(IUB",
 *	   "state": "$@)X@w4I8!w$KvDc#*",
 *	   "country": "%reAZldfZD",
 *	   "role_id": 1,
 *	   "created_at": "2020-08-19 20:57:29",
 *	   "updated_at": "2020-08-19 20:57:29",
 *	   "full_name": "ziWEMG95K9gr3aZ!% %T0$v3Mr]"
 *	 },
 *	 "categories": [
 *	   {
 *	     "id": 12,
 *	     "term": "Recursos Hídricos",
 *	     "slug": "recursos-hidricos",
 *	     "parent_id": null,
 *	     "taxonomy_id": 1,
 *	     "created_at": "2020-08-19 20:57:32",
 *	     "updated_at": "2020-08-19 20:57:32",
 *	     "pivot": {
 *	       "term_id": 12,
 *	       "reviewer_id": 4
 *	     }
 *	   },
 *	   {
 *	     "id": 13,
 *	     "term": "Oferta de Água/Armazenamento",
 *	     "slug": "oferta-de-aguaarmazenamento",
 *	     "parent_id": 12,
 *	     "taxonomy_id": 1,
 *	     "created_at": "2020-08-19 20:57:32",
 *	     "updated_at": "2020-08-19 20:57:32",
 *	     "pivot": {
 *	       "term_id": 13,
 *	       "reviewer_id": 4
 *	     }
 *	   },
 *	   {
 *	     "id": 14,
 *	     "term": "Coleta de água de chuva",
 *	     "slug": "coleta-de-agua-de-chuva",
 *	     "parent_id": 12,
 *	     "taxonomy_id": 1,
 *	     "created_at": "2020-08-19 20:57:32",
 *	     "updated_at": "2020-08-19 20:57:32",
 *	     "pivot": {
 *	       "term_id": 14,
 *	       "reviewer_id": 4
 *	     }
 *	   },
 *	   {
 *	     "id": 15,
 *	     "term": "Manejo de aquíferos",
 *	     "slug": "manejo-de-aquiferos",
 *	     "parent_id": 12,
 *	     "taxonomy_id": 1,
 *	     "created_at": "2020-08-19 20:57:32",
 *	     "updated_at": "2020-08-19 20:57:32",
 *	     "pivot": {
 *	       "term_id": 15,
 *	       "reviewer_id": 4
 *	     }
 *	   }
 *	 ]
 *	}
 *@apiUse AuthError
 *@apiError (Bad Request 400) {Object} error Error object
 *@apiError (Bad Request 400) {String} error.error_code Error code
 *@apiError (Bad Request 400) {Object[]} error.message Error messages
 *@apiErrorExample {json} Validation Error: Categories Required
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "VALIDATION_ERROR",
 *   			"message": [
 *     				{
 *       				"message": "The categories is required.",
 *       				"field": "categories",
 *       				"validation": "required"
 *     				}
 *   			]
 * 			}
 *		}
 *@apiErrorExample {json} Resource Term was not found
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "RESOURCE_NOT_FOUND",
 *   			"message":"The resource Term was not found"
 * 			}
 *		}
 */
Route.post('reviewers', 'ReviewerController.store')
	.middleware(['auth'])
	.validator('StoreReviewer');
/**
 * @api {put} /reviewers/:id/update-status Updates Reviewer Status
 * @apiGroup Reviewers
 * @apiPermission ADMIN
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParam (Route Param) {Number} id Mandatory Reviewer ID
 * @apiParam {String="pending","approved"} status Reviewer Status
 * @apiParamExample  {json} Request sample:
 *	{
 *		"status":"approved"
 *	}
 * @apiSuccess {Number} id Reviewer ID.
 * @apiSuccess {Number} user_id Reviewer Related User ID.
 * @apiSuccess {String} status Reviewer Status
 * @apiSuccess {Date} created_at Reviewer Register date
 * @apiSuccess {Date} updated_at Reviewer Update date
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 *	{
 *	 "id": 3,
 *	 "user_id": 16,
 *	 "status": "approved",
 *	 "created_at": "2020-09-01 21:38:11",
 *	 "updated_at": "2020-09-02 21:49:11"
 *	}
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
 * @apiErrorExample {json} Resource Reviewer was not found
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "RESOURCE_NOT_FOUND",
 *   			"message":"The resource Reviewer was not found"
 * 			}
 *		}
 * @apiErrorExample {json} Validation Error: Status Required
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "VALIDATION_ERROR",
 *   			"message": [
 *     				{
 *       				"message": "The status is required.",
 *       				"field": "status",
 *       				"validation": "required"
 *     				}
 *   			]
 * 			}
 *		}
 * @apiErrorExample {json} Validation Error: Status should fall within defined values
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "VALIDATION_ERROR",
 *   			"message": [
 *     				{
 *       				"message": "The status should fall within defined values of (pending, approved).",
 *       				"field": "status",
 *       				"validation": "in"
 *     				}
 *   			]
 * 			}
 *		}
 */
Route.put('reviewers/:id/update-status', 'ReviewerController.updateReviewerStatus')
	.middleware(['auth', getMiddlewareRoles([roles.ADMIN])])
	.validator('updateReviewerStatus');
/**
 * @api {post} /revisions/:technology Creates a Revision
 * @apiGroup Reviewers
 * @apiPermission CREATE_TECHNOLOGY_REVISION
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParam (Route Param) {technology} id Mandatory Technology ID or Slug
 * @apiParam {String} description Revision Description
 * @apiParam {String="approved","requested_changes","rejected"} assessment Reviewer Assessment
 * @apiParamExample  {json} Request sample:
 *	{
 *		"description":"Technology approved",
 *		"assessment":"approved"
 *	}
 * @apiSuccess {Number} id Revision ID.
 * @apiSuccess {String} description Revision description.
 * @apiSuccess {Number} reviewer_id Reviewer ID.
 * @apiSuccess {Number} technology_id Technology ID.
 * @apiSuccess {Date} created_at Revision Register date
 * @apiSuccess {Date} updated_at Revision Update date
 * @apiSuccess {Object} technology Technology Reviewed
 * @apiSuccess {Number} technology.id Technology ID.
 * @apiSuccess {String} technology.title Technology Title.
 * @apiSuccess {String} technology.description Technology Description
 * @apiSuccess {Boolean} technology.private Private Param
 * @apiSuccess {Boolean} technology.patent Technology Patent.
 * @apiSuccess {String} technology.patent_number Patent Number
 * @apiSuccess {String} technology.primary_purpose Primary Purpose
 * @apiSuccess {String} technology.secondary_purpose Secondary Purpose
 * @apiSuccess {String} technology.application_mode Application Mode
 * @apiSuccess {String} technology.application_examples Application Examples
 * @apiSuccess {Number} technology.installation_time Installation Time in days
 * @apiSuccess {String} technology.solves_problem Solves Problem
 * @apiSuccess {String} technology.entailes_problem Entailes Problem
 * @apiSuccess {String} technology.requirements Requirements
 * @apiSuccess {String} technology.risks Technology risks
 * @apiSuccess {String} technology.contribution Contribution
 * @apiSuccess {String} technology.status Technology Status
 * @apiSuccess {String} technology.slug Technology Slug
 * @apiSuccess {String} technology.objectID Technology ObjectID
 * @apiSuccess {Number} technology.likes Technology likes
 * @apiSuccess {Date} technology.created_at Technology Register date
 * @apiSuccess {Date} technology.updated_at Technology Update date
 * @apiSuccess {Object} reviewer Reviewer
 * @apiSuccess {Number} reviewer.id Reviewer ID.
 * @apiSuccess {Number} reviewer.user_id Reviewer Related User ID.
 * @apiSuccess {String} reviewer.status Reviewer Status
 * @apiSuccess {Date} reviewer.created_at Reviewer Register date
 * @apiSuccess {Date} reviewer.updated_at Reviewer Update date
 * @apiSuccess {Object} reviewer.user User Reviewer
 * @apiSuccess {Number} reviewer.user.id User Id
 * @apiSuccess {String} reviewer.user.first_name User First Name
 * @apiSuccess {String} reviewer.user.last_name User Last Name
 * @apiSuccess {String} reviewer.user.email User Email
 * @apiSuccess {String} reviewer.user.company User Company
 * @apiSuccess {String} reviewer.user.zipcode User Zipcode
 * @apiSuccess {String} reviewer.user.cpf User CPF
 * @apiSuccess {String} reviewer.user.birth_date User Birth Date
 * @apiSuccess {String} reviewer.user.phone_number User Phone Number
 * @apiSuccess {String} reviewer.user.lattes_id User Lattes Id
 * @apiSuccess {String} reviewer.user.address User Address
 * @apiSuccess {String} reviewer.user.address2 User Address2
 * @apiSuccess {String} reviewer.user.district User District
 * @apiSuccess {String} reviewer.user.city User City
 * @apiSuccess {String} reviewer.user.state User State
 * @apiSuccess {String} reviewer.user.country User Country
 * @apiSuccess {String} reviewer.user.status User Status
 * @apiSuccess {Number} reviewer.user.role_id User Role Id
 * @apiSuccess {String} reviewer.user.full_name User Full Name
 * @apiSuccess {Date} reviewer.user.created_at User Register date
 * @apiSuccess {Date} reviewer.user.updated_at User Update date
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 *	{
 *	 "description": "Technology approved",
 *	 "assessment": "approved",
 *	 "reviewer_id": 1,
 *	 "created_at": "2020-10-05 11:08:41",
 *	 "updated_at": "2020-10-05 11:08:41",
 *	 "id": 16,
 *	 "technology_id": 1,
 *	 "technology": {
 *	   "id": 1,
 *	   "title": "Tecnologia em Revisão",
 *	   "slug": "tekjito-fecnemij-waghat",
 *	   "description": "Du wudtuclo li hen peolne muirka dap jufebsu gozuz dafdeg bihsewut iz bi jibicor ez fudiza zag. Cilucap ih utdi ra viwoj jive be os zojiwwi lifu ded wu ligmuh ki. Vabejivu uduku hebigbu vegmi efu pouwogat on uf ono mujepi nooje dajoc ba bor guhrub us esi pi.",
 *	   "private": 1,
 *	   "thumbnail_id": null,
 *	   "likes": 0,
 *	   "patent": 0,
 *	   "patent_number": "0AOM9mnM",
 *	   "primary_purpose": "Kep za epweava halo vo useepi ofiujami fur no lake afoawu jefemif bibi vazahok. Po ewsa dudowul kija neafgi wur moumasuf pig zafbo ikuce ifutol mice. Gumber fewbiwu ce hid lokecari neov ju bidden muc fuw toorpop dajove ovupeji namaz wuca. Pi suwhu pogufiz if juk ikrez naes puwa bokhol kotimij me luw gu jase midveb gijonaama jokduhuh.",
 *	   "secondary_purpose": "Ziwtiwij lu adafobbuj buzkivkaf resole wirzerol zudonnos vaus jo pe of zozeda ru gebgawuz. Dabhuen feesi buzju fip lo za veclijed wovso letdan loc sek vec. Wad oseanofi vis kub todsuda udopuop zezaphat ligmoju nip udwuoho dugrus tutusa haojo. Numeba ajva pol no irifi der woh unukik elvuviki kilonapu futnaezu comfigfa. Voivo nema cewiseto hidbosuh zabku hec vi zoava opujar gav ket ezi raz fodmawu demet vik tehzod. Duzufin wus vek pilmi nod tian bohueci ezeaf wunihev jicno odi unciwbi difraz tuwona.",
 *	   "application_mode": "Lita ikmaleju apoevkug sojgadi fa ibi wa eh hepiluz cuniduru onuco jeorokuj bobzudiki onude leuge ju. Aw fejulo migmacso no fupevopi rati sawapof feuziej biksib tuphuwzeh canje velawtac bo pofse pefive heggug. Vu tawev isu emesat pudpatvi laad megiz fehuazi ru pitgaho objezupu sug niklawaz mokifuafa onume kap. Sene tol ifa sevora weg ej na nate suherusi toleh bevuf gi vujkij kuwutedos. Kekva mico zekpu setgig pobdac egauvipa ke omi nahcipba gisa kifo etaijdi juof ume hin il vatcag caifa. Edcufir pa ovelor kuv laso citej usdidzoz pimo sipmici cucjedva codhijod kabvagfiw nas les.",
 *	   "application_examples": "Cozbu vosene otajtah wazioz kec suwesebi fo pac re odipu kogput ro owpuvu sokabon afuno wodte jijacda. Bo usewod suwirze se tevoveidi dugaw hugsacim tassuf uz vu vepveh lig dubah. Ciz evuzos sok kiwhob wo vuf obu nol hoc sassefme vucolez gew rohuwci ciilenu. Dihbe wis halmipzih ogo ugbebo umuzovo lehbozda biw ped ze karapi apuk hijjozcij ci ohazu. Dotlajvu kozedepi iv amfun sa ilupontok zenicina itmu epe peul bal isumek ri sore zatjelul kakco cov.",
 *	   "installation_time": 224,
 *	   "solves_problem": "Wekon viugu hohezu kaijowag jile pip noom befja bol ortoaw zapocac cehtuhuv witcij genpazep bepoj. Rite tanez fijapwiv wenorcam nuaji nev ricimvo doucvo unmocaf pi imvov jemo pankegjeg jocale wi nob. Zewa gap he bozficip biwadokid vaes cupa zinwodse taecme ogaki dofsek ezi bufuki dake ci. Hitpeme poknejif elipalte uz dozizej givnu po la lugi cikkuwuk majpef havbarire. Ujfu lizico no awoaf sok lur piwekga ur zubnijcus nah gimco lifo he wajfaso lupigo.",
 *	   "entailes_problem": "Ro paktaw egolakkew ipifu ze anjo gev baj uf jije nane hid. Huwlu balnilu amli ruf iso ev fo huramkud is gos fe fikic fo giz vuj. Az si nicetjac zoptevozi omjac bafu egaku pugdam suz kuovwe voro cukwe bujfonwi fodihmet.",
 *	   "requirements": "Uppeji sirfu ihaoka cor zuzomo dukadras rub selhesi mem su daweul edfe dup. Wanhih veb peonmip howgiwfut ude ruro nel pujarfa jonwozne wiz sircu ridabdet luh besdiskej ima icnobsah. Okoodu pil oj kewja ulha naw mi ip awiamo mosbolah uk wo. Ze ewvahdi okcuze memiac witu luohnag rucru zipwuodi rakcool rucala bare luac tiisi voj guil dinfikco veicnuv juhicne. Lavo ur ki iruboguj kajiaf wiovola ge ge hugkades rufa he ilacoh ucegiem. Wuri pit huz pozbavpif di izapaba ma hisjukuv oge bo nosoile coz. Birhenos nezgooz jodzuk avwu ucuaro izcu fecic po ju upauske fugpoeca vefjib eggaisu egez.",
 *	   "risks": "Fubef nedtubpe vov guwtucbe gup ku zemcugmuw iso ahuuzone gi viji efcec veda bu. Reb uboecit po cooca gegenob isgujhun terabcij wa gufah safowjij vadaro ihipulu du za. Riba kid ja vi uwaic wiwsati hut zikhofov osi zol ijo towmape uti mi vad dicdoim. Sefeb nokcaut sab piti idifek ri sij zuler hufujpap afoet fomakcoh kik lufap. Gol omsu fotu wagkeez coofizuk ok uwalup abco feriv nic avnobnup jo.",
 *	   "contribution": "Refupon moul iv mac idafave nonilu rikbozop nid puh num fukorta dido upuuv ufawak zevludus uruta popazzij. Efobut wad jabolagi luhor jufweva ri abnaen noowe cunolez vappeb tilwubob caok somevub isulo. Egeuco bino zutsa ejeuczi bajnelmaw vini isa pi so jobapama riz wabjep bikvi juken. Buzzikom hicsid ah gu raojjil cu pokfo vahgabmip baapuceh eli ibicad luk wojuhe bugu pu teezohol gewcuglir atehi. Kap fehnis vosurah codumfew gun jiddeupe icuorovaz wemebbi adi gabho il uj kikoz.",
 *	   "status": "in_review",
 *	   "created_at": "2020-09-29 20:10:08",
 *	   "updated_at": "2020-09-30 21:12:39",
 *	   "objectID": "technology-1"
 *	 },
 *	 "reviewer": {
 *	   "id": 1,
 *	   "user_id": 15,
 *	   "status": "approved",
 *	   "created_at": "2020-09-29 20:53:22",
 *	   "updated_at": "2020-09-29 20:55:20",
 *	   "user": {
 *	     "id": 15,
 *	     "email": "alexandre.adames@gmail.com",
 *	     "status": "verified",
 *	     "first_name": "Alexandre",
 *	     "last_name": "Pontes",
 *	     "company": null,
 *	     "zipcode": null,
 *	     "cpf": null,
 *	     "birth_date": null,
 *	     "phone_number": null,
 *	     "lattes_id": null,
 *	     "address": null,
 *	     "address2": null,
 *	     "district": null,
 *	     "city": null,
 *	     "state": null,
 *	     "country": null,
 *	     "role_id": 4,
 *	     "created_at": "2020-09-29 20:50:09",
 *	     "updated_at": "2020-09-29 20:55:20",
 *	     "full_name": "Alexandre Pontes"
 *	   }
 *	 }
 *	}
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
 * @apiErrorExample {json} Resource Technology was not found
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "RESOURCE_NOT_FOUND",
 *   			"message":"The resource Technology was not found"
 * 			}
 *		}
 * @apiErrorExample {json} Status no allowed for review
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "STATUS_NO_ALLOWED_FOR_REVIEW",
 *   			"message":"The technology status: {no_allowed_status} is not allowed for review"
 * 			}
 *		}
 * @apiErrorExample {json} Validation Error: Description is required when assessment is requested_changes
 *    HTTP/1.1 400 Bad Request
 *		{
 *		 "error": {
 *		   "error_code": "VALIDATION_ERROR",
 *		   "message": [
 *		     {
 *		       "message": "The description is required when value of assessment is equal to requested_changes",
 *		       "field": "description",
 *		       "validation": "requiredWhen"
 *		     }
 *		   ]
 *		 }
 * @apiErrorExample {json} Validation Error: Description is required when assessment is rejected
 *    HTTP/1.1 400 Bad Request
 *		{
 *		 "error": {
 *		   "error_code": "VALIDATION_ERROR",
 *		   "message": [
 *		     {
 *		       "message": "The description is required when value of assessment is equal to rejected",
 *		       "field": "description",
 *		       "validation": "requiredWhen"
 *		     }
 *		   ]
 *		 }
 * @apiErrorExample {json} Validation Error: Assessment Required
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "VALIDATION_ERROR",
 *   			"message": [
 *     				{
 *       				"message": "The assessment is required.",
 *       				"field": "assessment",
 *       				"validation": "required"
 *     				}
 *   			]
 * 			}
 *		}
 * @apiErrorExample {json} Validation Error: Assessment should fall within defined values
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "VALIDATION_ERROR",
 *   			"message": [
 *     				{
 *       				"message": "The assessment should fall within defined values of (approved,requested_changes,rejected).",
 *       				"field": "assessment",
 *       				"validation": "in"
 *     				}
 *   			]
 * 			}
 *		}
 */
Route.post('revisions/:technology', 'ReviewerController.makeRevision')
	.middleware(['auth', getMiddlewarePermissions([permissions.CREATE_TECHNOLOGY_REVISION])])
	.validator('Revision');
