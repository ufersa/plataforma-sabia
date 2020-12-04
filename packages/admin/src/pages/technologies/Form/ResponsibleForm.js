import React from 'react';
import PropTypes from 'prop-types';
import { SimpleShowLayout, TextField, ReferenceField, ArrayField, Datagrid } from 'react-admin';

const ResponsibleForm = ({ record, resource }) => {
	return (
		<SimpleShowLayout record={record} resource={resource}>
			<ArrayField source="users">
				<Datagrid>
					<TextField source="full_name" />
					<ReferenceField basePath="/users" label="Email" source="id" reference="users">
						<TextField source="email" />
					</ReferenceField>
					<TextField source="company" />
					<TextField source="status" />
					<TextField label="Role" source="pivot.role" />
				</Datagrid>
			</ArrayField>
		</SimpleShowLayout>
	);
};
ResponsibleForm.propTypes = {
	record: PropTypes.shape({ id: PropTypes.number }),
	resource: PropTypes.string,
};

ResponsibleForm.defaultProps = {
	record: { id: null },
	resource: '',
};

export default ResponsibleForm;
