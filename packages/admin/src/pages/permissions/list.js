import React from 'react';
import PropTypes from 'prop-types';
import { List, Datagrid, TextField, EditButton, DeleteWithConfirmButton } from 'react-admin';

const PermissionsList = ({ basePath, resource, hasCreate, hasEdit, hasList, hasShow }) => (
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
			<TextField source="permission" />
			<TextField source="description" />
			<EditButton label="" variant="contained" color="primary" />
			<DeleteWithConfirmButton label="" variant="contained" color="default" />
		</Datagrid>
	</List>
);
PermissionsList.propTypes = {
	resource: PropTypes.string.isRequired,
	basePath: PropTypes.string.isRequired,
	hasCreate: PropTypes.bool.isRequired,
	hasEdit: PropTypes.bool.isRequired,
	hasList: PropTypes.bool.isRequired,
	hasShow: PropTypes.bool.isRequired,
};

export default PermissionsList;
