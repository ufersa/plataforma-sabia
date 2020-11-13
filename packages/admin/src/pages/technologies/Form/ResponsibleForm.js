import React from 'react';
import PropTypes from 'prop-types';
import {
	useQuery,
	Loading,
	Error,
	SimpleShowLayout,
	TextField,
	ReferenceField,
	ArrayField,
	Datagrid,
} from 'react-admin';

const ResponsibleForm = ({ record, resource }) => {
	const { loading, error, data } = useQuery({
		type: 'getList',
		resource: `technologies/${record.id}/users`,
		payload: {
			pagination: {
				page: 1,
				perPage: 100,
			},
			sort: {
				field: 'id',
				order: 'asc',
			},
		},
	});
	if (error) return <Error />;
	if (loading) return <Loading />;

	return (
		<SimpleShowLayout record={{ users: data }} resource={resource}>
			<ArrayField source="users">
				<Datagrid>
					<TextField source="full_name" />
					<ReferenceField basePath="/users" label="Email" source="id" reference="users">
						<TextField source="email" />
					</ReferenceField>
					<TextField source="company" />
					<TextField source="status" />
					<ReferenceField basePath="/roles" source="role_id" reference="roles">
						<TextField source="role" />
					</ReferenceField>
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
