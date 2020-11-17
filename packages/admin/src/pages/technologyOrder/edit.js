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
			<StatusForm
				choices={[
					{ id: 'open', name: 'Open' },
					{ id: 'finish', name: 'Finish' },
					{ id: 'canceled', name: 'Canceled' },
				]}
			/>
			<ArrayField label="Responsible" source="technology.users">
				<Datagrid>
					<ReferenceField basePath="/users" label="Name" source="id" reference="users">
						<TextField source="full_name" />
					</ReferenceField>
					<TextField label="Role" source="pivot.role" />
				</Datagrid>
			</ArrayField>
			<ReferenceField
				basePath="/technologies"
				label="Technology"
				source="technology_id"
				reference="technologies"
			>
				<TextField source="title" />
			</ReferenceField>
			<ReferenceField basePath="/users" label="Buyer" source="user_id" reference="users">
				<TextField source="full_name" />
			</ReferenceField>
			<TextField source="status" />
			<TextField source="quantity" />
			<TextField source="unit_value" />
			<TextField source="use" />
			<TextField source="funding" />
			<TextField source="comment" />
			<TextField source="cancellation_reason" />
			<DateField label="Created" showTime source="created_at" />
			<DateField label="Updated" showTime source="updated_at" />
		</SimpleShowLayout>
	</Edit>
);

TechnologyOrdersEdit.propTypes = {
	id: PropTypes.string.isRequired,
	basePath: PropTypes.string.isRequired,
	resource: PropTypes.string.isRequired,
};

export default TechnologyOrdersEdit;
