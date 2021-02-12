import React from 'react';
import PropTypes from 'prop-types';
import { Filter, SelectInput, TextInput } from 'react-admin';
import statuses from '../StatusForm/statuses';

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
			<TextInput source="title" alwaysOn />
			<SelectInput
				label="Status"
				source="status"
				fullWidth
				alwaysOn
				choices={statuses.technologies}
			/>
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
