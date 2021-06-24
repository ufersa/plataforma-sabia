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
import { StatusField } from '../../components';

const AnnouncementsList = ({ basePath, resource, hasCreate, hasEdit, hasList, hasShow }) => {
	return (
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
				<ReferenceField source="institution_id" reference="institutions">
					<TextField source="initials" />
				</ReferenceField>
				<TextField source="announcement_number" />
				<TextField source="title" />
				<StatusField source="status" />
				<ReferenceField source="user_id" reference="users">
					<TextField source="email" />
				</ReferenceField>
				<EditButton label="" variant="contained" color="primary" />
				<DeleteWithConfirmButton label="" variant="contained" color="default" />
			</Datagrid>
		</List>
	);
};
AnnouncementsList.propTypes = {
	resource: PropTypes.string.isRequired,
	basePath: PropTypes.string.isRequired,
	hasCreate: PropTypes.bool.isRequired,
	hasEdit: PropTypes.bool.isRequired,
	hasList: PropTypes.bool.isRequired,
	hasShow: PropTypes.bool.isRequired,
};

export default AnnouncementsList;
