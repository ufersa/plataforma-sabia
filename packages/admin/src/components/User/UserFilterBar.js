import React from 'react';
import PropTypes from 'prop-types';
import { Filter, TextInput, SelectInput } from 'react-admin';
import statuses from '../StatusForm/statuses';

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
			<TextInput label="E-mail" source="email" alwaysOn />
			<SelectInput source="status" choices={statuses.users} alwaysOn />
			<TextInput label="Sigla" source="initials" alwaysOn />
			<SelectInput source="role" choices={statuses.user_roles} alwaysOn />
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
