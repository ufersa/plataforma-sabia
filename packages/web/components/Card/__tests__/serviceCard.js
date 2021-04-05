/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { render, screen } from 'test-utils';

import ServiceCard from '../ServiceCard';

jest.mock('next/image', () => {
	return {
		__esModule: true,
		// eslint-disable-next-line jsx-a11y/alt-text
		default: ({ objectFit, ...props }) => <img {...props} style={{ objectFit }} />,
	};
});

const props = {
	id: 1,
	name: 'Service Test',
	price: 123,
	measure_unit: 'Other',
	user: { institution: { initials: '123' } },
};

const thumbnailsTest = [
	['labor', '/under-construction-rafiki.svg'],
	['specialized_technical_work', '/eletrician-rafiki.svg'],
	['consulting', '/group-chat-rafiki.svg'],
	['analysis ', '/analysis-rafiki.svg'],
	['examination ', '/laboratory-rafiki.svg'],
	['expertise ', '/creative-experience-rafiki.svg'],
	['other ', '/environment-rafiki.svg'],
	['Mão-de-obra', '/under-construction-rafiki.svg'],
	['Trabalho técnico especializado', '/eletrician-rafiki.svg'],
	['Consultoria', '/group-chat-rafiki.svg'],
	['Análise', '/analysis-rafiki.svg'],
	['Exame', '/laboratory-rafiki.svg'],
	['Perícia', '/creative-experience-rafiki.svg'],
	['Outro', '/environment-rafiki.svg'],
];

describe('<ServiceCard />', () => {
	test.each(thumbnailsTest)('it should render correct thumbnail for type %s', (type, url) => {
		render(<ServiceCard {...props} type={type} />);

		expect(screen.getByRole('img')).toHaveAttribute('src', url);
	});
});
