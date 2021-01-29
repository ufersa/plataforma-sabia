/* eslint-disable jsdoc/check-tag-names */
/* eslint-disable jsdoc/check-indentation */

const {
	getMiddlewarePermissions,
	permissions,
	getMiddlewareRoles,
	roles,
} = require('../../app/Utils/roles_capabilities');

const Route = use('Route');

/** Technology Review routes */
/**
 * @api {get} /reviews Lists All Technology Reviews
 * @apiGroup Technology Reviews
 * @apiUse Params
 * @apiSuccess {Object[]} technologyReviews Technology Reviews Collection
 * @apiSuccess {Number} technologyReviews.id Technology Review ID
 * @apiSuccess {Number} technologyReviews.user_id User User ID
 * @apiSuccess {Number} technologyReviews.technology_id Technology ID
 * @apiSuccess {String} technologyReviews.Rating Technology Review Rating
 * @apiSuccess {Number{1-5}} technologyReviews.rating Technology Review Rating
 * @apiSuccess {String[]} technologyReviews.positive Technology Review Positives
 * @apiSuccess {String[]} technologyReviews.negative Technology Review Negatives
 * @apiSuccess {Date} technologyReviews.created_at Technology Review Register date
 * @apiSuccess {Date} technologyReviews.updated_at Technology Review Update date
 * @apiSuccessExample {json} Success
 *	 HTTP/1.1 200 OK
 *	[
 *	 {
 *	   "id": 1,
 *	   "user_id": 4,
 *	   "technology_id": 2,
 *	   "Rating": "Jos mupov titifi zocun totuju poz wirnuw zupardol gebuwa zokcugag tubcefrom lamoh asimizcoz fuom al deudizo jucur. Biju etfebka tuul li buhival piv ela fes dipozi kaf ukijul ru teti. Ducu lovab fekaj vakubama ruwufike otowihi lavlalada wemlog upeun jejluw bahak lolum. Liajo kesgew ozkoawe cegif fa tipitiv deg afmib rag nosid wu nu nivjo zihe vuhtaviv diezo.",
 *	   "rating": 1,
 *	   "positive": [
 *	     "Tajecur nu ka puk dak esa vanubfum jenlafza jukok bi kac va cauja ijcama zowka vaf ut.",
 *	     "Vociv hahbaj hu kalkozbud aftivmuh esi ubuhait erunujep bawbatfic makepete nepalihiw ce jemuchib."
 *	   ],
 *	   "negative": [
 *	     "Pijzul cokezoj tu cepkat ciwawcic guce sip agojez disiz ze mohje af sad.",
 *	     "Ihvopfo usuhuppag fafvi rijso hibaz midid sogi wi mi vi ze mad wobpogcur za kopubat hifgir lih wu."
 *	   ],
 *	   "created_at": "2020-08-06 20:42:55",
 *	   "updated_at": "2020-08-06 20:42:55"
 *	 },
 *	 {
 *	   "id": 2,
 *	   "user_id": 5,
 *	   "technology_id": 17,
 *	   "Rating": "Eloseltih laterba avsor cuv unaba giwawer acikieki fepdo awazju sad bersi larkauz. Ufe evuj enaf nef tirzo kaewveg roddogo vumloz ci beze letkez huj faazaro ezuna cipobaz edu. Nolowa wesafcok idani ji tazov rateh reatbiz ponujit ikisa gofapiw ep so wuofo sesahgar ti husopudu. Giwu cu ijoci ihuolfuj ohsebbup dutilpe utegifom kogohuc mukit lun ufowotbib hu pekmonil mupmajko zal zatpuvu. Koacaha duv cahero bac wef ha ciz lir dehino ek lob riowa ar ewdifgo. Nosu upu ugkojada mam wod hezjore cukdohlam ka ge ohu heireata cog nirugewu can jiucla gozpogo ba. Begmid sop tuke useka zucde ri jaovaju ubo ipocucob datnu nat jahtig ociduzol rurlon civa ahu wavawivag.",
 *	   "rating": 4,
 *	   "positive": [
 *	     "Zepareno ehezad jinnazo eduodi aceeriba bolucuz culbeg cud waop razukpoh leoh me.",
 *	     "Siffuhtu kur nusbo ufhev ufabeusi fukifi ep ep cizatenu dif fi olbuoma to kualo goznute."
 *	   ],
 *	   "negative": [
 *	     "Ji epe ze oza faraleh obri gajsikgug rom ba zadeh pub kejun damtif omironiz.",
 *	     "Ru tekuncu veazepe hisruh ji le we mik oligejov lebzewga fo pu notawhe tijolzor lavjimra ace."
 *	   ],
 *	   "created_at": "2020-08-06 20:42:55",
 *	   "updated_at": "2020-08-06 20:42:55"
 *	 },
 *	 {
 *	   "id": 3,
 *	   "user_id": 3,
 *	   "technology_id": 30,
 *	   "Rating": "Ses be peiju eftoce weper hu gohedo fab fatgac dipe opulo hi lez ahol koavdok taz ripguwro. Jetziwwop veze vora gob pi jim devuh evedot si gim pornulgaw vufah mibhudgip olde. Mek or ifeto kosgu leberka wav ez ecadun cowza ikove uti zamelnem fe etrusnef bebnasrod bunetuno zeb cikbez. Gilu ujifan mavpognag gi heelawaj rellu gichisdit ne wi fegti tosviac gibfob etsew mazemak ceppuota.",
 *	   "rating": 1,
 *	   "positive": [
 *	     "Se tojti waciwuf ba wof zu zipizhag hezipnu pumefako dol numzu nadsoc cog evuov azipam rihse ucahogu.",
 *	     "Wef gusti nimig foj duh awza ilwomo gojucmod itibikfu oboima weidcum ucugenba."
 *	   ],
 *	   "negative": [
 *	     "Zopoda me guzisril givdow habubu ji ci ocivu murfu vukuvkuj vanokfib tebeh duke veabe.",
 *	     "Bih od gapu rokfup seniodo ki pe pud febure za gemmir purbintam obizurap."
 *	   ],
 *	   "created_at": "2020-08-06 20:42:55",
 *	   "updated_at": "2020-08-06 20:42:56"
 *	 },
 *	 {
 *	   "id": 4,
 *	   "user_id": 3,
 *	   "technology_id": 25,
 *	   "Rating": "Joadanal naoca ce baleva tur doblinibu puiciwi diw uhedog regwusva fefimoti an tu puwebeha zis bewelobup bu wecefheg. Du geficu tapipniz na uv femob gamwuwevo rosnob faj modunefe coolu ismez ar. Ifanu wiswaw acza zeosicu galaus as dot zipa oko vihdip ja ru ak. Do sato mub ziboce ega ne ot ro hojfudobo bapamut azuwan gosudbiw te baddirrid. Nih zida vupzab lebwi bukned gis rif fepov ofowigoha hisnahta mevwiciv guz ti ehidok gibakulu mu.",
 *	   "rating": 2,
 *	   "positive": [
 *	     "Sorracu raphir ilu hilozsit rina uwo zoz lu sujodze gu leda kekezood ezofocsev be wuwnabal togesmu.",
 *	     "Hok pabauva ji wonepi apnardi juk sik wav tejmawip mezwoz fata vaj uw pu."
 *	   ],
 *	   "negative": [
 *	     "Fub hiepa ejluji kobujeg ivi aj vu hosa tunhah kag banowpo herdef.",
 *	     "Rizushu ijocoffik bajumus ekatsi ge zaojesa te ci gimado mepug ave gizacdan neribfug tutub waokiik tan butgo."
 *	   ],
 *	   "created_at": "2020-08-06 20:42:55",
 *	   "updated_at": "2020-08-06 20:42:55"
 *	 },
 *	 {
 *	   "id": 5,
 *	   "user_id": 7,
 *	   "technology_id": 26,
 *	   "Rating": "Kusgipig ufcearu oron ojfaher cer boditebu nep lufuzna ciwete gufgacreg lig rus li ziuv hij juziebu rud id. Zades jibe hawikof aga vep hozagcav onzutjob hesabipu tiwor ikiamnol div oha ruj me vessipbat mu. Zuv la lip wecje fucodup nesoza pacowkip aniciud pulkeb bo ugilo lokgivvaj ke wukwic. Rohawi denakot sokhez cugfit pe letla decungow eduhek za zafoh jakra gu keiwonir godnoh cog ilhaj. Ros gicib te lazihvo alepaas mofjozus muhi uw hikumosig idwa ciromhi gebec ato vanbuf difzi.",
 *	   "rating": 1,
 *	   "positive": [
 *	     "Hir fecba mooha lo fahusero buz tep duf lu ego wen cudmotte sa bo.",
 *	     "Vacwivfi gawir hahu roj si ore dom fa wihos kitel nir ravulgu elsitulo ajdib sopwuvu ab hifuron."
 *	   ],
 *	   "negative": [
 *	     "Ar soofe dolkaz paov jogugwo wonil ub puvkohaf pobwedgad pipgodu oti polol legumas iz.",
 *	     "Selulno geri daavuig gipsobo urenivig vap teag cegkeruco kabwitat mesebuz bog gagadwa kirki."
 *	   ],
 *	   "created_at": "2020-08-06 20:42:55",
 *	   "updated_at": "2020-08-06 20:42:56"
 *	 },
 *	 {
 *	   "id": 6,
 *	   "user_id": 12,
 *	   "technology_id": 3,
 *	   "Rating": "Ulma erogu ekrisol mopagob jogodci luetoadi ci pucoja avupimro nirdus ra uwe. Jaf selnejor be ziple ihziujo etoju al tajas kawdu icso betehkiw ucetowig duzfios vulmi noofeni anjendo kaef. Buhlerwip pomucke avgepeb mon it huwnapi biceggu sefvisic limbapame widcidal jigoil oz norfuv owsumi muodozi si izu.",
 *	   "rating": 2,
 *	   "positive": [
 *	     "Erlupuhi hodaba caljuwsu guj efinaz owpot ja kazec uwu nogab zuvejgog uw cezeze ap siwejo.",
 *	     "Ba fufuc waswu sa li bupofedur ojpodde fivi memuweza poutucej wot wa arini lilbo radbif ingo."
 *	   ],
 *	   "negative": [
 *	     "Ikogok mazog colaw puhoko ribeze tusibo ozo fobrutoha fof az wedo mivwi ok.",
 *	     "Guw iphiat da cuvat ikesof kod nojotnut mukifo zipek sev gegutvoj domluwzuw lo ajo dijumez."
 *	   ],
 *	   "created_at": "2020-08-06 20:42:55",
 *	   "updated_at": "2020-08-06 20:42:56"
 *	 },
 *	 {
 *	   "id": 7,
 *	   "user_id": 3,
 *	   "technology_id": 19,
 *	   "Rating": "Efupogak meace fucfezce fobig juccelan su edarog el mupuw hufo rajco uh mepic atzil icoha huzvos. Joun holipe za epcov olre ji rupcutre sobagro izefikih tofazje sunrodoz tanus tozuz if le nuhep kepa guhwure. Huala pa luzupen rufaojo holwo tojul fuvevu voskuw kovem jukhac gohcov volozu owehugri ac fec jo tuecavo tuni. Dutlaoto fud zetuzo futac anoopnob vekifba doz izorah tevbiru ko oz amu gulorsan digtehred sepelapa tok kevowowi atofahit.",
 *	   "rating": 3,
 *	   "positive": [
 *	     "Vu gope ditbobe homebi nawnetu do vekleg cuajeile di ne kursama pedimzih meno cikvi loupme vep di.",
 *	     "Inejado mofwecal ik zisfe rirnucu seomiuga serudme cori zapavoh zinulopo wegbefo ma."
 *	   ],
 *	   "negative": [
 *	     "Zapsob hopsuamo up momeltek colofaja efobalo luzirmiz hiszecpe ig bouno rud pa docreg goacaido negovsit beb leotu sob.",
 *	     "Re taiku zalrac di zihdej buzeltiw nol foggates nuwbuhos gu omo suvin av egciha."
 *	   ],
 *	   "created_at": "2020-08-06 20:42:55",
 *	   "updated_at": "2020-08-06 20:42:56"
 *	 },
 *	 {
 *	   "id": 8,
 *	   "user_id": 13,
 *	   "technology_id": 3,
 *	   "Rating": "Lu ikjafzi pejhufaz fem je danirivi top ruldetha ziwupiru tuweropo dov fi. Opo gekkasaj tekinos olelozron agofigi so zo lepwiv deczih bibrukmoj ciktunog ikasetwij. Tihit cajobop bod guhetmig ci cealo vion campok oj rif taduvpog otu ra jaerafi. Gogvica kalgeamu podfa iwsebmi sonuhkum fu mevinzan gentum raogadev kajfus davir niah regaav du kalto maah. Zagosiv pohu sa jucekub cofuha fevun pa huvuva fo zun ciguv huvet ejopimzor.",
 *	   "rating": 3,
 *	   "positive": [
 *	     "Uskibbuw im icowiz ude kazaf mugek kogisur wuhojuk ohohun afmagto ah ir bafoni ebo bifaviz ojuwefpu vobamer uhaczu.",
 *	     "Ali ha inzuot red zuojeiso ekmofim haaso butzuzi losema dikebu gobnownem ted hac anesikweg epzovwaw."
 *	   ],
 *	   "negative": [
 *	     "Feej ujje cuvarbe vanurfoj wugbudto bugowo temeduzij hazfa ta bigfehrov zuhom agku ezekav sic sah ovovoz.",
 *	     "Veulu nogudhek mabvuc biop oleiwulu nobudju vonwi kojuwmik futmaoze rej hapvu gabo kuj ved veb."
 *	   ],
 *	   "created_at": "2020-08-06 20:42:55",
 *	   "updated_at": "2020-08-06 20:42:55"
 *	 },
 *	 {
 *	   "id": 9,
 *	   "user_id": 6,
 *	   "technology_id": 16,
 *	   "Rating": "Zer pur wennizta pujlu kasdi supo cid raw paj zohfewe wipol zapdozub ziv rogug kef uzdi. Garim dizuti udu winjij sutlev baopo oto weba parmijon mornuju cewwaok tojiwe ges woje vo. Vodef lagpabu reg mak ihi fehtakjej ucwiti ajufaow wonnutsi omeica cocezjuc ohugak lon nun.",
 *	   "rating": 5,
 *	   "positive": [
 *	     "Mummiflim jofih zeubifok cag guf hi ho ko cutah hicuj wofi ta.",
 *	     "Ar ata nulfa sazov nimze eviahu zoodu viur bo hahuba zueh ziupumi."
 *	   ],
 *	   "negative": [
 *	     "Se sinfac ti fopipi fecepo wofsagon muz hi vu redeb gav gamhahan orihul tawekhe givpenjok docuzet.",
 *	     "Ma gijoze lovdamwoc sek un loarolo nob lu voto fin meb titike mem jotefha rupez."
 *	   ],
 *	   "created_at": "2020-08-06 20:42:55",
 *	   "updated_at": "2020-08-06 20:42:56"
 *	 },
 *	 {
 *	   "id": 10,
 *	   "user_id": 13,
 *	   "technology_id": 21,
 *	   "Rating": "Vuwkibpe legudjek ulos ane lurdobe jam rijirzil ke ke komibi izuto neriwa mes iziorap fuk ja hanruguz. Ote ameku nehpa ked sivjajlel vufulzi aw kevakis giku poshas jahocmi bil. Tuditjan oranedhe belremic fizdo hirbiige vidtiaj ruk fe ipididwi fuwwa sokkode mipjopuf. Nalalgo rojej in uwwarge to rawiwhu azpoji ovla ipo osuiv gerri sormum nikdaano lobco fepilal now ka. Pa onede ja acahohud miulja suvhioza bocu va meje tesabel hoffo di souvvu voziz vuwejpul sirce ru.",
 *	   "rating": 3,
 *	   "positive": [
 *	     "Ca letegos luhziho de ocofe zehhosvew kud vugsufja acmib wiume birbe wod janpur veg evmosig peor vuksow maef.",
 *	     "Kuiketud bilji milorone ilaluh ot kurbecpa hag buc moz okiscam loluz idima nacge uktek uni kashos."
 *	   ],
 *	   "negative": [
 *	     "Buh supag asdutek ibeev gedsu leja fu sojhad gipi zu atuni vobmedupa penazmaf tofpersi.",
 *	     "Zataf wemo wojugkog sisjacij ju orilose newip degzaz amiuri eja tevfemos gallikoho fopvi curo wajlegum oru."
 *	   ],
 *	   "created_at": "2020-08-06 20:42:55",
 *	   "updated_at": "2020-08-06 20:42:56"
 *	 }
 *	]
 */
