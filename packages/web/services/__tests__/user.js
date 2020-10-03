import fetchMock from 'fetch-mock-jest';
import { getUserTechnologies, updateUser, updateUserPassword, getUserBookmarks } from '../user';

const technologiesData = [
	{
		title: 'Gesbib powev sodzomjik.',
		slug: 'gesbib-powev-sodzomjik.',
		description:
			'Kodopifi sammehor voecara wu dietu je zedsande lo nemnoriv zi metoeju na bajo. Dulzo cedjev per zigru mi zufdus igfum vetek zub aw tug kor. Ehava tedorid ufmu ado buwlat kegogafub guh goga uwwev cojijhe gifiru vo. Fomob op per zezipu leguzber sitzijse wifdo zar nagojek tiuni cu pulovamu opjo dif cop ven inu.',
		private: 0,
		thumbnail: 'https://rocketfinalchallenge.s3.amazonaws.com/card-image.jpg',
		likes: 15,
		patent: 1,
		patent_number: 'iJuXXxRQ',
		primary_purpose:
			'Fobsomir ikepet icpu cickavcib wedug wocpun rajatoc urogidim cic bufja tojaw olzi guseczo ti magife liz pufbuccud ruhodege. Puc ji pa li hathunag zewsofa hoprikce mustij pikok lisu laf itzema caj ufuotowuv badna ceogih wugegpi agota. Jef fa sawodguh jorgaj godilwi runvuf edkide ajnoozu urken ol sawki pus wa hikmono labzik vitmosu. Ni ripu hekgo woshuc pujuuf dos vop sasec uweiwcu wa tibofawo irbojep ge dovacoc dov orolof do. Te luddiig tompowake ojcovo lijedek gi fubifep lidafper aza wewserdel ro reit jim cukejru lec fa.',
		secondary_purpose:
			'Of date vemcodnig gubkeji uzato ro lohju kibala wofjispag voref ezeju je sew. Gosevza tu ded rujbad zihve tughin maj sid iw mujlahho sawki lusramsi ki ra wuwimef. Hugwe wom ibudowev ca vowkih leti nudvawo fap emagufhus mu es zaojib hu. Buggofi ujiwibe abeemohah bugikif kutwavoc weh ole defteh vot aji wa vevdinin ju. Ubzashiz tiregfec lugiprun ijelumza fa ehurvu boklo ake ego cuvode ekve vu.',
		application_mode:
			'Li ca ceapeabo tovimi igtilezo udpuz uga su uzo cuhi sece pikanaki ibuge fat nibifoha akebucoc. Cise awa bajgigef gokul kog kuvad coabges hadaz etu uhnen bu tom rub hiwevu rumluje ciljes joohu bewupev. Um fo fucuec ivfutib mela nu jum eluodan uhufe ineal decehaop bozham lupgudzo. Ruces menuk lishabsod pub uvi labi al vur sagdobnul revce zivlogit ta. Semi kunut urremuh lopkoite uniruce di kijzon gemladlot hulivli dacvukog foitauke pahvila wic vit. Carkis jacuger isi rov nabiref fuzhupe ninpus kukooha tu bicfuk wotekovo kodfacif buwrat law.',
		application_examples:
			'Acuce id sootodoc nepzes hi towdew ibpavok tazgab vo obajeka orsuz wobegoj be ir. Waarzi ugiukle ireiwapu ta muczil utupor zahtobe fomal orasebda fa jucaktuv ra ka ef mef apu buejuca. Suw eciwazo dargak diizzi jikiti fol gil jeewte na ec atu gipoh cocpep bigawera kapapoc cagnumvog pub epete. Fegded bac wefen juufi wat opdefno rupiive zoczu raube soeme laf jedbas lufkeh jolul. Gasriktal isasul owe pielu ku humahto oj pe wige zaj ulo ulsut uw ku uconu mil. Bez gozdiltow motzigid guol cima miludajeh hetolme ep mek riftitcuz uwora ki loefo putfu rimob ahadivmup ceskoleg. Tundarot to vikemuru velola ge veh ra hisaza bel etemsun rage zaabriv ope omugoki.',
		installation_time: 34,
		solves_problem:
			'Bigzacu cien wekgeg jivmu dorcuze iwuuzoza lik kiji daha hojuzi vo motwu teh ge gawlupo pat. Omhouc aji lohud da zirfod focera hikomak tujelug janfep ha gudiub kiwuwpe rubdinen je gikorem isafanin jailfiv pe. Sobouw dih tes mehrebfek huboggi livek rof tudmak agi ke afeida vopuv kicme esa nejtuj onule ajeav.',
		entailes_problem:
			'Bimpa havla ibru tus sogjo dezecaw jozto kosedzo rakhojup gatsud obe ginmavvan le zeh. Nerhahih ujowin sitseit moh obu inheg an am waog bok julmerak hahro anestav obkak rafhil amo kodhigebi. Pedku pot hadiv ke piso wi ri darrafso guti bonmu jalafu ite jopkirwap ehbe wuc.',
		requirements:
			'Kemferuh maddovo om gil fah ko insejri hepfehu rissuno munubu bun ogainema vele ca. Cutriri banev widatwa situr us tu fuofabu zup hov gu otocewmig vumwojo. Og butabe azilo woh ruiboki esaridwo de wuflul owa vor bakozba it leracso. Huobuha sefruv zinge cocjab ih cauh vi weka wo dinofpo fad gav va ana. Nad ibvizrut lurunsor rifnif mi nanoida nazuri ictu eve lujjegru cof jirukuzo ralupe jumab zutuv toh.',
		risks:
			'Goel sozuhpid mol ep doznagwik vujravopi sikolo mofaz nusjifug adoduuv go kofosi uwuew paluv ibo. Sen torah se wozuno wupbode jiob fihef ewa zamel vecuptec pi suwne hubotohob kuv duane rejlaari lunapepi. Uvja laek ujhearo nuiwto ezeci pe uboru sac lohtuzida tudose ukizene wetioza fabkutewu to popcofaca oba. Hepma wuid so lodketul zu jobew tozen kalolam elomapi tovatozur bo mirog tuhokipi ruwri ugeron husab hugugru afunu. Ze bu waivza ebuhifol diji wo gomerrac dowfevin iza ruatusi bude ju hufhop fomwer me.',
		contribution:
			'Ru egefuhge oka foscekew uvi mijuw buhoc urewe gicozru orujumfa jo pu nohena seb tas ka oftaidu jawuag. Fozok ga week zopuloz jipema ogidonjob bi zeb beronu hovro bu kuviw arnac zug owiko colopjif. Fumkus ospappa kaze moare das ka hap fofimwog zodowpag tavofut ehhiken kekuzar kobik fu zodgi erogi tuvaosi. Onebo miwi niab dituwsaj sanajo woz uzjah hi unu mirezki wewbuuzu hoboheho er mel. Uzicidicu rofhuzip nugu okwansiw igoes dumpasfu fibizov de puc ne raznagve bilawo isew. Nufneflu ki gouje laldav akapu no ilolinid umopa mem ka vosuz paran venit jibifiveb jeniolu. Agoihsi mit fe sogovo bal ewuhivol rejavnu vuzunan ju suk walobwom esakic.',
	},
];

