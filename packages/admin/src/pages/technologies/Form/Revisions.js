import React from 'react';
import PropTypes from 'prop-types';
import {
	SimpleShowLayout,
	TextField,
	ReferenceField,
	ArrayField,
	Datagrid,
	DateField,
} from 'react-admin';
import ReviewersForm from './ReviewersForm';

const Revisions = ({ record, resource }) => {
	return (
		<SimpleShowLayout record={record} resource={resource}>
			<ReviewersForm />
			<ArrayField source="revisions">
				<Datagrid>
					<TextField source="id" />
					<TextField source="assessment" />
					<TextField source="description" />

					<ReferenceField
						basePath="/reviewers"
						label="Reviewer"
						source="reviewer_id"
						reference="reviewers"
					>
						<ReferenceField
							basePath="/users"
							source="user_id"
							reference="users"
							link={false}
						>
							<TextField source="email" />
						</ReferenceField>
					</ReferenceField>

					<ReferenceField
						basePath="/technologies"
						label="Technology"
						source="technology_id"
						reference="technologies"
					>
						<TextField source="title" />
					</ReferenceField>
					<DateField label="Created" showTime source="created_at" />
					<DateField label="Updated" showTime source="updated_at" />
				</Datagrid>
			</ArrayField>
		</SimpleShowLayout>
	);
};

Revisions.propTypes = {
	record: PropTypes.shape({ id: PropTypes.number }),
	resource: PropTypes.string,
};

Revisions.defaultProps = {
	record: { id: null },
	resource: '',
};

export default Revisions;
