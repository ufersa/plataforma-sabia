/* eslint-disable jsdoc/check-tag-names */
/* eslint-disable jsdoc/check-indentation */
const { getMiddlewarePermissions, permissions } = require('../../app/Utils/roles_capabilities');

const Route = use('Route');

/** BookMarks Routes */
/**
 * @api {post} /bookmarks Bookmarks technologies
 * @apiGroup Bookmarks
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParam {Number[]} technologyIds Mandatory Technology ID Array.
 * @apiParamExample  {json} Request sample:
 *    {
 *		"technologyIds": [1,3,5]
 *    }
 * @apiSuccess {Object[]]} bookmarks Bookmarks Collection
 * @apiSuccess {Number} bookmarks.technology_id Technology ID.
 * @apiSuccess {Number} bookmarks.user_id User ID.
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 *	[
 *	 {
 *	   "technology_id": 1,
 *	   "user_id": 1
 *	 },
 *	 {
 *	   "technology_id": 3,
 *	   "user_id": 1
 *	 },
 *	 {
 *	   "technology_id": 5,
 *	   "user_id": 1
 *	 }
 *	]
 *@apiUse AuthError
 *@apiError (Bad Request 400) {Object} error Error object
 *@apiError (Bad Request 400) {String} error.error_code Error code
 *@apiError (Bad Request 400) {Object[]} error.message Error messages
 *@apiErrorExample {json} Validation Error: technologyIds is required
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "VALIDATION_ERROR",
 *   			"message": [
 *     				{
 *       				"message": "The technologyIds is required.",
 *       				"field": "technologyIds",
 *       				"validation": "required"
 *     				}
 *   			]
 * 			}
 *		}
 *@apiErrorExample {json} Validation Error: technology Id should exist in technologies
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "VALIDATION_ERROR",
 *   			"message": [
 *     				{
 *       				"message": "The technologyIds.0 should exist in technologies",
 *       				"field": "technologyIds.0",
 *       				"validation": "exists"
 *     				}
 *   			]
 * 			}
 *		}
 */
Route.post('bookmarks', 'UserBookmarkController.store')
	.middleware(['auth'])
	.validator('StoreUserBookmark');
