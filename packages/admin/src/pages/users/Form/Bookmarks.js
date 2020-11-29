import React from 'react';
import PropTypes from 'prop-types';
import { SimpleShowLayout, TextField, ArrayField, Datagrid, ReferenceField } from 'react-admin';
import { ChipField } from '../../../components';

const Bookmarks = ({ record, resource }) => {
	return (
		<SimpleShowLayout record={record} resource={resource}>
			<ArrayField source="bookmarks" addLabel={false}>
				<Datagrid>
					<TextField source="id" />
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
				</Datagrid>
			</ArrayField>
		</SimpleShowLayout>
	);
};

Bookmarks.propTypes = {
	record: PropTypes.shape({}),
	resource: PropTypes.string,
};

Bookmarks.defaultProps = {
	record: {},
	resource: '',
};

export default Bookmarks;
