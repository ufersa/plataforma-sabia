import React from 'react';
import { render, screen, waitFor } from 'test-utils';
import MapAndAttachments from '..';
import { Form } from '../../../Form';

jest.mock('react-places-autocomplete', () => {
	return {
		__esModule: true,
		geocodeByPlaceId: () => {
			return <vid>geocodeByPlaceId</vid>;
		},
		default: () => {
			return <div>PlacesAutocomplete</div>;
		},
	};
});

const onSubmit = jest.fn(() => {});

test('it render the MapAndAttachments page', async () => {
	const { container } = render(
		<Form onSubmit={onSubmit}>
			<MapAndAttachments />
		</Form>,
	);

	expect(container).toMatchSnapshot();
});

/* Videos */
test('should render the videos list', async () => {
	const { container } = render(
		<Form onSubmit={onSubmit}>
			<MapAndAttachments />
		</Form>,
	);

	await waitFor(() => screen.getByText('Videos da tecnologia'));

	expect(container).toMatchSnapshot();
});

test('should the videos list is empty', async () => {
	const { container } = render(
		<Form onSubmit={onSubmit}>
			<MapAndAttachments />
		</Form>,
	);

	await waitFor(() => screen.getByText('Nenhum vídeo adicionado'));

	expect(container).toMatchSnapshot();
});
