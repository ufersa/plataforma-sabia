import React from 'react';
import PropTypes from 'prop-types';
import { Filter, TextInput } from 'react-admin';

const UserFilterBar = ({
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
			<TextInput source="name" alwaysOn />
			<TextInput source="status" alwaysOn />
			<TextInput label="Sigla" source="initials" alwaysOn />
			<TextInput source="role" alwaysOn />
		</Filter>
	);
};
UserFilterBar.propTypes = {
	context: PropTypes.string,
	displayedFilters: PropTypes.shape({}),
	filterValues: PropTypes.shape({}),
	resource: PropTypes.string,
	source: PropTypes.string,
	showFilter: PropTypes.func,
	hideFilter: PropTypes.func,
	setFilters: PropTypes.func,
};

UserFilterBar.defaultProps = {
	context: 'button',
	displayedFilters: { name: true },
	filterValues: {},
	resource: 'users',
	source: 'name',
	showFilter: () => {},
	hideFilter: () => {},
	setFilters: () => {},
};

export default UserFilterBar;
