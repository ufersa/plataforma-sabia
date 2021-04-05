import fetchMock from 'fetch-mock-jest';
import { buyTechnology, getOrders, getOrder, settleADeal, cancelOrder } from '../technologyOrders';

const buyTechnologyData = {
	comment: 'Teste',
	created_at: '2020-11-11 10:04:52',
	funding: 'has_funding',
	id: 6,
	quantity: 1,
	status: 'open',
	technology_id: 23,
	updated_at: '2020-11-11 10:04:52',
	use: 'private',
	user_id: 15,
};

const getOrdersData = [
	{
		id: 16,
		user_id: 15,
		technology_id: 4,
		quantity: 3,
		status: 'canceled',
		use: 'enterprise',
		funding: 'no_need_funding',
		comment: 'Teste',
		cancellation_reason: 'Cancelar',
		unit_value: null,
		created_at: '2020-12-21 14:24:39',
		updated_at: '2020-12-21 14:24:51',
		technology: {
			id: 4,
			title: 'Fa kuvne ri.',
			slug: 'fa-kuvne-ri',
			description:
				'Modidzer ku acfonnep kefugo vuotrar behos sahnaw gowah del le ecefutu du vo fof wagvo cooku. Fagsal vuewo inu gunhor be fiju kuwihijo wu ziefu dimisnu kuiptep atopa tutiw bafnif sij zef noguhuj. Josser zomfulul gas curaon onoteh ujgatu ejde wuzlow fuboilo upuan potidce ic. Lohel asuro re bonu si hokjadpiv wez ajdus fop he fi vew seg zow igla puwluv puj zahzu. Sile cabbiches vegobgig hus al ibiv iz gefjiup nob cub bubradivo cigdel on. Rucpar fazkuw kikil ike wohojijis siret fipim lugwaje sojatoj pemo tamjih ogucip. No fe wow tegtobu puji sot ceb taenahug egeb hiwda zocfig muzopgeg faeffe.',
			private: 1,
			thumbnail_id: 3,
			likes: 2,
			patent: 1,
			patent_number: 'o9qg5nvY',
			primary_purpose:
				'Unacune ofuri pesok fu uh atpahizu sajufgo nojzacevi zitevsa ibbif gorufukaw uhdikar cad huka juv kapapet. Kiswaz de fopim wug rum nevifugif dezemvod wiltuman tustez ohkemud nuk ve datvore mod mip edi tatvab kiz. Sosin huleev semhif ovponiw tev vi egamo vokufmi le kamove lihe tedeb ugozegsig wiha ema sitibbuw ke.',
			secondary_purpose:
				'Iv dacilot ruj ihesihpah huvwejap vovpedo ohefo er vepra veefabi bo himzauba susgaj hu. Utwe pituwla ofo tivcecin ropfekpi rotoj awlahled kifsopdeg ujoawooti zu luv zofumneb hibbom cucre. Jaekawep piov iru ladafomo kapo ofiri ovuken vubuk lig oko iwa vocijuiku di isele kafesud sus gobfeig honefu. Ge wanivti vu ralga kow paj wev vowcan ipawezsed oloirja ki be ne binob wonofi javisteh az om.',
			application_mode:
				'Dowjufbu gefidu tuihowom cu zikfad pu akuize zobhekka us ni ivaukuun mod jitese cusas. Umeig buh cuzci orugepi zitonze magejbul kis leh jomibpuw bah kamak la umwauko wokpem. Fer zof fo na hudidji tawejbe memaw innud li ka fop kacunu jefedko zilnuv civo keziz jan.',
			application_examples:
				'Iceiggug ri zuupuri ma hede fe nud fibowo doat ke cehiig cuf pohju onu mi fooh. Heh lo bitipje avo fitwomro repta ton obo towgijtip ev cahtek cifdozag ahze. Owihe ke gafo edegamwi mugocoj pohifa esto ririge saliteuj ri culu lofka owead tenucno dindu lolokze varnuj. Domse haazjis buz pama we eboken ci tomevdi mifiz me cubo isa ajola ci. Ce fizuwsu rejwetu fovewudip zin pufjawid vawuz biila se wiohow be apjo dihof sitro kasraf zi.',
			installation_time: 656,
			solves_problem:
				'Jobesnol kuezuopo otuhupi pidomgi kituhino vuniazo ubfuif hineac sogewa omi zu cer bansek ciwibha imnac. Toduk vejlah wugru ra vesnov op ecusut vof igku olizudaf jocomu hu usehowid cer re iden. Riw ol gosit un sa te nefusunu momrenki hufedlu kacjugus eni kun. Ju kukvieno jadas ubbovasi hemhiido hu cici apoofomap nusnuchaw odapewaf wepuvi wor viwbav uz kibzekub ti.',
			entailes_problem:
				'Juktog tojkin uteirizo utral ezveme secje borlupik mutpa digega kucinzet ofab idbewec voafwih lozog enanatin bacuv bot tiafu. Baze ridij nipira gecleed jejetuc wilsa hocdupjih weulkab nibozge ollo losuhe rom reholav unihi jeuk itgonas tozehuj. Zivok jufovti limajub um giticih doj be pazten ehhuva mogaudu epfoci hopon vu haw. Fagci pulir ec diszectog seikucoh ru rolof ugurof cocsekjop unafe asapicruv elinoap usu ket va zezgat. So lozo poedo degfewe mazjito pagwah le giwuvuso seto enka rac liujbej mosme kooj jul issied. Ni padvadbe wonino jeslu rupiig zakmu ihefji kuvutsot ji ro vonus gij tuar el kawad ehevev ulija. Vozdifbof nihmethi ki tisiddoh cavefik ogu eza nu nev roka laf gusa ogetual ovebuvge alba pakko nepumfim.',
			requirements:
				'Ab wikeba ded eheaze ne elre il uporiap wik ob nelim hi kudek dalad pukunif himpep upe. Lud zika jip fipo opaoceron munke arpuksu puldawop evane nugibwec zok mig jok rabzofrim. Guren cor div efnabwi semec her lursel ol rebnov vehavu otbi rus. Cu vav ki va zig kej kevsouj wir gommeob hefgug iswolep do. Kubho abwun regdiz ga iz li oblad alisu mesgiozo tuji re kururop upure nagenaf karibi ehbowjaf isa. Sakehnon caubo tisil badkocel jam maga jemi fijkor wojosdu da tohbej suhwi cali divkigge nasrun woszijzu iwovan co.',
			risks:
				'Les uponuw eti evsanrus zotuhofe houhegu du hoj livil tisabjub zofurfi etoat ibe wewusgi latnapa. Et das imavamge wisuvi kusihen ezowo kogeh zavip bipgocsu gujanto utuurovu obpobtod gaegdi. Kuzufu vu ongiw ir aguufnu gofsekpad goidcoc vuj vefew lo og sit oba konzodsa hajaz jin neznaro. Nuf jihuke alekalne ome duiwafaj zomo ranvinub var sek soptizin jilu kan zuuvam bopbowvu. Ga lel berbamu hacakroz kuwva isnama gokimur vuz usa etew ewra ahi. Sunabcod puapze lazebudo jugnov tivlahus susluimi tesgiet ufakaw fuc difeva kec de jimuw kev cog felsias ga. Horavi non bese usog vetruaw mighe reegziw liebud mufudop ewa alege li jaga tir.',
			contribution:
				'Nohap foticaj olu zu gunhop jo itabo hi ko rader vav iz og wic poruvoto gammotwi wudfaej. Gagcirwus lovifpoc ho retmi ucobe noduhlog binoj goojbi adolop nibem powjih ca ife gullonmu. Saagu fogaduva gauc vuggael din otone nob mewloz vafcin finsig ber el junupe jamcusopi edoug ravoz tew tav. Lisij lafloegu vudfijif zukibzi ceho puwev ji gimeoge ekfojgaz mo udfaow foug nu ruf locid udzovov litab. Mutje fin uj enedufpih en cabed opreki pebav lane wa wuv sahvezaj sel sosjosa luloja juk ga nulkopjeg. Mawmutdo atija bic nuftiz bad finda vupufo calikah tu susjugu ijaho upkolmef neesag ojteviz ud.',
			status: 'published',
			created_at: '2020-12-21 10:39:46',
			updated_at: '2020-12-21 13:26:47',
			intellectual_property: 0,
			videos: [],
			objectID: 'technology-4',
		},
		user: {
			id: 15,
			email: 'sabiatestingreviewer01@gmail.com',
			status: 'verified',
			first_name: 'Sabia',
			last_name: '01',
			company: '10',
			zipcode: '12345123',
			cpf: '44561244824',
			birth_date: '1995-03-13T03:00:00.000Z',
			phone_number: '(13) 99740-8871',
			lattes_id: '1234567890',
			address: 'Ale',
			address2: null,
			district: 'Santos',
			city: 'Santos',
			state: 'SP',
			country: 'Brasil',
			role_id: 4,
			institution_id: null,
			created_at: '2020-12-21 10:39:52',
			updated_at: '2020-12-21 11:02:08',
			full_name: 'Sabia 01',
			can_be_curator: true,
			can_buy_technology: true,
		},
	},
];

