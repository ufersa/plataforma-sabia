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
import { ChipField, ReviewersComments } from '../../../components';

const Reviews = ({ record, resource }) => {
	return (
		<SimpleShowLayout record={record} resource={resource}>
			<ArrayField source="reviews" addLabel={false}>
				<Datagrid>
					<TextField source="id" />
					<ReferenceField
						basePath="/technologies"
						source="technology_id"
						reference="technologies"
					>
						<ChipField source="title" />
					</ReferenceField>
					<TextField source="rating" />
					<ReviewersComments source="positive" />
					<ReviewersComments source="negative" />
					<DateField showTime source="created_at" />
					<DateField showTime source="updated_at" />
				</Datagrid>
			</ArrayField>
		</SimpleShowLayout>
	);
};

Reviews.propTypes = {
	record: PropTypes.shape({}),
	resource: PropTypes.string,
};

Reviews.defaultProps = {
	record: {},
	resource: '',
};

export default Reviews;
