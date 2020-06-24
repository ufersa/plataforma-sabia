import React from 'react';
import PropTypes from 'prop-types';
import {
	List,
	Datagrid,
	TextField,
	EditButton,
	DeleteWithConfirmButton,
	ReferenceField,
	ReferenceArrayField,
	SingleFieldList,
	ChipField,
} from 'react-admin';

const UsersList = ({ basePath, resource, hasCreate, hasEdit, hasList, hasShow }) => (
	<List
		basePath={basePath}
		resource={resource}
		hasCreate={hasCreate}
		hasEdit={hasEdit}
		hasList={hasList}
		hasShow={hasShow}
		perPage={30}
	>
		<Datagrid>
			<TextField source="id" />
			<TextField source="email" />
			<TextField source="status" />
			<TextField source="first_name" />
			<TextField source="last_name" />
			<TextField source="company" />
			<ReferenceField label="Role" source="role_id" reference="roles">
				<TextField source="role" />
			</ReferenceField>

			<ReferenceArrayField
				perPage={999}
				label="Permissions"
				reference="permissions"
				source="permissions"
			>
				<SingleFieldList>
					<ChipField source="permission" />
				</SingleFieldList>
			</ReferenceArrayField>

			<EditButton />
			<DeleteWithConfirmButton />
		</Datagrid>
	</List>
);
UsersList.propTypes = {
	resource: PropTypes.string.isRequired,
	basePath: PropTypes.string.isRequired,
	hasCreate: PropTypes.bool.isRequired,
	hasEdit: PropTypes.bool.isRequired,
	hasList: PropTypes.bool.isRequired,
	hasShow: PropTypes.bool.isRequired,
};

export default UsersList;
