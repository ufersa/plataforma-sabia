import React from 'react';
import PropTypes from 'prop-types';
import { Filter, TextInput, AutocompleteInput, useQuery } from 'react-admin';

const ServiceFilterBar = ({
	context,
	displayedFilters,
	filterValues,
	resource,
	source,
	hideFilter,
	showFilter,
	setFilters,
}) => {
	const institutionsResult = useQuery({
		type: 'getList',
		resource: `institutions`,
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

	const institutions = institutionsResult?.data?.map((institution) => ({
		id: institution.id,
		name: institution.initials,
	}));

	return (
		<Filter
			context={context}
			displayedFilters={displayedFilters}
			filterValues={filterValues}
			resource={resource}
			source={source}
			hideFilter={hideFilter}
			showFilter={showFilter}
			setFilters={setFilters}
		>
			<TextInput source="name" alwaysOn />
			<AutocompleteInput source="institution" choices={institutions} alwaysOn />
		</Filter>
	);
};
ServiceFilterBar.propTypes = {
	context: PropTypes.string,
	displayedFilters: PropTypes.shape({}),
	filterValues: PropTypes.shape({}),
	resource: PropTypes.string,
	source: PropTypes.string,
	showFilter: PropTypes.func,
	hideFilter: PropTypes.func,
	setFilters: PropTypes.func,
};

ServiceFilterBar.defaultProps = {
	context: 'button',
	displayedFilters: { name: true },
	filterValues: {},
	resource: 'services',
	source: 'name',
	showFilter: () => {},
	hideFilter: () => {},
	setFilters: () => {},
};

export default ServiceFilterBar;
