import React from 'react';
import PropTypes from 'prop-types';
import { Filter, ReferenceInput, SelectInput, TextInput, DateTimeInput } from 'react-admin';

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
			<TextInput label="Unit Value" source="unit_value" alwaysOn />
			<SelectInput
				label="Status"
				source="status"
				fullWidth
				alwaysOn
				choices={[
					{ id: 'open', name: 'Open' },
					{ id: 'finish', name: 'Finish' },
					{ id: 'canceled', name: 'Canceled' },
				]}
			/>
			<ReferenceInput
				label="Responsible"
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
				label="Buyer"
				source="buyer"
				reference="users"
				perPage={100}
				fullWidth
				alwaysOn
				filter={{ buyer: '', orderBy: 'full_name', order: 'asc' }}
			>
				<SelectInput optionText="full_name" />
			</ReferenceInput>
			<DateTimeInput alwaysOn source="date" />
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
