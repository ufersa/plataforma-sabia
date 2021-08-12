import React from 'react';
import PropTypes from 'prop-types';

import { AutocompleteInput, useQuery } from 'react-admin';

const CityInput = ({ state }) => {
	const citiesResult = useQuery({
		type: 'getList',
		resource: `states/${state}/cities`,
		payload: {
			pagination: {
				page: 1,
				perPage: 100,
			},
			sort: {
				field: 'id',
				order: 'asc',
			},
		},
	});

	const cities = citiesResult?.data?.map((cityItem) => ({
		id: cityItem.id,
		name: cityItem.name,
	}));

	return (
		<AutocompleteInput
			label="Cidade"
			name="city_id"
			source="city"
			choices={cities}
			fullWidth
			resettable
		/>
	);
};

CityInput.propTypes = {
	state: PropTypes.number,
};

CityInput.defaultProps = {
	state: '',
};

export default CityInput;
