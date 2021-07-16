import React from 'react';
import PropTypes from 'prop-types';
import {
	List,
	Datagrid,
	TextField,
	DateField,
	EditButton,
	DeleteWithConfirmButton,
	ReferenceField,
} from 'react-admin';

import { ChipField, ServiceFilterBar, BooleanNumField } from '../../components';

const ServicesList = ({ basePath, resource, hasCreate, hasEdit, hasList, hasShow }) => {
	return (
		<List
			basePath={basePath}
			resource={resource}
			hasCreate={hasCreate}
			hasEdit={hasEdit}
			hasList={hasList}
			hasShow={hasShow}
			perPage={25}
			filters={<ServiceFilterBar />}
		>
			<Datagrid>
				<TextField source="id" />
				<TextField source="name" />
				<ReferenceField
					label="labels.institution"
					source="user.institution_id"
					reference="institutions"
				>
					<TextField source="initials" />
				</ReferenceField>
				<ReferenceField label="labels.responsible" source="user.id" reference="users">
					<ChipField source="full_name" />
				</ReferenceField>
				<BooleanNumField source="active" />
				<DateField source="created_at" />
				<EditButton label="" variant="contained" color="primary" />
				<DeleteWithConfirmButton label="" variant="contained" color="default" />
			</Datagrid>
		</List>
	);
};
ServicesList.propTypes = {
	resource: PropTypes.string.isRequired,
	basePath: PropTypes.string.isRequired,
	hasCreate: PropTypes.bool.isRequired,
	hasEdit: PropTypes.bool.isRequired,
	hasList: PropTypes.bool.isRequired,
	hasShow: PropTypes.bool.isRequired,
};

export default ServicesList;