const getOrderData = {
	id: 15,
	user_id: 15,
	technology_id: 4,
	quantity: 14,
	status: 'closed',
	use: 'local_government',
	funding: 'has_funding',
	comment: 'Comentario',
	cancellation_reason: null,
	unit_value: 123456,
	created_at: '2020-12-21 14:23:51',
	updated_at: '2020-12-21 14:24:21',
	technology: {
		id: 4,
		title: 'Fa kuvne ri.',
		slug: 'fa-kuvne-ri',
		description:
			'Modidzer ku acfonnep kefugo vuotrar behos sahnaw gowah del le ecefutu du vo fof wagvo cooku. Fagsal vuewo inu gunhor be fiju kuwihijo wu ziefu dimisnu kuiptep atopa tutiw bafnif sij zef noguhuj. Josser zomfulul gas curaon onoteh ujgatu ejde wuzlow fuboilo upuan potidce ic. Lohel asuro re bonu si hokjadpiv wez ajdus fop he fi vew seg zow igla puwluv puj zahzu. Sile cabbiches vegobgig hus al ibiv iz gefjiup nob cub bubradivo cigdel on. Rucpar fazkuw kikil ike wohojijis siret fipim lugwaje sojatoj pemo tamjih ogucip. No fe wow tegtobu puji sot ceb taenahug egeb hiwda zocfig muzopgeg faeffe.',
		private: 1,
		thumbnail_id: 3,
		likes: 2,
		patent: 1,
		patent_number: 'o9qg5nvY',
		primary_purpose:
			'Unacune ofuri pesok fu uh atpahizu sajufgo nojzacevi zitevsa ibbif gorufukaw uhdikar cad huka juv kapapet. Kiswaz de fopim wug rum nevifugif dezemvod wiltuman tustez ohkemud nuk ve datvore mod mip edi tatvab kiz. Sosin huleev semhif ovponiw tev vi egamo vokufmi le kamove lihe tedeb ugozegsig wiha ema sitibbuw ke.',
		secondary_purpose:
			'Iv dacilot ruj ihesihpah huvwejap vovpedo ohefo er vepra veefabi bo himzauba susgaj hu. Utwe pituwla ofo tivcecin ropfekpi rotoj awlahled kifsopdeg ujoawooti zu luv zofumneb hibbom cucre. Jaekawep piov iru ladafomo kapo ofiri ovuken vubuk lig oko iwa vocijuiku di isele kafesud sus gobfeig honefu. Ge wanivti vu ralga kow paj wev vowcan ipawezsed oloirja ki be ne binob wonofi javisteh az om.',
		application_mode:
			'Dowjufbu gefidu tuihowom cu zikfad pu akuize zobhekka us ni ivaukuun mod jitese cusas. Umeig buh cuzci orugepi zitonze magejbul kis leh jomibpuw bah kamak la umwauko wokpem. Fer zof fo na hudidji tawejbe memaw innud li ka fop kacunu jefedko zilnuv civo keziz jan.',
		application_examples:
			'Iceiggug ri zuupuri ma hede fe nud fibowo doat ke cehiig cuf pohju onu mi fooh. Heh lo bitipje avo fitwomro repta ton obo towgijtip ev cahtek cifdozag ahze. Owihe ke gafo edegamwi mugocoj pohifa esto ririge saliteuj ri culu lofka owead tenucno dindu lolokze varnuj. Domse haazjis buz pama we eboken ci tomevdi mifiz me cubo isa ajola ci. Ce fizuwsu rejwetu fovewudip zin pufjawid vawuz biila se wiohow be apjo dihof sitro kasraf zi.',
		installation_time: 656,
		solves_problem:
			'Jobesnol kuezuopo otuhupi pidomgi kituhino vuniazo ubfuif hineac sogewa omi zu cer bansek ciwibha imnac. Toduk vejlah wugru ra vesnov op ecusut vof igku olizudaf jocomu hu usehowid cer re iden. Riw ol gosit un sa te nefusunu momrenki hufedlu kacjugus eni kun. Ju kukvieno jadas ubbovasi hemhiido hu cici apoofomap nusnuchaw odapewaf wepuvi wor viwbav uz kibzekub ti.',
		entailes_problem:
			'Juktog tojkin uteirizo utral ezveme secje borlupik mutpa digega kucinzet ofab idbewec voafwih lozog enanatin bacuv bot tiafu. Baze ridij nipira gecleed jejetuc wilsa hocdupjih weulkab nibozge ollo losuhe rom reholav unihi jeuk itgonas tozehuj. Zivok jufovti limajub um giticih doj be pazten ehhuva mogaudu epfoci hopon vu haw. Fagci pulir ec diszectog seikucoh ru rolof ugurof cocsekjop unafe asapicruv elinoap usu ket va zezgat. So lozo poedo degfewe mazjito pagwah le giwuvuso seto enka rac liujbej mosme kooj jul issied. Ni padvadbe wonino jeslu rupiig zakmu ihefji kuvutsot ji ro vonus gij tuar el kawad ehevev ulija. Vozdifbof nihmethi ki tisiddoh cavefik ogu eza nu nev roka laf gusa ogetual ovebuvge alba pakko nepumfim.',
		requirements:
			'Ab wikeba ded eheaze ne elre il uporiap wik ob nelim hi kudek dalad pukunif himpep upe. Lud zika jip fipo opaoceron munke arpuksu puldawop evane nugibwec zok mig jok rabzofrim. Guren cor div efnabwi semec her lursel ol rebnov vehavu otbi rus. Cu vav ki va zig kej kevsouj wir gommeob hefgug iswolep do. Kubho abwun regdiz ga iz li oblad alisu mesgiozo tuji re kururop upure nagenaf karibi ehbowjaf isa. Sakehnon caubo tisil badkocel jam maga jemi fijkor wojosdu da tohbej suhwi cali divkigge nasrun woszijzu iwovan co.',
		risks:
			'Les uponuw eti evsanrus zotuhofe houhegu du hoj livil tisabjub zofurfi etoat ibe wewusgi latnapa. Et das imavamge wisuvi kusihen ezowo kogeh zavip bipgocsu gujanto utuurovu obpobtod gaegdi. Kuzufu vu ongiw ir aguufnu gofsekpad goidcoc vuj vefew lo og sit oba konzodsa hajaz jin neznaro. Nuf jihuke alekalne ome duiwafaj zomo ranvinub var sek soptizin jilu kan zuuvam bopbowvu. Ga lel berbamu hacakroz kuwva isnama gokimur vuz usa etew ewra ahi. Sunabcod puapze lazebudo jugnov tivlahus susluimi tesgiet ufakaw fuc difeva kec de jimuw kev cog felsias ga. Horavi non bese usog vetruaw mighe reegziw liebud mufudop ewa alege li jaga tir.',
		contribution:
			'Nohap foticaj olu zu gunhop jo itabo hi ko rader vav iz og wic poruvoto gammotwi wudfaej. Gagcirwus lovifpoc ho retmi ucobe noduhlog binoj goojbi adolop nibem powjih ca ife gullonmu. Saagu fogaduva gauc vuggael din otone nob mewloz vafcin finsig ber el junupe jamcusopi edoug ravoz tew tav. Lisij lafloegu vudfijif zukibzi ceho puwev ji gimeoge ekfojgaz mo udfaow foug nu ruf locid udzovov litab. Mutje fin uj enedufpih en cabed opreki pebav lane wa wuv sahvezaj sel sosjosa luloja juk ga nulkopjeg. Mawmutdo atija bic nuftiz bad finda vupufo calikah tu susjugu ijaho upkolmef neesag ojteviz ud.',
		status: 'published',
		created_at: '2020-12-21 10:39:46',
		updated_at: '2020-12-21 13:26:47',
		intellectual_property: 0,
		videos: [],
		objectID: 'technology-4',
		thumbnail: {
			id: 3,
			filename: 'Foto-Crevettic-1.png',
			user_id: 11,
			object: 'technologies',
			object_id: 4,
			created_at: '2020-12-21 13:26:45',
			updated_at: '2020-12-21 13:26:45',
			url: 'http://0.0.0.0:3333/uploads/technologies/Foto-Crevettic-1.png',
		},
	},
	user: {
		id: 15,
		email: 'sabiatestingreviewer01@gmail.com',
		status: 'verified',
		first_name: 'Sabia',
		last_name: '01',
		company: '10',
		zipcode: '12345123',
		cpf: '44561244824',
		birth_date: '1995-03-13T03:00:00.000Z',
		phone_number: '(13) 99740-8871',
		lattes_id: '1234567890',
		address: 'Ale',
		address2: null,
		district: 'Santos',
		city: 'Santos',
		state: 'SP',
		country: 'Brasil',
		role_id: 4,
		institution_id: null,
		created_at: '2020-12-21 10:39:52',
		updated_at: '2020-12-21 11:02:08',
		full_name: 'Sabia 01',
		can_be_curator: true,
		can_buy_technology: true,
	},
};

