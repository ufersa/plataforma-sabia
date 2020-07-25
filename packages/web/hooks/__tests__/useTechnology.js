import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { useTechnology } from '..';
import { TechnologyProvider } from '../../components/Technology';

const testTechnology = {
	id: 29,
	title: 'Keoz delocfuk vum.',
	slug: 'keoz-delocfuk-vum',
	description:
		'Ebvirko fugadu esumuwlib kiapados un dakna tirdijew owufod oc ec hifinda cew pen wofe. Ba sod rupuf lidap teha osucewej tolbevudu coznegug bi deppiusi lew sororwi oha bihfik joczub tofal ulnoci. Delutzak zo ebe pefawuse tig zogi lepcoh okso hij bi ecefok kijmow ton josivi di uh.',
	private: 1,
	thumbnail: 'https://rocketfinalchallenge.s3.amazonaws.com/card-image.jpg',
	likes: 2,
	patent: 1,
	patent_number: 'E2htsBGv',
	primary_purpose:
		'Gitohza jemo zu oli vobheiga atugahop tezdunu bugtuci eztoton latew ma ma tagut amze je zed. Vodiki tasad pan zoni vapuripe pu wo igo ulda nacokkik emidamew saumkob mentem. Angem fup cubba tihupowi pu ebojan kan to medcoce liepuvev elmiwus honhivju datofjuk egdiko wafuntes ufmiw vug eziromhit.',
	secondary_purpose:
		'Kaswec jujvi ugi busiolu roarosah dar ve jauso avot vagabka lum sajlisu. Lelzu nohol es bibva gibwiwar hiv vuh je behon ovtotbe jawnekec zorego era ebimu. Efo ve ge kisaf je olurohu ta afmebob ovguledu li wus ponlemke cipbin. Taj fi som sipjah efipuz siw nerepu eleevkok junek isulote ilcaafi ju fivmiap cajro be ik. Gasfal it asolawe vazar so vu fonit ba atu vitok apihahi zicpik maszuvec utumiko. He sebij ubbe jidi hipa ezgezze ifi puda hi otetiiwo azudewuz hidavwob.',
	application_mode:
		'Wib tohotum erifju bemkul kamukro cuwwiwram uvijab fu licava arrufna jujwejnud opeulo humruksap sedmit husjogi do. Upekafa titun vujzi vo nusocgof vibe lev mocwutju torapone fok pebfosges zuhavel wita. Vaolo zuci bok jic am akmubala ro zuz sizew zevuwabuz dimhev vidadko punge zuz in.',
	application_examples:
		'Zazo wenur gemu wiwi neose tami bum timjeldas igbetcif de lugpultan oz belzacki dopfadkec. Pedrap filwas durimi ri afu bodetgi vaso lokci hidju uzfu zi etnuz ripawa delawima jujadra. Ezcisfap guvivopo jeh hutesa laj upi zef bela zo moazo favo lecunic jaw. Zuzwec pam roja kit nijuk si zuhusmoz ur diwi wom ticunhif gabablem vi ducifago.',
	installation_time: 42,
	solves_problem:
		'Hec ifgitkuc hicow te nofo pipvos mojatvoz ibvet sihkuavu tagikacu du voh etdu ez. Kobzobmu foj poj te acu hotat bi jaakezi uzva cuzne nal guwsegiv za op wionu luto vabmin. Nij ti ta fivbujfe salga pe gewmel tatiglo ode vakojzud wi joj jomajpen zervagtap zano. Pum ujaazdaw evuruvaw ovebufi kiniv ceheifa eksa cebiip marpodi ira olu ewpu zub noj tihova sol ne aku. Fehil gaj nuk kurkineb jalku ogapiw olo rin lamiru tew je zowutip uf tavdudpes.',
	entailes_problem:
		'We lofos jis ikfojaj vemcetmah kitmusoz mokohroh amhup bin guesi hu naoze efeke. Taimuuc rozakun wi mug noclukiw kaz ecazognus ij muw in gaukege guhiibe esaohohuv je enke uha. Eltehwo pok vuwmoj ka jon ne gutiobo wanebih nirdo esenowaf iduihfi dozmu siborlug tozep vocfaoc voduhlo ulaco. Ric nibed jad na siwfojta pemvijva jajajok pobosi akeputuc eru iv ocinoev. Lapcum hevuz dacem ati davomiw dula la birem giva alecal in tok kopfilute sedeib. Apo tinis ije buj cu tigzujbon uja woba icowik sahadca ko tida me uzvih ejifo keej zovdedo.',
	requirements:
		'Usbulhis me gapom pullarto sobgeeb sicofep sok welno digle zah isvidru digiw ne la pona milout gubzomi. Cuwunvu id hiwgu ihrehcug nucpa bo sob kijini ha rel zup si lu bepgu vetha nokufaf lifaug. Wunkonid ibjalrus kebapud tun tenhumaz azifanwoh guz cezritzov ucimocnef usuupoben ke ga den le enedicol ojfalun. Guhku cabkuz isle hisuc nokeh rizew nu vejovdu bugahah hotolvi goc sagidavu sadlakiz uwa reficre jagapiep wew.',
	risks:
		'Sabas beg ez icepuhe mege zutget newalho lebta oropen bukluhem fut reocogeh uw pi ilefufer. Ehugoz wepjana ni nomkuffu mekto uwooduis hov ditvulnak jumacaw wozuput uf jenzauke no win ocevires ese. Kagfeb ivet wavjuwew ukubbu kigwaban rup huled zaliluza onpa ke nomradeh ciren deluha lopu oviil. Vih vow optif la bulifa rit hujafa we ob gajo cuborvol actem.',
	contribution:
		'Big ikrig ev tu ucegid ili tidkovmar wakfagiv tel muta jabwa za huzhu ek. Zidwac vu laba bif ofku ipumo ruusedat kulowwu ceguh zuhdopmac ra mob medafe. Luwiw kinipeve miwmupeg hiawi gokpufbut uvo icli napbos zumnun zifuc zewvaz hodgefe kuvnid nu sattew febveaki bonomhat.',
	status: 'DRAFT',
	created_at: '2020-07-25 17:23:54',
	updated_at: '2020-07-25 17:24:02',
	objectID: 'technology-29',
	users: [],
	terms: [
		{
			id: 222,
			term: 'Otter',
			slug: 'otter',
			parent_id: null,
			taxonomy_id: 2,
			created_at: '2020-07-25 17:24:00',
			updated_at: '2020-07-25 17:24:00',
			taxonomy: {
				id: 2,
				taxonomy: 'KEYWORDS',
				description: 'Palavras-chave que definem a tecnologia.',
				created_at: '2020-07-25 17:23:54',
				updated_at: '2020-07-25 17:23:54',
			},
			pivot: { term_id: 222, technology_id: 29 },
		},
		{
			id: 223,
			term: 'Cotton Rat',
			slug: 'cotton-rat',
			parent_id: null,
			taxonomy_id: 2,
			created_at: '2020-07-25 17:24:00',
			updated_at: '2020-07-25 17:24:00',
			taxonomy: {
				id: 2,
				taxonomy: 'KEYWORDS',
				description: 'Palavras-chave que definem a tecnologia.',
				created_at: '2020-07-25 17:23:54',
				updated_at: '2020-07-25 17:23:54',
			},
			pivot: { term_id: 223, technology_id: 29 },
		},
		{
			id: 224,
			term: 'Nubian Ibex',
			slug: 'nubian-ibex',
			parent_id: null,
			taxonomy_id: 2,
			created_at: '2020-07-25 17:24:00',
			updated_at: '2020-07-25 17:24:00',
			taxonomy: {
				id: 2,
				taxonomy: 'KEYWORDS',
				description: 'Palavras-chave que definem a tecnologia.',
				created_at: '2020-07-25 17:23:54',
				updated_at: '2020-07-25 17:23:54',
			},
			pivot: { term_id: 224, technology_id: 29 },
		},
		{
			id: 225,
			term: 'White-throated Bee Eater',
			slug: 'white-throated-bee-eater',
			parent_id: null,
			taxonomy_id: 2,
			created_at: '2020-07-25 17:24:00',
			updated_at: '2020-07-25 17:24:00',
			taxonomy: {
				id: 2,
				taxonomy: 'KEYWORDS',
				description: 'Palavras-chave que definem a tecnologia.',
				created_at: '2020-07-25 17:23:54',
				updated_at: '2020-07-25 17:23:54',
			},
			pivot: { term_id: 225, technology_id: 29 },
		},
		{
			id: 226,
			term: 'Amur Tiger',
			slug: 'amur-tiger',
			parent_id: null,
			taxonomy_id: 2,
			created_at: '2020-07-25 17:24:00',
			updated_at: '2020-07-25 17:24:00',
			taxonomy: {
				id: 2,
				taxonomy: 'KEYWORDS',
				description: 'Palavras-chave que definem a tecnologia.',
				created_at: '2020-07-25 17:23:54',
				updated_at: '2020-07-25 17:23:54',
			},
			pivot: { term_id: 226, technology_id: 29 },
		},
		{
			id: 1,
			term: 'Avanços tecnológicos',
			slug: 'avancos-tecnologicos',
			parent_id: null,
			taxonomy_id: 3,
			created_at: '2020-07-25 17:23:54',
			updated_at: '2020-07-25 17:23:54',
			taxonomy: {
				id: 3,
				taxonomy: 'CLASSIFICATION',
				description: 'Classificação da tecnologia.',
				created_at: '2020-07-25 17:23:54',
				updated_at: '2020-07-25 17:23:54',
			},
			pivot: { term_id: 1, technology_id: 29 },
		},
		{
			id: 5,
			term: 'Colocação da tecnologia em operação',
			slug: 'colocacao-da-tecnologia-em-operacao',
			parent_id: null,
			taxonomy_id: 4,
			created_at: '2020-07-25 17:23:54',
			updated_at: '2020-07-25 17:23:54',
			taxonomy: {
				id: 4,
				taxonomy: 'STAGE',
				description:
					'Estágio de desenvolvimento da tecnologia baseado o TRL (Nível de Maturidade Tecnológica)',
				created_at: '2020-07-25 17:23:54',
				updated_at: '2020-07-25 17:23:54',
			},
			pivot: { term_id: 5, technology_id: 29 },
		},
		{
			id: 10,
			term: 'Cultural',
			slug: 'cultural',
			parent_id: null,
			taxonomy_id: 5,
			created_at: '2020-07-25 17:23:54',
			updated_at: '2020-07-25 17:23:54',
			taxonomy: {
				id: 5,
				taxonomy: 'DIMENSION',
				description: 'Dimensão da Tecnologia',
				created_at: '2020-07-25 17:23:54',
				updated_at: '2020-07-25 17:23:54',
			},
			pivot: { term_id: 10, technology_id: 29 },
		},
		{
			id: 12,
			term: 'Recursos Hídricos',
			slug: 'recursos-hidricos',
			parent_id: null,
			taxonomy_id: 1,
			created_at: '2020-07-25 17:23:54',
			updated_at: '2020-07-25 17:23:54',
			taxonomy: {
				id: 1,
				taxonomy: 'CATEGORY',
				description:
					'Categoria a qual pertence a tecnologia. Se o termo possuir um pai (parent_id), trata-se de uma subcategoria',
				created_at: '2020-07-25 17:23:54',
				updated_at: '2020-07-25 17:23:54',
			},
			pivot: { term_id: 12, technology_id: 29 },
		},
		{
			id: 13,
			term: 'Oferta de Água/Armazenamento',
			slug: 'oferta-de-aguaarmazenamento',
			parent_id: 12,
			taxonomy_id: 1,
			created_at: '2020-07-25 17:23:54',
			updated_at: '2020-07-25 17:23:54',
			taxonomy: {
				id: 1,
				taxonomy: 'CATEGORY',
				description:
					'Categoria a qual pertence a tecnologia. Se o termo possuir um pai (parent_id), trata-se de uma subcategoria',
				created_at: '2020-07-25 17:23:54',
				updated_at: '2020-07-25 17:23:54',
			},
			pivot: { term_id: 13, technology_id: 29 },
		},
		{
			id: 73,
			term: 'Empresários',
			slug: 'empresarios',
			parent_id: null,
			taxonomy_id: 6,
			created_at: '2020-07-25 17:23:54',
			updated_at: '2020-07-25 17:23:54',
			taxonomy: {
				id: 6,
				taxonomy: 'TARGET_AUDIENCE',
				description: 'Público-alvo da tecnologia',
				created_at: '2020-07-25 17:23:54',
				updated_at: '2020-07-25 17:23:54',
			},
			pivot: { term_id: 73, technology_id: 29 },
		},
		{
			id: 77,
			term: 'Zona da Mata',
			slug: 'zona-da-mata',
			parent_id: null,
			taxonomy_id: 7,
			created_at: '2020-07-25 17:23:54',
			updated_at: '2020-07-25 17:23:54',
			taxonomy: {
				id: 7,
				taxonomy: 'BIOME',
				description: 'Bioma no qual se insere a tecnologia (Caatinga, Zona da Mata, etc)',
				created_at: '2020-07-25 17:23:54',
				updated_at: '2020-07-25 17:23:54',
			},
			pivot: { term_id: 77, technology_id: 29 },
		},
		{
			id: 79,
			term: 'Mais Nordeste',
			slug: 'mais-nordeste',
			parent_id: null,
			taxonomy_id: 8,
			created_at: '2020-07-25 17:23:54',
			updated_at: '2020-07-25 17:23:54',
			taxonomy: {
				id: 8,
				taxonomy: 'GOVERNMENT_PROGRAM',
				description:
					'Programas de governos (Bolsa Família, Mais Nordeste, etc) dos quais faz parte a tecnologia',
				created_at: '2020-07-25 17:23:54',
				updated_at: '2020-07-25 17:23:54',
			},
			pivot: { term_id: 79, technology_id: 29 },
		},
		{
			id: 80,
			term: 'Propriedade Intelectual 1',
			slug: 'propriedade-intelectual-1',
			parent_id: null,
			taxonomy_id: 9,
			created_at: '2020-07-25 17:23:54',
			updated_at: '2020-07-25 17:23:54',
			taxonomy: {
				id: 9,
				taxonomy: 'INTELLECTUAL_PROPERTY',
				description: 'Propriedade intelectual da tecnologia',
				created_at: '2020-07-25 17:23:54',
				updated_at: '2020-07-25 17:23:54',
			},
			pivot: { term_id: 80, technology_id: 29 },
		},
	],
	reviews: [],
	bookmarkUsers: [
		{
			id: 2,
			email: 'bu@as.au',
			status: 'pending',
			first_name: 'rCJgPzKXaBuSs',
			last_name: 'ljd%Vp(zRpJVz42S4a',
			secondary_email: null,
			company: '[zoZK$^B8o)tnkbSR2',
			zipcode: '83871',
			cpf: '19311813633',
			birth_date: '2033-05-19 10:38:25.548',
			phone_number: '07352210802',
			lattes_id: '76093568263',
			address: 'SWF9g98hMzRQe',
			address2: 'VQpnGo%kfAp',
			district: 'O@P@oj',
			city: 'xEERQy',
			state: 'PuY[^aAY',
			country: '%Z^q3xS&b&g(T0VN',
			role_id: 1,
			created_at: '2020-07-25 17:23:53',
			updated_at: '2020-07-25 17:23:53',
			full_name: 'rCJgPzKXaBuSs ljd%Vp(zRpJVz42S4a',
			pivot: { user_id: 2, technology_id: 29 },
		},
		{
			id: 3,
			email: 'va@cetwikofe.gf',
			status: 'pending',
			first_name: 'CeqfG[V#F',
			last_name: 'UwL6@Eh!fpFzuR%',
			secondary_email: null,
			company: '$A@^jA[A]4cj^)hp',
			zipcode: '66016',
			cpf: '99814889241',
			birth_date: '2106-07-17 00:05:00.661',
			phone_number: '74175555835',
			lattes_id: '67615404588',
			address: 'z0gn5QuF#[H',
			address2: '%GEh^7@SDtBJ5Ie3',
			district: 'k1PLsn*D(6[55',
			city: '7$b[QOM%k!IO',
			state: 'lVx*]',
			country: 'O0ATIaYUBC#',
			role_id: 1,
			created_at: '2020-07-25 17:23:53',
			updated_at: '2020-07-25 17:23:53',
			full_name: 'CeqfG[V#F UwL6@Eh!fpFzuR%',
			pivot: { user_id: 3, technology_id: 29 },
		},
	],
	technologyCosts: [
		{
			id: 29,
			funding_required: 1,
			funding_type: '2PTPc',
			funding_value: 92013330,
			funding_status: '7UV*DHN',
			notes:
				'Ehope erlop pof fu musfol nuarowac cif foato jeopuwop guzac zow sabij sidsuj. Nerti ovugavik od busjohji sakohru vekov uzocuvpow fo nozad op fuz fu elgubsu do. Rofe fi nauk wotipaiz dipipro la iraowacok maj wi su getiknic ija uputelmon tedpulide olu. Dipboot fugcowek cu siava luco amtu na zuhuom peigo ko na awju magleg hegno zaini dufare vebinjah taodjul. Ved sufwal nakow oj nuetiip ebtej jafu akbuse luf jez hiros ifoku ut neswufcir ke. Mib gudo rakoem wuwep vuwpof ke zanoc tuw azfap saj efivu vinseduv bagli itizivug. Ke ohnis daoda sanak ad gumpicluj lerhir sa bamitno wuga sis omuhel siwme.',
			technology_id: 29,
			created_at: '2020-07-25 17:24:03',
			updated_at: '2020-07-25 17:24:03',
		},
	],
	taxonomies: {
		KEYWORDS: 'Otter, Cotton Rat, Nubian Ibex, White-throated Bee Eater, Amur Tiger',
		CLASSIFICATION: 'Avanços tecnológicos',
		STAGE: 'Colocação da tecnologia em operação',
		DIMENSION: 'Cultural',
		CATEGORY: 'Recursos Hídricos, Oferta de Água/Armazenamento',
		TARGET_AUDIENCE: 'Empresários',
		BIOME: 'Zona da Mata',
		GOVERNMENT_PROGRAM: 'Mais Nordeste',
		INTELLECTUAL_PROPERTY: 'Propriedade Intelectual 1',
	},
};

// eslint-disable-next-line react/prop-types
const wrapper = ({ children }) => (
	<TechnologyProvider technology={testTechnology}>{children}</TechnologyProvider>
);

describe('useTechnology', () => {
	it('can set technology', () => {
		const { result } = renderHook(() => useTechnology(), { wrapper });

		expect(result.current.technology).toEqual(testTechnology);
	});
});
