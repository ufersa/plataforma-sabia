import React from 'react';
import PropTypes from 'prop-types';
import { Filter, ReferenceInput, SelectInput, TextInput } from 'react-admin';

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
			<TextInput label="Title" source="title" alwaysOn />
			<SelectInput
				label="Status"
				source="status"
				fullWidth
				alwaysOn
				choices={[
					{ id: 'draft', name: 'Draft' },
					{ id: 'pending', name: 'Pending' },
					{ id: 'in_review', name: 'In review' },
					{ id: 'requested_changes', name: 'Requested changes' },
					{ id: 'changes_made', name: 'Changes made' },
					{ id: 'approved', name: 'Approved' },
					{ id: 'rejected', name: 'Rejected' },
					{ id: 'published', name: 'Published' },
				]}
			/>
			<ReferenceInput
				label="Category"
				source="term"
				reference="terms"
				perPage={100}
				fullWidth
				alwaysOn
				filter={{ taxonomy: 'category', orderBy: 'term', order: 'asc' }}
			>
				<SelectInput optionText="term" />
			</ReferenceInput>
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
