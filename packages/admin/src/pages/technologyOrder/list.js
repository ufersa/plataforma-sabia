import React from 'react';
import PropTypes from 'prop-types';
import {
	List,
	Datagrid,
	TextField,
	ReferenceField,
	EditButton,
	DateField,
	ArrayField,
} from 'react-admin';
import FilterBar from './FilterBar';

const TechnologyOrdersList = ({ basePath, resource, hasCreate, hasEdit, hasList, hasShow }) => (
	<List
		basePath={basePath}
		resource={resource}
		hasCreate={hasCreate}
		hasEdit={hasEdit}
		hasList={hasList}
		hasShow={hasShow}
		perPage={25}
		filters={<FilterBar />}
	>
		<Datagrid>
			<TextField source="id" />
			<ReferenceField
				basePath="/technologies"
				label="Technology"
				source="technology_id"
				reference="technologies"
			>
				<TextField source="title" />
			</ReferenceField>
			<ArrayField label="Responsible" source="technology.users">
				<Datagrid>
					<ReferenceField basePath="/users" label="Name" source="id" reference="users">
						<TextField source="full_name" />
					</ReferenceField>
					<TextField label="Role" source="pivot.role" />
				</Datagrid>
			</ArrayField>
			<TextField source="status" />
			<ReferenceField basePath="/users" label="Buyer" source="user_id" reference="users">
				<TextField source="full_name" />
			</ReferenceField>
			<TextField source="quantity" />
			<TextField source="unit_value" />
			<DateField label="Created" showTime source="created_at" />
			<DateField label="Updated" showTime source="updated_at" />
			<EditButton />
		</Datagrid>
	</List>
);
TechnologyOrdersList.propTypes = {
	resource: PropTypes.string.isRequired,
	basePath: PropTypes.string.isRequired,
	hasCreate: PropTypes.bool.isRequired,
	hasEdit: PropTypes.bool.isRequired,
	hasList: PropTypes.bool.isRequired,
	hasShow: PropTypes.bool.isRequired,
};

export default TechnologyOrdersList;