Route.get('reviews', 'TechnologyReviewController.index').middleware(['handleParams']);
/**
 * @api {post} /reviews Creates a new Technology Review
 * @apiGroup Technology Reviews
 * @apiPermission CREATE_TECHNOLOGY_REVIEWS
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParam {String} Content Mandatory Technology Review Content.
 * @apiParam {Number{1-5}} rating Mandatory Technology Review Rating.
 * @apiParam {String[]} positive Mandatory Technology Review Positives.
 * @apiParam {String[]} negative Mandatory Technology Review Negatives.
 * @apiParam {Number} technologyId Mandatory Technology ID for review.
 * @apiParamExample  {json} Request sample:
 *	{
 *		"content":"A test content for review",
 *		"rating":5,
 *		"positive":["positive 01","positive 02"],
 *		"negative":["negative 01","negative 02"],
 *		"technologyId": 1
 *	}
 * @apiSuccess {Number} id Technology Review ID
 * @apiSuccess {Number} user_id User User ID
 * @apiSuccess {Number} technology_id Technology ID
 * @apiSuccess {String} Content Technology Review Rating.
 * @apiSuccess {Number{1-5}} rating Technology Review Rating.
 * @apiSuccess {String[]} positive Technology Review Positives.
 * @apiSuccess {String[]} negative Technology Review Negatives.
 * @apiSuccess {Date} created_at Technology Review Register date
 * @apiSuccess {Date} updated_at Technology Review Update date
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
 *	 "technology_id": 1,
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
 *@apiErrorExample {json} Validation Error: Technology ID Required
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "VALIDATION_ERROR",
 *   			"message": [
 *     				{
 *       				"message": "The technologyId is required.",
 *       				"field": "technologyId",
 *       				"validation": "required"
 *     				}
 *   			]
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
Route.post('reviews', 'TechnologyReviewController.store')
	.middleware([
		'auth',
		'registrationCompleted:check_personal_data',
		getMiddlewarePermissions([permissions.CREATE_TECHNOLOGY_REVIEWS]),
	])
	.validator('StoreTechnologyReview');
/**
 * @api {get} /reviews/:id Gets a single Technology Review
 * @apiGroup Technology Reviews
 * @apiParam (Route Param) {Number} Mandatory Technology Review ID.
 * @apiUse Params
 * @apiParamExample  {json} Request sample:
 * /reviews/1
 * @apiSuccess {Number} id Technology Review ID
 * @apiSuccess {Number} user_id User User ID
 * @apiSuccess {Number} technology_id Technology ID
 * @apiSuccess {String} Content Technology Review Rating.
 * @apiSuccess {Number{1-5}} rating Technology Review Rating.
 * @apiSuccess {String[]} positive Technology Review Positives.
 * @apiSuccess {String[]} negative Technology Review Negatives.
 * @apiSuccess {Date} created_at Technology Review Register date
 * @apiSuccess {Date} updated_at Technology Review Update date
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 *	{
 *	 "id": 1,
 *	 "user_id": 4,
 *	 "technology_id": 2,
 *	 "content": "Jos mupov titifi zocun totuju poz wirnuw zupardol gebuwa zokcugag tubcefrom lamoh asimizcoz fuom al deudizo jucur. Biju etfebka tuul li buhival piv ela fes dipozi kaf ukijul ru teti. Ducu lovab fekaj vakubama ruwufike otowihi lavlalada wemlog upeun jejluw bahak lolum. Liajo kesgew ozkoawe cegif fa tipitiv deg afmib rag nosid wu nu nivjo zihe vuhtaviv diezo.",
 *	 "rating": 1,
 *	 "positive": [
 *	   "Tajecur nu ka puk dak esa vanubfum jenlafza jukok bi kac va cauja ijcama zowka vaf ut.",
 *	   "Vociv hahbaj hu kalkozbud aftivmuh esi ubuhait erunujep bawbatfic makepete nepalihiw ce jemuchib."
 *	 ],
 *	 "negative": [
 *	   "Pijzul cokezoj tu cepkat ciwawcic guce sip agojez disiz ze mohje af sad.",
 *	   "Ihvopfo usuhuppag fafvi rijso hibaz midid sogi wi mi vi ze mad wobpogcur za kopubat hifgir lih wu."
 *	 ],
 *	 "created_at": "2020-08-06 20:42:55",
 *	 "updated_at": "2020-08-06 20:42:55"
 *	}
 * @apiErrorExample {json} Resource Technology Review was not found
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "RESOURCE_NOT_FOUND",
 *   			"message":"The resource TechnologyReview was not found"
 * 			}
 *		}
 */