const settleADealData = {
	id: 17,
	user_id: 11,
	technology_id: 4,
	quantity: '1',
	status: 'closed',
	use: 'private',
	funding: 'has_funding',
	comment: '123',
	cancellation_reason: null,
	unit_value: 123,
	created_at: '2020-12-21 15:43:09',
	updated_at: '2020-12-21 15:43:22',
};

const cancelOrderData = {
	id: 18,
	user_id: 11,
	technology_id: 4,
	quantity: 1,
	status: 'canceled',
	use: 'private',
	funding: 'has_funding',
	comment: 'asd',
	cancellation_reason: 'Cancelado',
	unit_value: null,
	created_at: '2020-12-21 15:54:24',
	updated_at: '2020-12-21 15:55:23',
};

describe('buyTechnology', () => {
	const buyTechnologyEndpoint = /technologies\/(.*)\/orders/;

	beforeAll(() => {
		fetchMock.mockReset();

		fetchMock.post(buyTechnologyEndpoint, {
			status: 200,
			body: {
				...buyTechnologyData,
			},
		});
	});

	test('it creates a technology order successfuly', async () => {
		const order = await buyTechnology(23, {
			quantity: 1,
			use: 'private',
			funding: 'has_funding',
			comment: 'Teste',
		});

		expect(order).toEqual({
			...buyTechnologyData,
		});

		expect(fetchMock).toHaveFetched(buyTechnologyEndpoint, {
			method: 'POST',
			body: {
				quantity: 1,
				use: 'private',
				funding: 'has_funding',
				comment: 'Teste',
			},
		});
	});

	test('it returns false if no id is provided', async () => {
		const order = await buyTechnology();

		expect(order).toBeFalsy();
	});

	test('it returns false if no quantity, use and funding is provided', async () => {
		const order = await buyTechnology(1, { quantity: null, use: null, funding: null });

		expect(order).toBeFalsy();
	});

	test('it returns false if response is not 200', async () => {
		fetchMock.mockReset();
		fetchMock.post(buyTechnologyEndpoint, { status: 400 });
		const order = await buyTechnology(1, {
			quantity: 1,
			use: 'private',
			funding: 'has_funding',
		});

		expect(order).toBeFalsy();
		expect(fetchMock).toHaveFetched(buyTechnologyEndpoint, {
			method: 'POST',
			status: 400,
		});
	});
});

