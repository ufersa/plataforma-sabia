import React from 'react';
import PropTypes from 'prop-types';
import {
	SimpleShowLayout,
	TextField,
	ArrayField,
	Datagrid,
	DateField,
	ReferenceField,
} from 'react-admin';
import { ChipField } from '../../../components';

const Technologies = ({ record, resource }) => {
	return (
		<SimpleShowLayout record={record} resource={resource}>
			<ArrayField source="technologies" addLabel={false}>
				<Datagrid>
					<TextField source="id" />
					<TextField label="Role" source="pivot.role" fullWidth />
					<ReferenceField
						label="Title"
						basePath="/technologies"
						source="id"
						reference="technologies"
					>
						<ChipField source="title" />
					</ReferenceField>
					<TextField source="status" />
					<TextField source="description" />
					<DateField label="Created" showTime source="created_at" />
					<DateField label="Updated" showTime source="updated_at" />
				</Datagrid>
			</ArrayField>
		</SimpleShowLayout>
	);
};

Technologies.propTypes = {
	record: PropTypes.shape({}),
	resource: PropTypes.string,
};

Technologies.defaultProps = {
	record: {},
	resource: '',
};

export default Technologies;
