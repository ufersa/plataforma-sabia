import React from 'react';
import { render } from 'test-utils';
import Review from '..';
import { Form } from '../../../Form';

const data = {
	technology: {
		title: 'Gesbib powev sodzomjikm.',
		slug: 'gesbib-powev-sodzomjikm',
		description:
			'Kodopifi sammehor voecara wu dietu je zedsande lo nemnoriv zi metoeju na bajo.',
		private: 0,
		thumbnail: 'https://rocketfinalchallenge.s3.amazonaws.com/card-image.jpg',
		likes: 15,
		patent: 1,
		patent_number: 'iJuXXxRQ',
		primary_purpose: 'Fobsomir ikepet icpu cickavcib wedug.',
		secondary_purpose: 'Of date vemcodnig gubkeji uzato.',
		application_examples: 'Acuce id sootodoc nepzes hi hello.',
		application_mode: 'Li ca ceapeabo tovimi igtilezo udpuz uga su uzo cuhi sece pikan.',

		installation_time: 34,
		solves_problem: 'Bigzacu cien wekgeg jivmu dorcuze iwuuzoza .',
		entailes_problem: 'Bimpa havla ibru tus sogjo dezecaw jozto kosedzo rakhojup gatsud obe.',
		requirements: 'Kemferuh maddovo om .',
		risks: 'Goel sozuhpid mol ep.',
		contribution: 'Ru egefuhge.',
		responsible: [
			{
				email: 'responsible-1@plataforma-sabia.com.br',
				fullName: 'Mr responsible 1',
				lattesId: 123456789,
				phone: '+55 84 9 9999 1111',
			},
			{
				email: 'responsible-2@plataforma-sabia.com.br',
				fullName: 'Mr responsible 2',
				lattesId: 123456789,
				phone: '+55 84 9 9999 2222',
			},
		],
		technologyCosts: {
			id: 1,
			funding_required: 1,
			funding_type: 'private',
			funding_value: 92549056,
			funding_status: 'acquired',
			notes:
				'Huj sulmu neuhdah caikohen vemval fa eheluj hom jaceku unimor uckol satnab ena kovojra luezafi. Arfi izu zujo nazence zehabupa pihivkuf upnuus lew kewinsuw wimo ecico ribepi falor fewsevpos roun pomankak fo. Evdip ufuidubod ufuce vog le abufotwon ozzemtu imifoaz ugajupew nupuop nehin ge bibuca uvuja ine ukij uziule. Tac ob va wepud runmeh ijeciwiz jodimuj imu aveluh iholotez cune busdunbov bolgosbok logruow sojod bewzirdid wepjujsur. Avi ga jauc watajpe jaf tefwa genuja cu bifuratig dipku amheow nore fohocsaw juksete koscuc ruhjipla fibar jacpo. Uc dufar feh ileh uvu dig jog faig dout vireel poba sokur pi magridi.',
			costs: {
				maintenance_costs: [
					{
						id: 1,
						description: 'Ob dote nikbod mucirowo rifako ifzavob pizlutu viv ge farwu.',
						type: 'raw_input',
						quantity: 92,
						value: 20382361,
					},
				],
				development_costs: [
					{
						id: 2,
						description:
							'Rojas uzvajka pi padtiz wozcum hidudasu ovwebgoh peab ju liugcod.',
						type: 'raw_input',
						quantity: 47,
						value: 84262938,
					},
				],
				implementation_costs: [
					{
						id: 3,
						description: 'Na fi aj gu kiniwli balewu baonuz sibpeno bisdes usbodka.',
						type: 'service',
						quantity: 1,
						value: 29952890,
						technology_cost_id: 1,
						created_at: '2020-08-18 23:17:14',
						updated_at: '2020-08-18 23:17:14',
					},
				],
			},
		},
		taxonomies: {
			keywords: 'Mouse, Ladybug, Amur Tiger, Rabbit, Carp',
			classification: 'Inovações sociais',
		},
		technologyResponsibles: {
			owner: {
				id: 11,
				full_name: 'FirstName LastName',
				email: 'sabiatestinge2e@gmail.com',
				phone_number: null,
				lattes_id: null,
				status: 'verified',
			},
			users: [
				{
					id: 12,
					full_name: 'FirstName LastName',
					email: 'sabiatesting@gmail.com',
					phone_number: null,
					lattes_id: null,
					status: 'pending',
				},
			],
		},
		attachments: [
			{
				id: 1,
				filename: 'image.png',
				url: 'http://127.0.0.1:3333/uploads/technologies/image.png',
			},
			{
				id: 2,
				filename: 'image-1.pdf',
				url: 'http://127.0.0.1:3333/uploads/technologies/image-1.pdf',
			},
		],
	},
};

const onSubmit = jest.fn(() => {});

test('it render the review page', () => {
	const { container } = render(
		<Form onSubmit={onSubmit}>
			<Review data={data} />
		</Form>,
	);

	expect(container).toMatchSnapshot();
});
