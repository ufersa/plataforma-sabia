import React from 'react';
import PropTypes from 'prop-types';
import {
	List,
	Datagrid,
	TextField,
	EditButton,
	DeleteWithConfirmButton,
	ReferenceField,
} from 'react-admin';

const IdeasList = ({ basePath, resource, hasCreate, hasEdit, hasList, hasShow }) => (
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
			<TextField source="id" />
			<TextField source="title" />
			<TextField source="description" />
			<ReferenceField label="labels.owner" source="user_id" reference="users">
				<TextField source="email" />
			</ReferenceField>
			<EditButton label="" variant="contained" color="primary" />
			<DeleteWithConfirmButton label="" variant="contained" color="default" />
		</Datagrid>
	</List>
);
IdeasList.propTypes = {
	resource: PropTypes.string.isRequired,
	basePath: PropTypes.string.isRequired,
	hasCreate: PropTypes.bool.isRequired,
	hasEdit: PropTypes.bool.isRequired,
	hasList: PropTypes.bool.isRequired,
	hasShow: PropTypes.bool.isRequired,
};

export default IdeasList;