describe('getOrders', () => {
	const getOrdersEndpoint = /orders/;

	beforeAll(() => {
		fetchMock.mockReset();

		fetchMock.get(getOrdersEndpoint, {
			status: 200,
			body: {
				...getOrdersData,
			},
		});
	});

	test('it fetches technology orders data successfully', async () => {
		const { orders } = await getOrders();

		expect(orders).toEqual({
			...getOrdersData,
		});

		expect(fetchMock).toHaveFetched(getOrdersEndpoint, {
			method: 'GET',
		});
	});

	test('it returns false if response is not 200', async () => {
		fetchMock.mockReset();
		fetchMock.get(getOrdersEndpoint, { status: 400 });
		const { orders } = await getOrders();

		expect(orders).toBeFalsy();
		expect(fetchMock).toHaveFetched(getOrdersEndpoint, {
			method: 'GET',
			status: 400,
		});
	});
});

describe('getOrder', () => {
	const getOrderEndpoint = /orders\/(.*)/;

	beforeAll(() => {
		fetchMock.mockReset();

		fetchMock.get(getOrderEndpoint, {
			status: 200,
			body: {
				...getOrderData,
			},
		});
	});

	test('it fetches technology single order data successfully', async () => {
		const order = await getOrder(1, 'technology');

		expect(order).toEqual({
			...getOrderData,
		});

		expect(fetchMock).toHaveFetched(getOrderEndpoint, {
			method: 'GET',
		});
	});

	test('it returns false if no id is provided', async () => {
		const order = await getOrder();

		expect(order).toBeFalsy();
	});

	test('it returns false if no order type is provided', async () => {
		const order = await getOrder(1);

		expect(order).toBeFalsy();
	});

	test('it returns false if response is not 200', async () => {
		fetchMock.mockReset();
		fetchMock.get(getOrderEndpoint, { status: 400 });
		const order = await getOrder(1, 'technology');

		expect(order).toBeFalsy();
		expect(fetchMock).toHaveFetched(getOrderEndpoint, {
			method: 'GET',
			status: 400,
		});
	});
});

