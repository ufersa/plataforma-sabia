import React from 'react';
import PropTypes from 'prop-types';
import {
	List,
	Datagrid,
	TextField,
	EditButton,
	DeleteWithConfirmButton,
	ReferenceField,
	Pagination,
} from 'react-admin';
import { ResendConfirmationEmail, StatusField, UserFilterBar } from '../../components';

const UserPagination = () => <Pagination rowsPerPageOptions={[10, 25, 50, 75, 100]} />;

const UsersList = ({ basePath, resource, hasCreate, hasEdit, hasList, hasShow }) => {
	return (
		<List
			basePath={basePath}
			resource={resource}
			hasCreate={hasCreate}
			hasEdit={hasEdit}
			hasList={hasList}
			hasShow={hasShow}
			perPage={100}
			filters={<UserFilterBar />}
			pagination={<UserPagination />}
		>
			<Datagrid>
				<TextField source="email" />
				<StatusField source="Status" />
				<TextField source="first_name" />
				<TextField source="last_name" />
				<ReferenceField source="institution_id" reference="institutions">
					<TextField source="initials" />
				</ReferenceField>
				<ReferenceField source="role_id" reference="roles">
					<TextField source="role" />
				</ReferenceField>
				<ResendConfirmationEmail />
				<EditButton />
				<DeleteWithConfirmButton />
			</Datagrid>
		</List>
	);
};
UsersList.propTypes = {
	resource: PropTypes.string.isRequired,
	basePath: PropTypes.string.isRequired,
	hasCreate: PropTypes.bool.isRequired,
	hasEdit: PropTypes.bool.isRequired,
	hasList: PropTypes.bool.isRequired,
	hasShow: PropTypes.bool.isRequired,
};

export default UsersList;