/**
 * @api {get} /user/:id/bookmarks Gets User Bookmarks
 * @apiGroup Bookmarks
 * @apiPermission LIST_BOOKMARK or LIST_BOOKMARKS
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParam (Route Param){Number} id Mandatory User ID.
 * @apiUse Params
 * @apiParamExample  {json} Request sample:
 *	/user/1/bookmarks
 * @apiSuccess {Object[]} technologies Technology Collection
 * @apiSuccess {Number} technologies.id Technology ID.
 * @apiSuccess {String} technologies.title Technology Title.
 * @apiSuccess {String} technologies.description Technology Description
 * @apiSuccess {Boolean} technologies.private Private Param
 * @apiSuccess {Boolean} technologies.intellectual_property Technology Intellectual Property.
 * @apiSuccess {Boolean} technologies.patent Technology Patent.
 * @apiSuccess {String} technologies.patent_number Patent Number
 * @apiSuccess {String} technologies.primary_purpose Primary Purpose
 * @apiSuccess {String} technologies.secondary_purpose Secondary Purpose
 * @apiSuccess {String} technologies.application_mode Application Mode
 * @apiSuccess {String} technologies.application_examples Application Examples
 * @apiSuccess {Number} technologies.technologies.installation_time Installation Time in days
 * @apiSuccess {String} technologies.solves_problem Solves Problem
 * @apiSuccess {String} technologies.entailes_problem Entailes Problem
 * @apiSuccess {String} technologies.requirements Requirements
 * @apiSuccess {String} technologies.risks Technology risks
 * @apiSuccess {String} technologies.contribution Contribution
 * @apiSuccess {String} technologies.status status
 * @apiSuccess {String} technologies.slug Technology Slug
 * @apiSuccess {String} technologies.objectID Technology ObjectID
 * @apiSuccess {Number} technologies.likes Technology likes
 * @apiSuccess {Date} technologies.created_at Technology Register date
 * @apiSuccess {Date} technologies.updated_at Technology Update date
 * @apiSuccess {Object} technologies.pivot User Technology Pivot Table
 * @apiSuccess {Number} technologies.pivot.technology_id Technology ID
 * @apiSuccess {Number} technologies.pivot.user_id User User ID
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 [
  {
    "id": 10,
    "title": "Luimwu wuwiga jaklip.",
    "slug": "luimwu-wuwiga-jaklip",
    "description": "Dajeram dewnin jug fapha sidtoco izdad hume gihas ebdotiw irnuceh gevnuw jeetesit epe senita futduda. Nufecad arazed buwkelcir hofma liv uneuta kedociba ojvefhi bo esgiob pa raru dac cuv ka hukibheg kus. Awogabe kilduk lofmum anoorme vafuj jolug ta tomsobir uvo mulrog hudsus ufekolku wanac. Toisa novdevtaf cibod almon jivso narjefoke unlufud bizak dotaw wazicwa wam legnuba viwubez ub.",
    "private": 1,
    "thumbnail": "https://rocketfinalchallenge.s3.amazonaws.com/card-image.jpg",
    "likes": 4,
    "intellectual_property": 0,
    "patent": 0,
    "patent_number": "BHly9Wym",
    "primary_purpose": "Uj ze zoravo lifap ol zu vava wasenap mer mebsa sok zuev vog va debuv iwgoz. Hew jaafofot caz mobe fu bene foehe tivmu buras ti maf ho. Devo pifez lipjagki kearovo fop puj be idi for zipehin voclizuj cimziwi peli ra.",
    "secondary_purpose": "Kow kup zi goguflim zihnamuki tofiw ko nod nushubu azga bidacile rolemta seowazo bocasuco cuz. Amuze gezjafam fa ebile tokezi wisak hizpemwe fepilpop ekivu ma zuap wi riwcof. Onukej tazuvaka cob tag hude po bofhin macec lezersu upesam jidfutmuv pammo. Boobjav osdu erucokcig enamu no bu mutvardu dip sane en todri pefejeb herjeih ki zokjozlil bavuhi cukab ol. Ihla ciwew ve ohu har goimhu umtadnaz ujasu fifitud nupgov hej ehomaec akavev. Gat adebacemo suer zijko opa kezlu lekzic tivuco aboeto ihoru valu mivsaw ha idnut gonaklez zumoj. Pinizew bo cusi de wadiwuv guedi bewi vud wav meteda uje eci kebvi hov met liveg.",
    "application_mode": "Vovelumu ba rij ho umuuto mugpuhali zivu urnessav ga nivocmis luvinjow rivbuwmo viki gurfiw ava ubputu hoskurus. Nik riisa leb wel lapi do po cotcalhah azipoopi capem nihesru ehonahag gewlokip vearife dufhus uh ta fic. Nag iru vevanopu puze pebor futmo on mecosrab tenocu ba nud go ahgape cevizur.",
    "application_examples": "Lac gus hekzomkum ug nofu isusum la teog seefwu gigi lemose sobvin felwozgoz lufduwut vefnutraf vetu az. Nov zuka zatij bu kuv sew aga femgag un lewu cesej nibogo va imolav webu cunaze. Ese fe disnibwep uhigide ukhod jetvi zo hum ro nopge witumnu jap fova ninmu voma wegito izevu nuk. Ja zeb ti ledib kevged vo mivbijnis hegiru irzu ser ba huvuod rudamap zo isobo. Hi edda pikfotosi nor hab hahfim virleze mahitu huhiku dudatzoz ajilappig konerfu pupat. Bo jutavdi pedaraju vim tepil sipamivu vuvir ulukef rurwob alje ekuke donek idi se seoz dahtu pohjomaf. Beocejik akoomijib palta repe ada rug mokwufpu fuvolaz kunu iwa kibja ocgiz dan.",
    "installation_time": 82,
    "solves_problem": "Utkeoz fustaf vo haksi wudibef nulob hu sulbi zuuwrur wiejalap vuzne dab tejfede reldibu nocnoc. Nagin ij cip beke umi igois cewop kubka une galitho ga pe. Rizuded gu redo site peg ladtuspi pecze renevbew ca ojuve dogiwis bujkem ho jo. Ad co uvafinok co zidpok vuj utivope gaer na ju celim ak soc ofuelukes bezga nalic fewula. Datdow ojaho kiali rezca si deslas hum elizerbih warligop disuj jijibesuw be derfur vofwum orefalek lab bofiena wimajpuc. Niiru rokeha lev vecdugo putcon how wohgunon icu focmoz jajiino bobfaz sufjekew gabgifise awudo zepubbi ud co.",
    "entailes_problem": "Muvtanek sazarimo gogane suvinu lovevam nuk muik ketgesiz fohtitgev jiosnup niirza huopu. Seisi befgewi jaot jongu sahu jatuni ha udamopgo red vihzec zepur suked mer lobpifhu. Buzutsej peivpi papbu ajul botohjom mihac do hofne zapa coficel kano fukrowa. Ke hugeivu umo cojli ezaco ti nerrefvir dih jieb took po eludezaf owiginob toj jer. Jap saicagah izeuciete fe lo fasif wuriba zo wu bolacti haraigo ulegujog hivreces. Wocorwim cu duvab ta duv cilnud upi ma segeam zal boijopif uno va isja ikaca kaku ciwo. Mamu uza wuhod gaf ojuka radnok inouve wumuwur iv moal jajwezmic bim lub wuznapja ewu eze jumaca.",
    "requirements": "Mew za kahavgo itoajocot ipopo va wiguf pemuj podim ar vaf cezgotapi wal sek vul. Jiloj lir zekegol nulisec wo hamo baih rerte zenname sohupdu pamjevfaw rahivuj ocenojo guwrokal keuw vizno ussi. Momopnu fes po nezutimo bu jafjutfij uwducep sitzupic so rez dicci icwu fu bisul. Wem eto waveguv zug fa decgegaw fucpa nedjeoco bogif kujomas ewekaw ci hov ruzewpic ud firzofen toacca cuof. Kut taczi ego zo wusiz po sa ilcerev jaavu ruk koujoco bevic hisuba ot. Kahmebuva fut bavjun landol oha omoperud vut zi asokitcow tir hoftakta ito.",
    "risks": "Po ri siglo fu jukive rushu uba ciwruete figonne jit fibgu ko rupid vubva red. Gihgo elzifal kehbe iwe ki tic nitjiwav ewa wetga ore nadtu monidcuc tibecusif isosuzme hapwu enjupi. Nu siwit zibudaj le fetuh perep zuz eku ij ju kah perasuf uvruc ro ipacune defpezga meek zubese. Bek pudbec wakic vukocupe fidtam uzzade jifeb tov rookugu vigafi ufawuwfu zew mug agalo powhag edeki co. Gepat nalvos rofafe oc le osoze zikoes owo etubnaz luvos gajesipe zedvapgu megawaer tocmu fepcan. Rimozhaj pawid otasit raehu lalfawa va cefoawo girpergi pefe kaiju gehosnir umgefru gilibon hozsori mani. Osi sev vu omuwaz wiskad ja bo vu owgemsup ehjaca hedi ce.",
    "contribution": "Kan peapebo ho lateat zu heb komit orazaflo pobmedob ugtoc nizim rib pefunoz. Mesub uditep zoenebu ovvesoni bufbowde cis itevem som touwu mimub bel lip ro zez lamuar ula. Feobjo deza pep cosi mokce wu sil teshemef panis porsari mub ikvi gi okot obo holkap ono aj.",
    "status": "DRAFT",
    "created_at": "2020-08-06 20:42:00",
    "updated_at": "2020-08-06 20:42:59",
    "objectID": "technology-10",
    "pivot": {
      "technology_id": 10,
      "user_id": 1
    }
  },
  {
    "id": 17,
    "title": "We cu nauwi.",
    "slug": "we-cu-nauwi",
    "description": "Mejaute uvige cukoz lub ici bimsiwda fuze vesumap mipsulac ibju pi pe daha davli tot riiwbi etuoni. Dalipesoh fiz mo hogbi oha mageniw vawibufi si lepvuen mosahep lel dunjen girva med. Nunohhi ne iwunu ge punseb batfiviz not sispik toome gic ku cow tibeti zavaful mo roh wof romfavwif. Ido lut nuhegji fof zebijkel baz segoug he tenuro sutu ni kusju henzilafo no mumi. Kutozpa kibob vobaz erzepvo huruuhi cih acipieg genro jo odic nucbebewi luwag.",
    "private": 1,
    "thumbnail": "https://rocketfinalchallenge.s3.amazonaws.com/card-image.jpg",
    "likes": 1,
    "intellectual_property": 1,
    "patent": 1,
    "patent_number": "GquiJG6q",
    "primary_purpose": "Duwof na cejip nok moshejuke ri cihgav ijowa be ke ohkiwref ro purjiure ziazu jih tev eb ede. Tohik rucma nuh macsil hunera oladogi zav alikeco kofag gos ed fohi bucalir. Dohfi mifaj fes fim oz agi do ziojfu votvom bibehkeb vejomo tezjol vaihutu zipeje.",
    "secondary_purpose": "Ce tibsa nut bacji saido ka evhabe ap un fit duzelopon biwam wat jalmo ovi pij. Fegaora uzepud olari wapa do nool foro nufpocis gitkih co he feb zafus wivapje. Wiwefwaj wozha fe depi amugon lonkozin zin weeno olirezdis adi cobwuv hahwes utanaglu giw adozagem. Goju wicwaij rofatrev deg ezo zo ipnoub jacconno jel powocfem zewes eratu. Not uda je ube rebajcet ravwaafa eho babe pulfapcu tod sef nor gepak. Gegup juzug reiv mav mir jofaspi sa hilekod did vufavjog az lam rorfen os onulabfi huddici nopnehef. Sizej sa cag wu ra gi fezuno mig sovit uceb kehosu hasiwwu kuncovu je.",
    "application_mode": "Tuzjagam nozuvfus ri pifvopsu ho ga gadvow aki ciwubrad lubis owe hipoani. Me nob tu zaar kus am kudogje zoobaec ti goalvi evu zi kejas umo zonetenu uledobe. Ni jo diwrajoc gijawzad lawligol joodi tonebe mul gu edti bid nebsu po. Hot mir omu un nodecoro bak lugo rozafope dob bin betib jametad ubo.",
    "application_examples": "Belku fovrafec ra zigab afjibug vuz pad hubi numig ipunuhu tiw tij. Bagot guvev kevcoga futlale wipvamji aprav zugewib sevafe ge pozkozo sided ji. Tobop azlos lu vuhiwof gos lo anhemi tawidi huc ku mim wat zeiho ci jemalew ge usnu. Hogi hodit hajto epado noov vuc boseuwu maizida gepeco gezemobeb waadepeg odo gupuldu itledat muvkur zul awoilca adnecwe. Vomew zonpamjag zimmegat ro oho hetjuloji udsokru war uruver mehajret ewtez da nograzsup erovuv fuoti hulonip egi epkesdo.",
    "installation_time": 713,
    "solves_problem": "Odo lafmohdek ahudmis gotwev wucheptat agvev cijumuje uge ki mocusga wa eshij ven muva ahu. Cabfeswe zemi wuhzu ki rigfoere mud pestow muv bilidwul umoobeti menmol ocipo japwus jignofon. Suc naez libeefu vues ziaba icuiv riwo osopi to hutimube ki fa moflu cewuva budutuv pofji jahvolon buzijo. Lueb cuozmoc pufitafo dawjep kezofi ejitaz voj hip isbifmi ub iwalesohu vo mokjajeb betiv sac oglescet. Tul osre di ilaesiloj isitez bo mazgi wakeho uriubhu gijavbo edmin vegud sokit lorro idemordul tafwi. Ero wupuofe evsemuve va focbop gidapi lukudwu ubwa ij cal geg ja kosumso.",
    "entailes_problem": "Uboham ra kupeof oneijaoso kavios ewti tu sekad tup aze corpokub woc. Tucfare tefedma govajka gaju ab hed hupe nerso nejato behwidi zehuc oki. Wakigjed tu kuhoppe okusva laho hipnij tadtuhij guv vivsiv vibe wilerfo worofi. Taiveab so gilvo tej untuj hotcawo fiic garlu taprudoj abigamtuh dawav tivkob acemean zolku puore zokve. Lob bim ado vel hohor mucidim dimule domiw ezaopsum viok cumikwun pamadmer fu. Wuzwusuz izwuzuf nozum fisoce jah muzfines agpurah vomifsoj kuwaw nov nozewfud mu leedre gofde nul waraebi ek zehwur. Cilvurwo name ovigoume gimne apmivit cilac hujerob jec uge otutilno zehlalu hijju.",
    "requirements": "Doneva bop pirco baik veh epa atoweskap of ba zijkuc se lej. Ubohobdu dob ufnimles iregurir uw ru pubacri ecsih cez ivtiztos ko cut rugzieve. Ap parte bociki elzal in sib nor li agi lof ravobol nasbi fuvabo be mewetgid fina sope.",
    "risks": "Nogjekcod unma wo sombetas epmub nugon vifatzam wov as kohupu iha fe wanojnok. Jodkacfo buf anutascu zuj ze jeduk ne ma ma puveg ihe toc. Ev magcu zoge ek apo daho vofe udadigo mih sedvok fe ma socu risicoke puloh wufum.",
    "contribution": "Raes voz catdom konjus kuen jahowaf me usigiw daffivu gavsalija morazfe lizpa contuwtoc cumvo. Asuciswo gi cetpe posef utefowa kazfagab hacig adeozefuv kiec acjim zeru moro agase he fetelzu. Wozome dovloem hij sodegcof zugiboci zohhitnan so riw be vasatfez ti lozudwaj mogeupa teul gilwifo kiwu. Ighucu lokijdo dil ononugwe pum bala le kila ru ehesefi zehrewe pudof cuzlarlo wafip. Zajuka odahu cuvano zaida pik vikizame emdepkek fe cuj busibadah nez pit lubzah rek ku waz. Oki hub onu ekepian ded ra tam re hu hopefu mu femaj higdat atten cuw.",
    "status": "DRAFT",
    "created_at": "2020-08-06 20:42:00",
    "updated_at": "2020-08-06 20:42:59",
    "objectID": "technology-17",
    "pivot": {
      "technology_id": 17,
      "user_id": 1
    }
  }
  ...
  ]
 *@apiUse AuthError
 *@apiError (Bad Request 400) {Object} error Error object
 *@apiError (Bad Request 400) {String} error.error_code Error code
 *@apiError (Bad Request 400) {String} error.message Error message
 *@apiErrorExample {json} Resource User was not found
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "RESOURCE_NOT_FOUND",
 *   			"message":"The resource User was not found"
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
Route.get('/user/:id/bookmarks', 'UserBookmarkController.show').middleware([
	'auth',
	getMiddlewarePermissions([permissions.LIST_BOOKMARK, permissions.LIST_BOOKMARKS]),
	'handleParams',
]);
/**
 * @api {get} /bookmarks Lists All Users with your bookmarks
 * @apiGroup Bookmarks
 * @apiPermission LIST_BOOKMARKS
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParam (Query Param) {Number} [technologyId] Optional Technology ID filter, if is passed returns all user that bookmarks the tecnology
 * @apiUse Params
 * @apiSuccess {Object[]} userBookmars User Bookmarks Collection
 * @apiSuccess {Number} userBookmars.id User Id
 * @apiSuccess {String} userBookmars.first_name User First Name
 * @apiSuccess {String} userBookmars.last_name User Last Name
 * @apiSuccess {String} userBookmars.email User Email
 * @apiSuccess {String} userBookmars.company User Company
 * @apiSuccess {String} userBookmars.zipcode User Zipcode
 * @apiSuccess {String} userBookmars.cpf User CPF
 * @apiSuccess {String} userBookmars.birth_date User Birth Date
 * @apiSuccess {String} userBookmars.phone_number User Phone Number
 * @apiSuccess {String} userBookmars.lattes_id User Lattes Id
 * @apiSuccess {String} userBookmars.address User Address
 * @apiSuccess {String} userBookmars.address2 User Address2
 * @apiSuccess {String} userBookmars.district User District
 * @apiSuccess {String} userBookmars.city User City
 * @apiSuccess {String} userBookmars.state User State
 * @apiSuccess {String} userBookmars.country User Country
 * @apiSuccess {String} userBookmars.status User Status
 * @apiSuccess {Number} userBookmars.role_id User Role Id
 * @apiSuccess {String} userBookmars.full_name User Full Name
 * @apiSuccess {Date} userBookmars.created_at User Register date
 * @apiSuccess {Date} userBookmars.updated_at User Update date
 * @apiSuccess {Object[]} userBookmars.bookmarks Bookmark Array
 * @apiSuccess {Number} userBookmars.bookmarks.id Technology ID.
 * @apiSuccess {String} userBookmars.bookmarks.title Technology Title.
 * @apiSuccess {String} userBookmars.bookmarks.description Technology Description
 * @apiSuccess {Boolean}userBookmars.bookmarks.private Private Param
 * @apiSuccess {Boolean}userBookmars.bookmarks.intellectual_property Technology Intellectual Property
 * @apiSuccess {Boolean}userBookmars.bookmarks.patent Technology Patent
 * @apiSuccess {String} userBookmars.bookmarks.patent_number Patent Number
 * @apiSuccess {String} userBookmars.bookmarks.primary_purpose Primary Purpose
 * @apiSuccess {String} userBookmars.bookmarks.secondary_purpose Secondary Purpose
 * @apiSuccess {String} userBookmars.bookmarks.application_mode Application Mode
 * @apiSuccess {String} userBookmars.bookmarks.application_examples Application Examples
 * @apiSuccess {Number} userBookmars.bookmarks.technologies.installation_time Installation Time in days
 * @apiSuccess {String} userBookmars.bookmarks.solves_problem Solves Problem
 * @apiSuccess {String} userBookmars.bookmarks.entailes_problem Entailes Problem
 * @apiSuccess {String} userBookmars.bookmarks.requirements Requirements
 * @apiSuccess {String} userBookmars.bookmarks.risks Technology risks
 * @apiSuccess {String} userBookmars.bookmarks.contribution Contribution
 * @apiSuccess {String} userBookmars.bookmarks.status status
 * @apiSuccess {String} userBookmars.bookmarks.slug Technology Slug
 * @apiSuccess {String} userBookmars.bookmarks.objectID Technology ObjectID
 * @apiSuccess {Number} userBookmars.bookmarks.likes Technology likes
 * @apiSuccess {Date} userBookmars.bookmarks.created_at Technology Register date
 * @apiSuccess {Date} userBookmars.bookmarks.updated_at Technology Update date
 * @apiSuccess {Object} userBookmars.bookmarks.pivot User Technology Pivot Table
 * @apiSuccess {Number} userBookmars.bookmarks.pivot.technology_id Technology ID
 * @apiSuccess {Number} userBookmars.bookmarks.pivot.user_id User User ID
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 *  [
 *   {
 *     "id": 1,
 *     "email": "alexandre.adames@gmail.com",
 *     "status": "verified",
 *     "first_name": "Alexandre",
 *     "last_name": "pontes",
 *     "company": null,
 *     "zipcode": null,
 *     "cpf": null,
 *     "birth_date": null,
 *     "phone_number": null,
 *     "lattes_id": null,
 *     "address": null,
 *     "address2": null,
 *     "district": null,
 *     "city": null,
 *     "state": null,
 *     "country": null,
 *     "role_id": 1,
 *     "created_at": "2020-08-06 20:41:39",
 *     "updated_at": "2020-08-06 20:41:39",
 *     "full_name": "Alexandre pontes",
 *     "bookmarks": [
 *       {
 *         "id": 10,
 *         "title": "Luimwu wuwiga jaklip.",
 *         "slug": "luimwu-wuwiga-jaklip",
 *         "description": "Dajeram dewnin jug fapha sidtoco izdad hume gihas ebdotiw irnuceh gevnuw jeetesit epe senita futduda. Nufecad arazed buwkelcir hofma liv uneuta kedociba ojvefhi bo esgiob pa raru dac cuv ka hukibheg kus. Awogabe kilduk lofmum anoorme vafuj jolug ta tomsobir uvo mulrog hudsus ufekolku wanac. Toisa novdevtaf cibod almon jivso narjefoke unlufud bizak dotaw wazicwa wam legnuba viwubez ub.",
 *         "private": 1,
 *         "thumbnail": "https://rocketfinalchallenge.s3.amazonaws.com/card-image.jpg",
 *         "likes": 4,
 *         "intellectual_property": 0,
 *         "patent": 0,
 *         "patent_number": "BHly9Wym",
 *         "primary_purpose": "Uj ze zoravo lifap ol zu vava wasenap mer mebsa sok zuev vog va debuv iwgoz. Hew jaafofot caz mobe fu bene foehe tivmu buras ti maf ho. Devo pifez lipjagki kearovo fop puj be idi for zipehin voclizuj cimziwi peli ra.",
 *         "secondary_purpose": "Kow kup zi goguflim zihnamuki tofiw ko nod nushubu azga bidacile rolemta seowazo bocasuco cuz. Amuze gezjafam fa ebile tokezi wisak hizpemwe fepilpop ekivu ma zuap wi riwcof. Onukej tazuvaka cob tag hude po bofhin macec lezersu upesam jidfutmuv pammo. Boobjav osdu erucokcig enamu no bu mutvardu dip sane en todri pefejeb herjeih ki zokjozlil bavuhi cukab ol. Ihla ciwew ve ohu har goimhu umtadnaz ujasu fifitud nupgov hej ehomaec akavev. Gat adebacemo suer zijko opa kezlu lekzic tivuco aboeto ihoru valu mivsaw ha idnut gonaklez zumoj. Pinizew bo cusi de wadiwuv guedi bewi vud wav meteda uje eci kebvi hov met liveg.",
 *         "application_mode": "Vovelumu ba rij ho umuuto mugpuhali zivu urnessav ga nivocmis luvinjow rivbuwmo viki gurfiw ava ubputu hoskurus. Nik riisa leb wel lapi do po cotcalhah azipoopi capem nihesru ehonahag gewlokip vearife dufhus uh ta fic. Nag iru vevanopu puze pebor futmo on mecosrab tenocu ba nud go ahgape cevizur.",
 *         "application_examples": "Lac gus hekzomkum ug nofu isusum la teog seefwu gigi lemose sobvin felwozgoz lufduwut vefnutraf vetu az. Nov zuka zatij bu kuv sew aga femgag un lewu cesej nibogo va imolav webu cunaze. Ese fe disnibwep uhigide ukhod jetvi zo hum ro nopge witumnu jap fova ninmu voma wegito izevu nuk. Ja zeb ti ledib kevged vo mivbijnis hegiru irzu ser ba huvuod rudamap zo isobo. Hi edda pikfotosi nor hab hahfim virleze mahitu huhiku dudatzoz ajilappig konerfu pupat. Bo jutavdi pedaraju vim tepil sipamivu vuvir ulukef rurwob alje ekuke donek idi se seoz dahtu pohjomaf. Beocejik akoomijib palta repe ada rug mokwufpu fuvolaz kunu iwa kibja ocgiz dan.",
 *         "installation_time": 82,
 *         "solves_problem": "Utkeoz fustaf vo haksi wudibef nulob hu sulbi zuuwrur wiejalap vuzne dab tejfede reldibu nocnoc. Nagin ij cip beke umi igois cewop kubka une galitho ga pe. Rizuded gu redo site peg ladtuspi pecze renevbew ca ojuve dogiwis bujkem ho jo. Ad co uvafinok co zidpok vuj utivope gaer na ju celim ak soc ofuelukes bezga nalic fewula. Datdow ojaho kiali rezca si deslas hum elizerbih warligop disuj jijibesuw be derfur vofwum orefalek lab bofiena wimajpuc. Niiru rokeha lev vecdugo putcon how wohgunon icu focmoz jajiino bobfaz sufjekew gabgifise awudo zepubbi ud co.",
 *         "entailes_problem": "Muvtanek sazarimo gogane suvinu lovevam nuk muik ketgesiz fohtitgev jiosnup niirza huopu. Seisi befgewi jaot jongu sahu jatuni ha udamopgo red vihzec zepur suked mer lobpifhu. Buzutsej peivpi papbu ajul botohjom mihac do hofne zapa coficel kano fukrowa. Ke hugeivu umo cojli ezaco ti nerrefvir dih jieb took po eludezaf owiginob toj jer. Jap saicagah izeuciete fe lo fasif wuriba zo wu bolacti haraigo ulegujog hivreces. Wocorwim cu duvab ta duv cilnud upi ma segeam zal boijopif uno va isja ikaca kaku ciwo. Mamu uza wuhod gaf ojuka radnok inouve wumuwur iv moal jajwezmic bim lub wuznapja ewu eze jumaca.",
 *         "requirements": "Mew za kahavgo itoajocot ipopo va wiguf pemuj podim ar vaf cezgotapi wal sek vul. Jiloj lir zekegol nulisec wo hamo baih rerte zenname sohupdu pamjevfaw rahivuj ocenojo guwrokal keuw vizno ussi. Momopnu fes po nezutimo bu jafjutfij uwducep sitzupic so rez dicci icwu fu bisul. Wem eto waveguv zug fa decgegaw fucpa nedjeoco bogif kujomas ewekaw ci hov ruzewpic ud firzofen toacca cuof. Kut taczi ego zo wusiz po sa ilcerev jaavu ruk koujoco bevic hisuba ot. Kahmebuva fut bavjun landol oha omoperud vut zi asokitcow tir hoftakta ito.",
 *         "risks": "Po ri siglo fu jukive rushu uba ciwruete figonne jit fibgu ko rupid vubva red. Gihgo elzifal kehbe iwe ki tic nitjiwav ewa wetga ore nadtu monidcuc tibecusif isosuzme hapwu enjupi. Nu siwit zibudaj le fetuh perep zuz eku ij ju kah perasuf uvruc ro ipacune defpezga meek zubese. Bek pudbec wakic vukocupe fidtam uzzade jifeb tov rookugu vigafi ufawuwfu zew mug agalo powhag edeki co. Gepat nalvos rofafe oc le osoze zikoes owo etubnaz luvos gajesipe zedvapgu megawaer tocmu fepcan. Rimozhaj pawid otasit raehu lalfawa va cefoawo girpergi pefe kaiju gehosnir umgefru gilibon hozsori mani. Osi sev vu omuwaz wiskad ja bo vu owgemsup ehjaca hedi ce.",
 *         "contribution": "Kan peapebo ho lateat zu heb komit orazaflo pobmedob ugtoc nizim rib pefunoz. Mesub uditep zoenebu ovvesoni bufbowde cis itevem som touwu mimub bel lip ro zez lamuar ula. Feobjo deza pep cosi mokce wu sil teshemef panis porsari mub ikvi gi okot obo holkap ono aj.",
 *         "status": "DRAFT",
 *         "created_at": "2020-08-06 20:42:00",
 *         "updated_at": "2020-08-06 20:42:59",
 *         "objectID": "technology-10",
 *         "pivot": {
 *           "technology_id": 10,
 *           "user_id": 1
 *         }
 *       },
 *       {
 *         "id": 17,
 *         "title": "We cu nauwi.",
 *         "slug": "we-cu-nauwi",
 *         "description": "Mejaute uvige cukoz lub ici bimsiwda fuze vesumap mipsulac ibju pi pe daha davli tot riiwbi etuoni. Dalipesoh fiz mo hogbi oha mageniw vawibufi si lepvuen mosahep lel dunjen girva med. Nunohhi ne iwunu ge punseb batfiviz not sispik toome gic ku cow tibeti zavaful mo roh wof romfavwif. Ido lut nuhegji fof zebijkel baz segoug he tenuro sutu ni kusju henzilafo no mumi. Kutozpa kibob vobaz erzepvo huruuhi cih acipieg genro jo odic nucbebewi luwag.",
 *         "private": 1,
 *         "thumbnail": "https://rocketfinalchallenge.s3.amazonaws.com/card-image.jpg",
 *         "likes": 1,
 *         "intellectual_property": 1,
 *         "patent": 1,
 *         "patent_number": "GquiJG6q",
 *         "primary_purpose": "Duwof na cejip nok moshejuke ri cihgav ijowa be ke ohkiwref ro purjiure ziazu jih tev eb ede. Tohik rucma nuh macsil hunera oladogi zav alikeco kofag gos ed fohi bucalir. Dohfi mifaj fes fim oz agi do ziojfu votvom bibehkeb vejomo tezjol vaihutu zipeje.",
 *         "secondary_purpose": "Ce tibsa nut bacji saido ka evhabe ap un fit duzelopon biwam wat jalmo ovi pij. Fegaora uzepud olari wapa do nool foro nufpocis gitkih co he feb zafus wivapje. Wiwefwaj wozha fe depi amugon lonkozin zin weeno olirezdis adi cobwuv hahwes utanaglu giw adozagem. Goju wicwaij rofatrev deg ezo zo ipnoub jacconno jel powocfem zewes eratu. Not uda je ube rebajcet ravwaafa eho babe pulfapcu tod sef nor gepak. Gegup juzug reiv mav mir jofaspi sa hilekod did vufavjog az lam rorfen os onulabfi huddici nopnehef. Sizej sa cag wu ra gi fezuno mig sovit uceb kehosu hasiwwu kuncovu je.",
 *         "application_mode": "Tuzjagam nozuvfus ri pifvopsu ho ga gadvow aki ciwubrad lubis owe hipoani. Me nob tu zaar kus am kudogje zoobaec ti goalvi evu zi kejas umo zonetenu uledobe. Ni jo diwrajoc gijawzad lawligol joodi tonebe mul gu edti bid nebsu po. Hot mir omu un nodecoro bak lugo rozafope dob bin betib jametad ubo.",
 *         "application_examples": "Belku fovrafec ra zigab afjibug vuz pad hubi numig ipunuhu tiw tij. Bagot guvev kevcoga futlale wipvamji aprav zugewib sevafe ge pozkozo sided ji. Tobop azlos lu vuhiwof gos lo anhemi tawidi huc ku mim wat zeiho ci jemalew ge usnu. Hogi hodit hajto epado noov vuc boseuwu maizida gepeco gezemobeb waadepeg odo gupuldu itledat muvkur zul awoilca adnecwe. Vomew zonpamjag zimmegat ro oho hetjuloji udsokru war uruver mehajret ewtez da nograzsup erovuv fuoti hulonip egi epkesdo.",
 *         "installation_time": 713,
 *         "solves_problem": "Odo lafmohdek ahudmis gotwev wucheptat agvev cijumuje uge ki mocusga wa eshij ven muva ahu. Cabfeswe zemi wuhzu ki rigfoere mud pestow muv bilidwul umoobeti menmol ocipo japwus jignofon. Suc naez libeefu vues ziaba icuiv riwo osopi to hutimube ki fa moflu cewuva budutuv pofji jahvolon buzijo. Lueb cuozmoc pufitafo dawjep kezofi ejitaz voj hip isbifmi ub iwalesohu vo mokjajeb betiv sac oglescet. Tul osre di ilaesiloj isitez bo mazgi wakeho uriubhu gijavbo edmin vegud sokit lorro idemordul tafwi. Ero wupuofe evsemuve va focbop gidapi lukudwu ubwa ij cal geg ja kosumso.",
 *         "entailes_problem": "Uboham ra kupeof oneijaoso kavios ewti tu sekad tup aze corpokub woc. Tucfare tefedma govajka gaju ab hed hupe nerso nejato behwidi zehuc oki. Wakigjed tu kuhoppe okusva laho hipnij tadtuhij guv vivsiv vibe wilerfo worofi. Taiveab so gilvo tej untuj hotcawo fiic garlu taprudoj abigamtuh dawav tivkob acemean zolku puore zokve. Lob bim ado vel hohor mucidim dimule domiw ezaopsum viok cumikwun pamadmer fu. Wuzwusuz izwuzuf nozum fisoce jah muzfines agpurah vomifsoj kuwaw nov nozewfud mu leedre gofde nul waraebi ek zehwur. Cilvurwo name ovigoume gimne apmivit cilac hujerob jec uge otutilno zehlalu hijju.",
 *         "requirements": "Doneva bop pirco baik veh epa atoweskap of ba zijkuc se lej. Ubohobdu dob ufnimles iregurir uw ru pubacri ecsih cez ivtiztos ko cut rugzieve. Ap parte bociki elzal in sib nor li agi lof ravobol nasbi fuvabo be mewetgid fina sope.",
 *         "risks": "Nogjekcod unma wo sombetas epmub nugon vifatzam wov as kohupu iha fe wanojnok. Jodkacfo buf anutascu zuj ze jeduk ne ma ma puveg ihe toc. Ev magcu zoge ek apo daho vofe udadigo mih sedvok fe ma socu risicoke puloh wufum.",
 *         "contribution": "Raes voz catdom konjus kuen jahowaf me usigiw daffivu gavsalija morazfe lizpa contuwtoc cumvo. Asuciswo gi cetpe posef utefowa kazfagab hacig adeozefuv kiec acjim zeru moro agase he fetelzu. Wozome dovloem hij sodegcof zugiboci zohhitnan so riw be vasatfez ti lozudwaj mogeupa teul gilwifo kiwu. Ighucu lokijdo dil ononugwe pum bala le kila ru ehesefi zehrewe pudof cuzlarlo wafip. Zajuka odahu cuvano zaida pik vikizame emdepkek fe cuj busibadah nez pit lubzah rek ku waz. Oki hub onu ekepian ded ra tam re hu hopefu mu femaj higdat atten cuw.",
 *         "status": "DRAFT",
 *         "created_at": "2020-08-06 20:42:00",
 *         "updated_at": "2020-08-06 20:42:59",
 *         "objectID": "technology-17",
 *         "pivot": {
 *           "technology_id": 17,
 *           "user_id": 1
 *         }
 *       },
 *       {
 *         "id": 11,
 *         "title": "Giz dihfem sipujwo.",
 *         "slug": "giz-dihfem-sipujwo",
 *         "description": "Ce lulwersek subdus lupaba gohlu vas zisha pagehsew uhuva rovciduf ewna devamabo kifzide. Woc gocre bicen hujzagas be suawi pawu cirjeb luzfutav moijuoz maz kowesa hejda wodfefruz gukvud je aslo. Natiso cavid kidupbew moz fulhucic izeodam uci civaneju legvem soga tumgi en ek piw jondorfe torerrug vovdovrif. Gidlelzuv beasuumi bi duikuonu mokonud nuppo sol feva hil vuorovaz kepgig omecervej ap mavi ot kiozorum pujaj. Sepilbeb kaf gojkem raletu do gan hozjud abwerer iduesizuz felolmid du nonebte japjahhu ke ba fovvalza taklize.",
 *         "private": 0,
 *         "thumbnail": "https://rocketfinalchallenge.s3.amazonaws.com/card-image.jpg",
 *         "likes": 7,
 *         "intellectual_property": 1,
 *         "patent": 1,
 *         "patent_number": "VWJ1WNjJ",
 *         "primary_purpose": "Kis geluca dut nockawjop wizi hocfawlo hoowme take gavdahbu uw ugi ak pepi eru dim rimujo gev. Ziwjoze namodas obetavu tuzgo vigbub veppowew bitjid ev lo lu kavciv mamwuwemi if dek. Wevilso fute fogmidgu iwge suhipke cizi riimege zudfovij noffuw hez unvaup usi. Amo puliluad kus udvoko dipid icrek wazdowo ugolepej wer luha ti kewo owsi givmiz tubako patjob fowwunu siun. Volemec jev duzo kanohrif ebhema neubavog lo neg ad atefik fozevurum waj jakra ij uroja arebi. Oja womtewejo cifheghu huofi paf sev hisnifus med ka dopta hujuic re inazipzu aja ki hu je to. To duc za ec fiwmoj bac vujom himezlat dadpaf pebdobon nerokro dopakaku tigepben ig fomigidi upijinmor hardud muvmupfon.",
 *         "secondary_purpose": "Bewora dossu fo ola suw eh diupnu jes nov evhoata jacji joti zow ni. Civugrob bowpuj tufeb pajri wohsa esvo kic rirkok tidfu cic tivil nucojni. Homow memev tios erkes tes kuodene fesol uvdirek verwubfu pu weroic cowni zumvunora ji ucu ziwoja bogdufhos. Muak wol ure lucbedzo ikpeuji wovifhok fes zozsipac samhosa aktehfuj cedoha ludoshe balugi cauzehin ujvo. Cagdatre fucrefsac tejun dofjuzo vukatjuh fov kanjiucu gisga ri gat nulorpu havseza egkeba somumapo orehe apo. Senwumzoc eliihi papildij ko noj tus nuf cezti me in zairopaj voztaza.",
 *         "application_mode": "Uku nogap efa hemhouko cuwmu hu nurgibmov co gam jokegiz jotiraon kaplirac bi jomrom. Fo mebviplub guguc sefimar ne jajge epase delozdo usiinuzoz few pisjerer um tujoh aveci. Nivas wugto ci wiro zo vafsomtu za ih cuf eveusjep reminzis pupofjit eruuseir wubagfu zil balro. Wasec datoip egelal ubdivipu vufudoro zudnomeke oludohnet nitja buca tabkez lo fesrec luthamkan itomeku fususoni.",
 *         "application_examples": "Hovlavin iscelfo co dewewenis ebeherasi goh ade ku bivo cup tavgula efuogi. Avuefzaz gorwi gap bav nazaze usaje ho sa gadwinazo duzkebuf jowfenmam po cu kunudi rotej. Jufgapfi dipu eta citwatko cofjogaf balnahu tejolo ukcaci heculut ci evcafi teknovgu zetkevnuh umlaw ce moka. Cifaz zubcis aw pif ove huk tood zo etja fegba ani nompig ijozu. Vud gob gu wocre evawe fepkese acbu ca piv fejziw nub ram. Jawnelva ekamuvu on nuzav nimensek zictu gavurof zavezose med wul etnoljom secfe itjimhuv ub zijsoruw nimtur mes. Sosso welec mebzeic pa gibdawane hiuk rup bovov ra ewbih kuho bitosguk.",
 *         "installation_time": 636,
 *         "solves_problem": "Bireteza befocwe ce dud ku hubcopad gof abaalpar owesod nugigza dofkova wafsov bocot ta igujoruw ceis. Ukva oto keofisoz dusugce rigecadi ga vagve luswoosu mouko en sagvurfec senjoofe nedutfi mu vi doahisev fuuf. Nimfe nuvdo ziwo hafefiv cejgaki ga fum ju rabasli ufahavif ba ulime jez hamekzad hit ugogocin igizece. Rugi jokkuzo bievfub nim polinu musi nebon lejjicni idibet mizokko fosazu rojzi ebol gi mijzubom awo pah udebo. Fopli wikfiam ev wisetje biuf mo butudam edeajasu logehdo af rovgoble sef lugez ninmeok misce.",
 *         "entailes_problem": "Gi ka jebebe ku zo pe dajoti buopfu ho ira otiwabma cucicir buumo. Ba hagbivub eki cawcutip wan cac rujwev hamauc newogul javiz bahju butjusze tejpe zejeg jafgez esaantob pomo tad. Zihgizlor lajhe usa zin oma fufurgit radet jif ja gi ha wekze lu. Hi uvazaic ubuk kukkolit vilip mo fac ak bel gejadmap lanwubi nom adereta bego endoit pov movica. Vad woodki omuboz co gomhotib faho wo tazici ka ivisis pipki ejuha. Fifgeaf inutiwnu ze orjohu icjapo te pajauwu zel legibi tac kedzusup no pec jo timviisa. Tesrenuw jemne ti gucjudewa pa peakoala nano ot zol hizanuni wirna iwniv citabdel liluslun.",
 *         "requirements": "Zutu zala me papi ili sa co muksih da fuzofa je tiorizan gafkah dik pokaf omwide zum tihem. Cezume cih salotiz dubwab witew fomov et bojitu hojja lutehej hug daabapez dokop. Hod masafzav op ze sahirkik sefuh ilu ujook tenrok pejjurpu kaho od zosminma ewujebam fitduren ok. Verivfa ipa vuku pale idcikose liwotji vugos tubi potewu zape fa reihil ku lipic zojsu pedo waszem. Foneb agedoc robmowpul sebem morwegal zatata pi ot zilicu nekotvaz goz rifhu amosajga nenoli.",
 *         "risks": "Nikdu ma zeiti ivufecdod re po gug os dinda tiinsid bieroawe umavu fib. Wogid areruz bimta fosaphup falikata vagimhe uthieno rehose awusavot raka til enaow zomvejvu bojasar we. Lacucluk ti pinhe id dizivofa dosbih hemu upsi do egokuop eb duzop. Ro pe ikidibge tuv adnebi jerekrus tehuefi defnoj setroawe setiji umtefkuk ci iruanza ruja lescusvu da imuhobehi lovufu.",
 *         "contribution": "Riragok mozef te miizekat bavci obbi hob sufwuchek amoadimup taza fur pedal. Metwa gazah ditwi cos wa lel nif tuvpun ruhuh duw vamja er asa sac debib nicejsa we. Ucouzu faz mecjuaj cu obavmi fazsoloz gukec hov ig mobu ehodizfa jale dikbid am. Baszoefa hictu utecuwba seer revusde vulo geuri ti wuikoru ifa inagoh pe wo haz ogu. Cibim ras samicew vezmi agreic nanutde oksibu mohiri levzanos meohce webgi javsu gefrig gid.",
 *         "status": "DRAFT",
 *         "created_at": "2020-08-06 20:42:00",
 *         "updated_at": "2020-08-06 20:42:59",
 *         "objectID": "technology-11",
 *         "pivot": {
 *           "technology_id": 11,
 *           "user_id": 1
 *         }
 *       },
 *       {
 *         "id": 1,
 *         "title": "Netca uka pakfurbe.",
 *         "slug": "netca-uka-pakfurbe",
 *         "description": "Oku pis hezvafnu ukcim dip ane jat efeh erposjis vaejo epizudwok zakle mobsudez rifom gikavgus afifi huwhoki rumovah. Bimlojop bew pubhivmim remiiv vi uf isuluhvam vu tido tergujom tituv hili. Olobef kojut lalaw cez jum zi fimwe hof soevimi zikuvib rotkacos cififanoh jovvudag. Zekwugas biducej sim eb ze aku vezodzek viwleroh duoper minenawun hioh nejagu.",
 *         "private": 1,
 *         "thumbnail": "https://rocketfinalchallenge.s3.amazonaws.com/card-image.jpg",
 *         "likes": 3,
 *         "intellectual_property": 0,
 *         "patent": 0,
 *         "patent_number": "aYR7AW4f",
 *         "primary_purpose": "Wuser je pev biwkeav ivmek vu efhibpo arap vozhog olveb uduno va ib tigoih geavani. Hof fibwulav zepozeele idowaz nirge zikvevu buffurke lippajhi okfic cahufo ripwo mawdevur. Mu fekze tiv devasgi luat ravi sanoc ihanafe ano niut hocajak cole tuhi roscagal ve fe uvawek. Uza pudat dofag ced ikpuvize lunil ra sonipcav gofel feg izu ulfaduja edomuna om balowuw meuj. Su ofnoh zabu reel go zipte nepul besiv ul bezein getamaz humucep minagaiba iso cuztotepi neftiwko mim. Tivlilkok larar kag po pi ovuleka homnu ziccus jotez obeuw sevu cogut po dipuwedi nodhijake no ensujju jekagij. Kopan leg zag meehilol ugovap ucoohmi top sa hoc catmamnoz labarog keleh jofpej sahadim ebir godhid.",
 *         "secondary_purpose": "Ibrufdi len imfig ecunuwred asmev baob ne ilauli et ko tirovu nigoleg bopzu. Bu evpiw ziwagzur faum suvod tewome renwa pimi cecutec pohsuwdem ho mirfipvip jomunzi hohun fifdozo camuc zuewuci. Wec tiwuz limjoc riohfe eh huwse bubcuriw naino eme dumfi jocajaaba uge etgoimu zu. Pozzo jidcihkal gade vucofuma ricjiz fih luradpo pet ne wukre ilfejeg buwow vaz. Wefdeumu nu uncifbec jeg ze titole ac nuwaz ran jokkakuma majreal ba. Igaki losah sidopiz ruz fikunzib cidafi asi ralo ajjab pos lubuwu bo vefenan hewutlin. Zomu elino fezev fojkincun etukij su kol jano robza diribar dop levgaezu cop nomromoba sundeg na nipi jivat.",
 *         "application_mode": "Ho ofu lu su ro ak ranwuk fignecin we no korip fenob pag. Emaviofu te kas doz radfivfeh jivenezo dacukzi fog vepete aw pamij setrar. Sonpozca dehtawna wo egiro eve gu wigij lepuro ipazifa cohin juka ohe tuwfitu buho wamvisila pinaf hof. Vigvos tu vek upre lawgocrac hen licju va luece huzaf nirid lekojo bub davlinon ro. Cuzlowja ifulage mu obeus em joleb ru ga econo kuhkof wad mecma huc. Ovolo zifeb ro gedpujzo uleur ileno ekiica cuzawsut ferbeb ila javon afpe towup betefa giwbonuw.",
 *         "application_examples": "Abbi giiw opabekfe ho upfi fi guvizus lezko pujsezig ubetabla le dihe ohe. Dolmiso pep muevizi jedaw ojaibuuje gisak malnu ka deha hodow wa horzi enobu ekugikju tekehi novjarvek. Voozulep morvepav iwo ecoweji sizit tuk giw zurletwi cotfi oravoh ejlagic rogu sako bichi dewiid puuh. Odu owge tenbuev sadzoun ta otufu bezi boamoci ewi icdavhot kapidogu ubfucja makvofur doc al ji pi.",
 *         "installation_time": 445,
 *         "solves_problem": "Gursemesa zebrakka jamop ilkev caic liw kebguwzos sunmu tet artokih jotekbo duf totuwu. Uhgufe zarnez ruajgeh jafaje dama pujsu baz wefsomre jim kosuri zu par emu hafafon ge. Fa ovvugan mir miwjetka biipuuli wurjupe uju zukpetin caled zo ivemozsok ib omi dovineg ulite kofralu cifo.",
 *         "entailes_problem": "Ra jucemi nevga caco vijep gak dusgob goh com sacju dijohrep ogpopun si uswobew pok wujodir. Anso omga camgog kol avab edejek vuszutpul ficmig kabhewi tuda uverafas potwim wohe pec. Ijekar lo dib sugawi pafepi rokonu mig ga jow enanamuro fead pihjuklo el ejepi pomdeb durapob utacotzo. Tub etka ci tafecfi oparegma cej efewovut vil afej zubwas patijhu hobve etili op adarume wewfunob lo gaoz. Kafiwki vakkaw urbu sohzuz biv podedo pigpeg heshaturi zur wamuope mi homluz jotlos sowbi. Digpog zezpu cekamiv cul du vakicud eb bi gap tojdu im umiidwi tev veji hap lafuw ezkul ta. Gipekam hekej zuajewo ib corpe cunka wouw pebaceb ra eja hocimtas jihac er eg dud ez.",
 *         "requirements": "Jikmapzo tepukge arutoron hohzopu pop noiro boiwisad masesuje ovu jajdiwim sahfip ka. Vepiv uto ogugoru ulba le bedjup vibzumiva hor ne izo wosruc uda hevdopu rezehu ibsoken rijlomik besfus gim. Dubo ta tabovu vetwe el bawug ucfatu wivosu sabsa wocero zelkalvob diloc vucupji bipetiwe venfub. Fuz topojpeh vev ri rufwomsu omudi vozmotlo ragir re uvo veirupo ran ekem zuov mo zam sew. Zep pifzuazu benbi aga gatbi dicnus raksaaho alop ziw ipapurur eware se mesolle pir atoma peraju. Wekcigoli ojekig rajuppi feasowi cesas caah maw veogaju ragli gef ci uza na aw tabufi ve. Zunifi epuviko gawja aperih mah itkuda gakpikor bowga pecepas wuvinoz jiruzze ja dopop asiow.",
 *         "risks": "Susvu cot dawe iwetcet heso uzi olgaledi giri muawe ihe citohwup kuc ve fe roc peraf. Ezuvid dedluv zut ruid hin vak sacag nadeznu jon kahug cudizfu ci pobnu leabfe duduuz puewa acapu. Teksej meopfid jitsidimu cockah nu nubij duv mefoipa bugvikug liczuknak becjerik juslegud vamuwal.",
 *         "contribution": "La ku dusujib ranfenij zes efja jih zownu cemaci fac ofabemru juv ne pejlu jug. De gehpo iviecaubu ip bojesu padrinuv biwrabe mudiz zu pawu jer gokca iz jate ru. Gipkud an ri ga koj cokmartus mufo zuwaz lumiku akneki sunlogog inef. Alode koudo vowuleb lapmi wad mahveb oggu veomu ha ugfekot hu mudedbat vesrus akzugte serlikmin lon ogo ili.",
 *         "status": "DRAFT",
 *         "created_at": "2020-08-06 20:42:00",
 *         "updated_at": "2020-08-18 20:27:07",
 *         "objectID": "technology-1",
 *         "pivot": {
 *           "technology_id": 1,
 *           "user_id": 1
 *         }
 *       },
 *       {
 *         "id": 3,
 *         "title": "Nikwow jizliw zimri.",
 *         "slug": "nikwow-jizliw-zimri",
 *         "description": "Atma vu azce zozcu nabonbev repjaman wa sizla wuzizgic ho gogpasrup fufzis kadfukcu etna mori weviciub. Je ki seh ewriw cebufe ranap sik zeklah voitu enwe load lov gage luwod. Wucowaoto fev okelo eno icsebaj kin ro cumela rived fajeim koaro wamolna bewsa tom hizekbo radeno loworo. Ijnalvif em huw zagcotkev domekdif ithe jo fa nipasro ujojabur wo wovzopko ba relewmad wilheh luzlorcu epwozfop ge. Os mi zukiso laspibvo elseh ubdadpol bale log uwocaca hicouk dafbela sala ad paf puzhaso runikot re. Ewkuc coccej zofem ji suacu vipap jienori ebiva benket uneha ra cu nosrar jitehlaw woib de azi ipe. Gave rolikes eni luufim haiz subute cuse iwuoc hutezluf efruv dopder juru.",
 *         "private": 1,
 *         "thumbnail": "https://rocketfinalchallenge.s3.amazonaws.com/card-image.jpg",
 *         "likes": 3,
 *         "intellectual_property": 1,
 *         "patent": 1,
 *         "patent_number": "zSmgRkLl",
 *         "primary_purpose": "Tiruawe ap runi siremco kidtikon esfa mibla ineda sisici ag sekode ruv cikopagi miwofbo nij. Ekobe co ku vevivot pura du ged babi hen epukijo ciomo va sev ik ritegor nazhotuva. Ase elifa um jucved getosi vapsifa vuput mafaca nazsome giunu tud lumi zofiw hi. Budbihwaj limsu nezubwov ke ho si muf molute wucda koufosi gucofi bomda evmeviw mija gimazici jies. Zi lalat gib gu faj cocir teg wil rorinda otuimuas ifkovvu sitbupuz tid jo zicofu logo. Tehelpop wic wobe nupirku eslilca lujfiru ekpebcek imto tivezub karjuz wa cocemre ocodikeli nagdejwuf fo dikomgun. Mu tepib nunwo lopaw nadgub akwabe lufowo afu saigo zu warworduz pemot hip kewa zifafig.",
 *         "secondary_purpose": "Ulosa ujus avialani sigfetul lersoccun tos bifpefnep ab hejmam ped no owfiziz. Ib peatu meten tikmuhej ida ogaizwu imkat javtuksu cursefi dor bokim fobzacuco lohohki. Fow tuzi himur uj ahi woem zunzo wocec ladamubeh hur na wojtoto em wusi jemilek.",
 *         "application_mode": "Wi ibigi idezega nurarsuc zetok holocgu sakbu uzekuthi ta opa havipji gunove gora ma gi kofabad sahfak. Jubeke huwba rifru infe neru doku uceoz pon sipepwu zen uvohaz dot iz. Afeocjam ipacih jevi bod geadoed nuiloih tenuv tasuva raf vur pipizpaf tacga. Musepri uvefazbad fah amoto lettoc rucwo cugdu toc du zigfe jufbe gewwilo di wunbu. Volowbim jomava mulwo edamu wiriz nimpiig buifjed iwoinudu zu ej kizokuhu viwme remul. Icujut rulifo gembebwip azivo foglic le zavazi cenja ofu pelfir hec nikejumaw epdok tendot. Go pel fu ac zan gozdim fufenzor ca juuwi pudan rajhikiv lu umniezo uzwaluc.",
 *         "application_examples": "Cijurra reto kezwoune ni nupireg jezi bos anijofu sopjas no vosaketow evpotas lup poj za kahova ac pe. Afipjo if ris cowzi murku enobeeb liidga kajo mune pehonil gerimsa vewesu vi. Lodor sinizadid didu lof po memi vutpu lotawzuc izrad ekcozil guzuwjuz rif hod ka kuc is. Evtac uwa radeknom wilfak falulzo irizo geubuvan coc kapwo vebe befkac ezu.",
 *         "installation_time": 217,
 *         "solves_problem": "Guwih suvne vowo noven aji adeocu jumosju romoci jorjez efizudsoj mag zikim. Kosam in lesnu lani celwalro olilaf ajfim nacbavtuv tikfolup fi bene te koocvu. Ko ivdukko nodme pubuped nomon evolwid rit irezil ipeci lus ke ekeecsij nofru ca povuj. Rijte bicurim kiiwo tar pawne tobwuuzi ide rupogup ul zah wa jodovab. Hivlawral so tel zi sebhas sidikesa semmic givgu ce idajivdoh fentad jad pezu sid ofufi rolatnad ra.",
 *         "entailes_problem": "Ac puna poij hazi nedo pugehe buahu bakvo dabjap ti peclokij buctijis. Ilpih lar heno vut ip fiodsoj lun si ehrigig puzten rumes ezhas mirsuvtiw makihwag banniali. Ig gi kik lohfo kokzehwe di kotratoc pikepi sihseomu si ru fomo zot zehmeiza tahahufo fizkuc lepak arotojnu.",
 *         "requirements": "Amuj osunav pujig madharcum jiicewuc cuhejez zekmumvu dili buvisme vowje doib emohe do op faetules. Posodiif ajuazi du jojpapra da epuifisi emi negsumih nomwicu no if dovlul hi cunmevis zaeznif uwodadoh pibogu. Rij daz cohitsa wej uh na ba pearawek towfo kidawocu fa sacokgif ajog zezanavo gunmo li ak ohuzisodu.",
 *         "risks": "Bogmi ejalot raceoli sejroma kac ruk naagros zaibu wepe lifaow te ubo viesabi waripa hitpujzi lacje enhil. Vijfut kicakolo hih aledka take ickor ezarose ribot gu ujsapof rinluvup suvewi efvoc andapcu pozimor. Tog rezirdi pe ralwigoj zuvodhe gif vatwunnu tiovu vo wu veakabu gegmuhdi re bijdot ibofak. Uki luhwigpa neb wi jajhupo ajeti nupoim ciwmec vongineje gon zo mudaw widrushu.",
 *         "contribution": "Fokpibto mibo caofo omo dovtat zilsin mefunbu zajho hul wumil cegmiove sugovsi ekokugu gimu tekaip. Zuvof ug logu bo jino ma za ris culhuofa utsalda fe jufpuci han apeaf niberi rusan ru gaubu. Tuza canro uti nacedvuc wop fetokwer nu vuzu fe fi sur enlakmo ha uz lul kema. Peekiroh kumoku negmi mugopu ve izbupoj nagli wuh cinpeule lo cetadror ta isul bu da limu bofa. Pafsak enwuki zinmuk cah upvakjic najebco fes ze du lub asohaka kigiv purca ilodemza ja beganigac ca.",
 *         "status": "DRAFT",
 *         "created_at": "2020-08-06 20:42:00",
 *         "updated_at": "2020-08-18 20:27:07",
 *         "objectID": "technology-3",
 *         "pivot": {
 *           "technology_id": 3,
 *           "user_id": 1
 *         }
 *       },
 *       {
 *         "id": 5,
 *         "title": "Kera uvevoflek ilelocsa.",
 *         "slug": "kera-uvevoflek-ilelocsa",
 *         "description": "Defbu cej likfonob ti isfuve tuzpul uspi jife pemvu upu egvez epiita gipsirih hafow. Cahbawwon ceera sazid tenteg oljusaf pu gari jiolilu cogbomon denowfa iwu ewgaftu dudla miz cuc asinu. Co una ihobook damadlef wut ti orida timmiija aduafi ten paj gu loti tu wugor dilugif dan.",
 *         "private": 1,
 *         "thumbnail": "https://rocketfinalchallenge.s3.amazonaws.com/card-image.jpg",
 *         "likes": 3,
 *         "intellectual_property": 1,
 *         "patent": 1,
 *         "patent_number": "vATtDWOc",
 *         "primary_purpose": "Jih va atufad orujonab zas sireh doukebo cilif taoh bu vorejhi ji sutoveif. Om nivegido hafbuk uj pugage re ozces co kes furim rusob buna re jin nozor. Hu kuzsawul zuzsi fomnur cuw monem koje hamata nimusiap tibip ralu najorev. Evozoda anufifdu ita bi mensa mesi fojkig keveal rugu wu caso wew sa lun wibbuk sehiffo. Nolcibbu leruc buketlos cawhubket adenic tu mumkegeni da omog piumson hacafo sipopur sudifweg gas temjoj avvuzsip caz. Lot agsigwi pacohif ziluccem dut utfeopa dibos bebkuidi luiv dovu bur urerik kosniffa kuwkodti.",
 *         "secondary_purpose": "Nofirkov kew po ivema webib ir mo azeatavo kasis bomfemki elakuchiv zo nikel inu. Zeca lis nemafbi na egfefa gujka naovuhu pugude wiswamuz weduwhu tacuc iggicij sikahe vesi kodotafan. Rizvoti jivkow zarvez niti foseuvi bagpat wig kiape mihgiz dul fefcazut boflilce tuwahdid devuvup sanekno. Soumo dij huh zelpadpuh pos gufigwun ezra similso ofuima enu kir lu jok givzo ij gidkem.",
 *         "application_mode": "Usniug upunin suife zujunhac odafes anopa ruwroscid gorrul rawuh dobpa agzeviw tuzomnif tab bopwepfo velut goagu. Imkaf zerve joghehul bi cah fukturoce ejake apze birreva gunud radpa vu rej owinag rubjugiv. Mepaco gokim dah egakubme devible hagajjus idewotgow cu gefolu mospo warbuj lizetur mup gooce. Akfuj sa febeosi nikbuta mojnuzic lovecami bizenol keat du tafkersa wojfab ju gihro mav cigekuku rurnuawi.",
 *         "application_examples": "Toro vem kopicsa lad tul uha gez pi ni rek du avewi gusedwa bevsoj moj uwokoh. Ofgumo lev owpapra doh reneh kok alujije imnojgu wu opudiwig olebujba ri gaeka givbeuho dig cir tu. Lonarniv fabseb pabaki dofbew un genjasavo mat zab idi cipre hi wim migneh bin isfow.",
 *         "installation_time": 182,
 *         "solves_problem": "Zir libutlog opali nin memecra jasadig ara numoula samasrup ecnecgic ekapug zomuzlum riihoiv tukavluc uzha tuoz doj birum. No ufem tu coili ec hozvomin mizbi dusomu sucdeh wapa hujbi fizureriw zife ja emi but ogimaaja uhdu. Rutpa ti fusfajam ba kijdaswed tad usugo suro ep wup uvulu rektana dazuomu hadupaf ugizi ojzodem. Huowcic zinev caw suzub og ikookamo sejga wimuri deom matniac vu edtav nugugan uczebhuk. Bade duba mejjol kogazza hefvid wan pibho tisimam igjolo me fum lobeg dudofpo ofjogog kulgutav cu jemkebta. Une logur sejuzen tucve jelno wifidu bahet serofcif kefauh oj vucuhso avaunotot ufuhap.",
 *         "entailes_problem": "Amuhidovu zegvurvo co opvocbe he atanir doc pecva afovonko fe cobilwi lig devdo. Kohopmi iduac aniga sejeibe wezo upmojci geekmul rocuvze iha irevorpap je hactoluga mu jaku descejnop wocgiufi eca cortu. Fo gulawpug pud uk kead uheho gesle colulvo utootgul son ca urip.",
 *         "requirements": "Gi toguv cav ubpon haotekow ugeholhuz ovi uvopacus bo pim tu foraf nizormiz zizeh. Ra cu novaklag atcuv tuwiv jofcovza nuw zi husduz zud akwutim mivciil tinkusho ucagoku. Vawpuna durafi de buhe gedise casa usona voja gebeh mizji midifla sic kuzcab obpenepe. Ugomavza figa jukpug ji la embi idami lapcod buwekor se ni zeneva fora ve zu du ebuersoj. Ocjouse sotuag dadolut hojbo so husibsa kuwnunel vudawud ma fatpoba hamrume evirraz sa apefebu dusipuma lo. Te mezu otiuwi va je zovonhom wo cecawe ofujabnum gejvosrit jikupbe goiniwo somteowu fihwop mag.",
 *         "risks": "Ofowa tecja matos hicuwuvo ot me win liedopuw buwu mo va am paze ur. Fi uhpudpoc nenzoti banvel wokrurzi puevne odoor nuppo rurcoha umiamu uchogak duhkec. Ib dampo pek ugoidomuh risvoj sikvij zilra opleb jug girdotsil evki waesobo cun. Lobuw ne bap lom pukar cuwha mozec lijed gughuf imuvmam huj pil fociwav voba. Idduje tumena ikiemafen otmota pigipe zufce mimo cu ju utogohowi vajo va ukimear tunid evgo pa jagijmer. Lojatar fi tiad ikiviat hihi bimi kehew umsim mosku ratca pe lip ohuezifiw taejolav. Mupa wa ubagiv hafinafi hekahos kovgenzo ibiboet so ovaventuh tah ivefis ji arfevoc hak.",
 *         "contribution": "Iridi dawab icu nu zodco sa vuma jovcufo sup rogvut li zume ac jal wissi uzuzuput ecapeb. Ibu areuzfud owsiwid zacwivo oscidzo mezegbak urgeti eta jahhaz sejajoj sijuvi el uki few leg deobiku ziisjo. Go ilo fiame biwa atazalhu sobeha tejwu ludigined soko iz ubmogo bo zedajarim gollo. Zak cowte zu hunriduf bizup avauv hetpu uwoweso sinhigid soj rudwuw serim ig do loorlak. Vuda pahla nehukap golawwo nunhesnul fipcoju je sov siplavag fahu riubfo ukcu wezipupa. Jizej dag ate leddehje tilsi lav sis guvbeco itwu zatahi ro ago jukso.",
 *         "status": "DRAFT",
 *         "created_at": "2020-08-06 20:42:00",
 *         "updated_at": "2020-08-18 20:27:07",
 *         "objectID": "technology-5",
 *         "pivot": {
 *           "technology_id": 5,
 *           "user_id": 1
 *         }
 *       }
 *     ]
 *   },
 * ...
 *]
 *@apiUse AuthError
 *@apiError (Bad Request 400) {Object} error Error object
 *@apiError (Bad Request 400) {String} error.error_code Error code
 *@apiError (Bad Request 400) {String} error.message Error message
 *@apiErrorExample {json} Resource User was not found
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "RESOURCE_NOT_FOUND",
 *   			"message":"The resource User was not found"
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
Route.get('bookmarks', 'UserBookmarkController.index').middleware([
	'auth',
	getMiddlewarePermissions([permissions.LIST_BOOKMARKS]),
	'handleParams',
]);
/**
 * @api {delete} /user/:id/bookmarks Deletes User Bookmarks
 * @apiGroup Bookmarks
 * @apiPermission DELETE_BOOKMARK or DELETE_BOOKMARKS
 * @apiHeader {String} Authorization Authorization Bearer Token.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization": "Bearer <token>"
 *    }
 * @apiParam (Route Param) {Number} id Mandatory User ID.
 * @apiParam (Query Param) {Number[]} [technologyIds] Optional Technology ID Array.If is passed deletes only this Technology IDs.
 * @apiParamExample  {json} Request sample:
 *	/user/1/bookmarks
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
 * @apiErrorExample {json} Resource User was not found
 *    HTTP/1.1 400 Bad Request
 *		{
 * 			"error": {
 *   			"error_code": "RESOURCE_NOT_FOUND",
 *   			"message":"The resource User was not found"
 * 			}
 *		}
 */
Route.delete('/user/:id/bookmarks', 'UserBookmarkController.destroy').middleware([
	'auth',
	getMiddlewarePermissions([permissions.DELETE_BOOKMARK, permissions.DELETE_BOOKMARKS]),
]);
