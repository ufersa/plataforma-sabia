import React from 'react';
import PropTypes from 'prop-types';
import { List, Datagrid, TextField, EditButton, ReferenceField } from 'react-admin';

const ReviewersList = ({ basePath, resource, hasCreate, hasEdit, hasList, hasShow }) => (
	<List
		basePath={basePath}
		resource={resource}
		hasCreate={hasCreate}
		hasEdit={hasEdit}
		hasList={hasList}
		hasShow={hasShow}
		perPage={25}
	>
		<Datagrid>
			<TextField source="status" />
			<ReferenceField label="User" source="user_id" reference="users">
				<TextField source="full_name" />
			</ReferenceField>
			<EditButton />
		</Datagrid>
	</List>
);
ReviewersList.propTypes = {
	resource: PropTypes.string.isRequired,
	basePath: PropTypes.string.isRequired,
	hasCreate: PropTypes.bool.isRequired,
	hasEdit: PropTypes.bool.isRequired,
	hasList: PropTypes.bool.isRequired,
	hasShow: PropTypes.bool.isRequired,
};

export default ReviewersList;