describe('settleADeal', () => {
	const settleADealEndpoint = /orders\/(.*)\/close/;

	beforeAll(() => {
		fetchMock.mockReset();

		fetchMock.put(settleADealEndpoint, {
			status: 200,
			body: {
				...settleADealData,
			},
		});
	});

	test('it settle the deal successfully', async () => {
		const order = await settleADeal(1, {
			quantity: 10,
			unit_value: 123456,
			orderType: 'technology',
		});

		expect(order).toEqual({
			...settleADealData,
		});

		expect(fetchMock).toHaveFetched(settleADealEndpoint, {
			method: 'PUT',
			body: {
				quantity: 10,
				unit_value: 123456,
			},
		});
	});

	test('it returns false if no id is provided', async () => {
		const order = await settleADeal();

		expect(order).toBeFalsy();
	});

	test('it returns false if no quantity, unit_value, or orderType is provided', async () => {
		const order = await settleADeal(1);

		expect(order).toBeFalsy();
	});

	test('it returns false if response is not 200', async () => {
		fetchMock.mockReset();
		fetchMock.put(settleADealEndpoint, { status: 400 });
		const order = await settleADeal(1, {
			quantity: 1,
			unit_value: 123,
			orderType: 'technology',
		});

		expect(order).toBeFalsy();
		expect(fetchMock).toHaveFetched(settleADealEndpoint, {
			method: 'PUT',
			status: 400,
		});
	});
});

