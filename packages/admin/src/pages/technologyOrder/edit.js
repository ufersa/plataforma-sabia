import React from 'react';
import PropTypes from 'prop-types';
import {
	Edit,
	SimpleShowLayout,
	TextField,
	ArrayField,
	Datagrid,
	ReferenceField,
	DateField,
} from 'react-admin';
import { StatusForm } from '../../components';

const TechnologyOrdersEdit = ({ basePath, id, resource }) => (
	<Edit id={id} basePath={basePath} resource={resource}>
		<SimpleShowLayout>
			<StatusForm />
			<ArrayField label="labels.responsibles" source="technology.users">
				<Datagrid>
					<ReferenceField
						basePath="/users"
						label="labels.full_name"
						source="id"
						reference="users"
					>
						<TextField source="full_name" />
					</ReferenceField>
					<TextField label="labels.role" source="pivot.role" />
				</Datagrid>
			</ArrayField>
			<ReferenceField
				basePath="/technologies"
				source="technology_id"
				reference="technologies"
			>
				<TextField source="title" />
			</ReferenceField>
			<ReferenceField
				basePath="/users"
				label="labels.buyer"
				source="user_id"
				reference="users"
			>
				<TextField source="full_name" />
			</ReferenceField>
			<TextField source="status" />
			<TextField source="quantity" />
			<TextField source="unit_value" />
			<TextField source="use" />
			<TextField source="funding" />
			<TextField source="comment" />
			<TextField source="cancellation_reason" />
			<DateField showTime source="created_at" />
			<DateField showTime source="updated_at" />
		</SimpleShowLayout>
	</Edit>
);

TechnologyOrdersEdit.propTypes = {
	id: PropTypes.string.isRequired,
	basePath: PropTypes.string.isRequired,
	resource: PropTypes.string.isRequired,
};

export default TechnologyOrdersEdit;
