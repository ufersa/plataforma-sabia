import React from 'react';
import { render } from 'test-utils';
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

test('it render the MapAndAttachments page', () => {
	const { container } = render(
		<Form onSubmit={onSubmit}>
			<MapAndAttachments />
		</Form>,
	);

	expect(container).toMatchSnapshot();
});