describe('cancelOrder', () => {
	const cancelOrderEndpoint = /orders\/(.*)\/cancel/;

	beforeAll(() => {
		fetchMock.mockReset();

		fetchMock.put(cancelOrderEndpoint, {
			status: 200,
			body: {
				...cancelOrderData,
			},
		});
	});

	test('it cancels the order successfully', async () => {
		const order = await cancelOrder(1, {
			cancellation_reason: 'cancelamento',
			orderType: 'technology',
		});

		expect(order).toEqual({
			...cancelOrderData,
		});

		expect(fetchMock).toHaveFetched(cancelOrderEndpoint, {
			method: 'PUT',
			body: {
				cancellation_reason: 'cancelamento',
			},
		});
	});

	test('it returns false if no id is provided', async () => {
		const order = await cancelOrder();

		expect(order).toBeFalsy();
	});

	test('it returns false if no orderType is provided', async () => {
		const order = await cancelOrder(1);

		expect(order).toBeFalsy();
	});

	test('it returns false if response is not 200', async () => {
		fetchMock.mockReset();
		fetchMock.put(cancelOrderEndpoint, { status: 400 });
		const order = await cancelOrder(1, { orderType: 'technology' });

		expect(order).toBeFalsy();
		expect(fetchMock).toHaveFetched(cancelOrderEndpoint, {
			method: 'PUT',
			status: 400,
		});
	});
});
