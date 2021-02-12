import React from 'react';
import PropTypes from 'prop-types';
import {
	SimpleShowLayout,
	TextField,
	ReferenceField,
	ArrayField,
	Datagrid,
	DateField,
	useQuery,
	Loading,
} from 'react-admin';
import ReviewersForm from './ReviewersForm';

const Revisions = ({ record, resource }) => {
	const comments = useQuery({
		type: 'getList',
		resource: `technologies/${record.id}/revision-history`,
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
	if (comments.loading) return <Loading />;
	record.comments = comments?.data?.filter(({ comment }) => comment);
	return (
		<SimpleShowLayout record={record} resource={resource}>
			<ReviewersForm />
			<ArrayField source="revisions">
				<Datagrid>
					<TextField source="assessment" />
					<TextField source="description" />

					<ReferenceField
						basePath="/reviewers"
						source="reviewer_id"
						reference="reviewers"
					>
						<ReferenceField
							basePath="/users"
							source="user_id"
							reference="users"
							link={false}
						>
							<TextField source="full_name" />
						</ReferenceField>
					</ReferenceField>
					<DateField showTime source="created_at" />
					<DateField showTime source="updated_at" />
				</Datagrid>
			</ArrayField>
			<ArrayField source="comments">
				<Datagrid>
					<ReferenceField basePath="/users" source="user_id" reference="users">
						<TextField source="full_name" />
					</ReferenceField>
					<TextField source="comment" />
					<DateField showTime source="created_at" />
					<DateField showTime source="updated_at" />
				</Datagrid>
			</ArrayField>
		</SimpleShowLayout>
	);
};

Revisions.propTypes = {
	record: PropTypes.shape({
		id: PropTypes.number,
		comments: PropTypes.arrayOf(
			PropTypes.shape({
				comment: PropTypes.string,
			}),
		),
	}),
	resource: PropTypes.string,
};

Revisions.defaultProps = {
	record: { id: null, comments: [] },
	resource: '',
};

export default Revisions;