Route.get('reviews/:id', 'TechnologyReviewController.show').middleware(['handleParams']);
/**
 * @api {put} reviews/:id Updates a Technology Review
 * @apiGroup Technology Reviews
 * @apiPermission UPDATE_TECHNOLOGY_REVIEW or UPDATE_TECHNOLOGY_REVIEWS
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParam (Route Param) id Mandatory Technology Review ID
 * @apiParam {String} [content] Technology Review Content.
 * @apiParam {Number{1-5}} [rating]  Technology Review Rating.
 * @apiParam {String[]} [positive]  Technology Review Positives.
 * @apiParam {String[]} [negative]  Technology Review Negatives.
 * @apiParamExample  {json} Request sample:
 *	{
 *		"content":"Updated content review",
 *		"rating":4,
 *		"positive":["updated positive 01", "updated positive 02"],
 *		"negative":["updated negative 01", "updated negative 02"]
 *	}
 * @apiSuccess {Number} id Technology Review ID
 * @apiSuccess {Number} user_id User User ID
 * @apiSuccess {Number} technology_id Technology ID
 * @apiSuccess {String} Content Technology Review Rating.
 * @apiSuccess {Number{1-5}} rating Technology Review Rating.
 * @apiSuccess {String[]} positive Technology Review Positives.
 * @apiSuccess {String[]} negative Technology Review Negatives.
 * @apiSuccess {Date} created_at Technology Review Register date
 * @apiSuccess {Date} updated_at Technology Review Update date
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 *	{
 *	 "id": 11,
 *	 "user_id": 1,
 *	 "technology_id": 1,
 *	 "content": "Updated content review",
 *	 "rating": 4,
 *	 "positive": "[\"updated positive 01\",\"updated positive 02\"]",
 *	 "negative": "[\"updated negative 01\",\"updated negative 02\"]",
 *	 "created_at": "2020-08-19 19:21:26",
 *	 "updated_at": "2020-08-19 20:30:28"
 *	}
 *@apiUse AuthError
 *@apiError (Bad Request 400) {Object} error Error object
 *@apiError (Bad Request 400) {String} error.error_code Error code
 *@apiError (Bad Request 400) {Object[]} error.message Error messages
 * @apiErrorExample {json} Resource Technology Review was not found
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "RESOURCE_NOT_FOUND",
 *   			"message":"The resource TechnologyReview was not found"
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
Route.put('reviews/:id', 'TechnologyReviewController.update')
	.middleware([
		'auth',
		getMiddlewarePermissions([
			permissions.UPDATE_TECHNOLOGY_REVIEW,
			permissions.UPDATE_TECHNOLOGY_REVIEWS,
		]),
	])
	.validator('UpdateTechnologyReview');
/**
 * @api {delete} /reviews/:id Deletes a Technology Review
 * @apiGroup Technology Reviews
 * @apiPermission ADMIN
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParam {Number} id Mandatory Technology Review ID.
 * @apiParamExample  {json} Request sample:
 *	/reviews/11
 * @apiSuccess {Boolean} success Success Flag
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *		"success":"true"
 *    }
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
 *@apiErrorExample {json} Resource Technology Review was not found
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "RESOURCE_NOT_FOUND",
 *   			"message":"The resource TechnologyReview was not found"
 * 			}
 *		}
 */
Route.delete('reviews/:id', 'TechnologyReviewController.destroy').middleware([
	'auth',
	getMiddlewareRoles([roles.ADMIN]),
]);
