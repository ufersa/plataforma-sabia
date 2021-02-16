import React from 'react';
import PropTypes from 'prop-types';
import { Filter, ReferenceInput, SelectInput, TextInput, DateTimeInput } from 'react-admin';
import { statuses } from '../../components';

const TechnologyFilterBar = ({
	context,
	displayedFilters,
	filterValues,
	resource,
	source,
	hideFilter,
	showFilter,
	setFilters,
}) => {
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
			<TextInput source="unit_value" alwaysOn />
			<SelectInput source="status" fullWidth alwaysOn choices={statuses.orders} />
			<ReferenceInput
				source="responsible"
				reference="users"
				perPage={100}
				fullWidth
				alwaysOn
				filter={{ responsible: '', orderBy: 'full_name', order: 'asc' }}
			>
				<SelectInput optionText="full_name" />
			</ReferenceInput>
			<ReferenceInput
				source="buyer"
				reference="users"
				perPage={100}
				fullWidth
				alwaysOn
				filter={{ buyer: '', orderBy: 'full_name', order: 'asc' }}
			>
				<SelectInput optionText="full_name" />
			</ReferenceInput>
			<DateTimeInput label="labels.start_date" alwaysOn source="dateStart" />
			<DateTimeInput label="labels.end_date" alwaysOn source="dateEnd" />
		</Filter>
	);
};
TechnologyFilterBar.propTypes = {
	context: PropTypes.string,
	displayedFilters: PropTypes.shape({}),
	filterValues: PropTypes.shape({}),
	resource: PropTypes.string,
	source: PropTypes.string,
	showFilter: PropTypes.func,
	hideFilter: PropTypes.func,
	setFilters: PropTypes.func,
};

TechnologyFilterBar.defaultProps = {
	context: 'button',
	displayedFilters: { title: true },
	filterValues: {},
	resource: 'technologies',
	source: 'title',
	showFilter: () => {},
	hideFilter: () => {},
	setFilters: () => {},
};

export default TechnologyFilterBar;