const bookmarksData = [{ title: 'Gesbib powev sodzomjik.' }, { title: 'Gesbib sodzomjik.' }];

describe('updateUserPassword', () => {
	const updateUserPasswordEndpoint = `path:/user/change-password`;

	const userPasswordData = {
		currentPassword: 'sabiatesting@gmail.com',
		newPassword: 'newsabiatesting@gmail.com',
	};

	beforeAll(() => {
		fetchMock.mockReset();

		fetchMock.put(updateUserPasswordEndpoint, {
			status: 200,
			success: true,
		});
	});

	test('it updates the user password successfuly', async () => {
		const result = await updateUserPassword(userPasswordData);

		expect(result).toEqual({
			status: 200,
			success: true,
		});

		expect(fetchMock).toHaveFetched(updateUserPasswordEndpoint, {
			method: 'PUT',
		});
	});
});

describe('updateUser', () => {
	const updateUserEndpoint = /users\/(.*)/;

	const userData = {
		full_name: 'Full Name',
		email: 'sabiatesting@gmail.com',
		company: 'Sabia Company',
	};

	beforeAll(() => {
		fetchMock.mockReset();

		fetchMock.put(updateUserEndpoint, {
			status: 200,
			body: {
				...userData,
				id: 10,
			},
		});
	});

	test('it updates a user successfuly', async () => {
		const user = await updateUser(10, userData);

		expect(user).toEqual({
			...userData,
			id: 10,
		});

		expect(fetchMock).toHaveFetched(updateUserEndpoint, {
			method: 'PUT',
		});
	});

	test('it returns false if no id is provided', async () => {
		const user = await updateUser();

		expect(user).toBeFalsy();
	});
});

describe('getUserTechnologies', () => {
	const getUserTechnologiesEndpoint = /users\/(.*)/;

	beforeEach(() => {
		fetchMock.mockReset();
	});

	test('it fetches technologies data successfuly', async () => {
		fetchMock.get(getUserTechnologiesEndpoint, { technologies: technologiesData });
		const technologies = await getUserTechnologies(1);

		expect(technologies).toEqual(technologiesData);
		expect(fetchMock).toHaveFetched(getUserTechnologiesEndpoint, {
			method: 'GET',
		});
	});

	test('it returns false if request fails', async () => {
		fetchMock.get(getUserTechnologiesEndpoint, { status: 400 });
		const technologies = await getUserTechnologies(1);

		expect(technologies).toBeFalsy();
		expect(fetchMock).toHaveFetched(getUserTechnologiesEndpoint, {
			method: 'GET',
		});
	});
});

describe('getUserBookmarks', () => {
	const getUserBookmarksEndpoint = /user\/(.*)/;

	beforeEach(() => {
		fetchMock.mockReset();
	});

	test('it fetches bookmarks data successfuly', async () => {
		fetchMock.get(getUserBookmarksEndpoint, { bookmarks: bookmarksData });
		const {
			data: { bookmarks },
		} = await getUserBookmarks(1);

		expect(bookmarks).toEqual(bookmarksData);
		expect(fetchMock).toHaveFetched(getUserBookmarksEndpoint, {
			method: 'GET',
		});
	});

	test('it returns false if request fails', async () => {
		fetchMock.get(getUserBookmarksEndpoint, { status: 400 });
		const bookmarks = await getUserBookmarks(1);

		expect(bookmarks).toBeFalsy();
		expect(fetchMock).toHaveFetched(getUserBookmarksEndpoint, {
			method: 'GET',
		});
	});
});
