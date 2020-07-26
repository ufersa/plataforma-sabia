import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { useTechnology } from '..';
import { TechnologyProvider } from '../../components/Technology';

const testTechnology = {
	id: 29,
	title: 'Keoz delocfuk vum.',
	slug: 'keoz-delocfuk-vum',
	description: 'Ebvirko fugadu esumuwlib kiapados un dakna tirdijew owufod.',
	private: 1,
	thumbnail: 'https://rocketfinalchallenge.s3.amazonaws.com/card-image.jpg',
	likes: 2,
	patent: 1,
	patent_number: 'E2htsBGv',
	primary_purpose: 'Gitohza jemo zu oli vobheiga atugahop tezdunu bugtuci eztoton latew.',
	secondary_purpose: 'Kaswec jujvi ugi busiolu roarosah dar ve jauso avot vagabka lum sajlisu.',
	application_mode: 'Wib tohotum erifju bemkul kamukro cuwwiwram uvijab fu.',
	application_examples: 'Zazo wenur gemu wiwi neose tami bum timjeldas igbetcif.',
	installation_time: 42,
	solves_problem: 'Hec ifgitkuc hicow te nofo pipvos mojatvoz ibvet.',
	entailes_problem: 'We lofos jis ikfojaj vemcetmah kitmusoz mokohroh amhup.',
	requirements: 'Usbulhis me gapom pullarto sobgeeb sicofep sok welno digle.',
	risks: 'Sabas beg ez icepuhe mege zutget newalho lebta oropen bukluhem.',
	contribution: 'Big ikrig ev tu ucegid ili tidkovmar wakfagiv tel muta jabwa.',
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
	],
	technologyCosts: [
		{
			id: 29,
			funding_required: 1,
			funding_type: '2PTPc',
			funding_value: 92013330,
			funding_status: '7UV*DHN',
			notes: 'Ehope erlop pof fu musfol nuarowac cif.',
			technology_id: 29,
			created_at: '2020-07-25 17:24:03',
			updated_at: '2020-07-25 17:24:03',
		},
	],
	taxonomies: {
		KEYWORDS: 'Otter',
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
