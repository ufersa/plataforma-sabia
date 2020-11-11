import React from 'react';
import PropTypes from 'prop-types';
import {
	useQuery,
	Loading,
	Error,
	SimpleShowLayout,
	TextField,
	BooleanField,
	NumberField,
	ArrayField,
	Datagrid,
} from 'react-admin';

const CostForm = ({ record, resource }) => {
	const { loading, error, data } = useQuery({
		type: 'getOne',
		resource: `technologies/${record.id}/costs`,
		payload: {
			id: '',
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
	if (data && error) return <Error />;
	if (loading) return <Loading />;
	const newData = data
		? {
				...data,
				funding_required: !!data.funding_required,
				is_seller: !!data.is_seller,
		  }
		: { funding_required: false, is_seller: false };
	return (
		<SimpleShowLayout record={newData} resource={resource}>
			<BooleanField source="funding_required" fullWidth />
			<TextField source="notes" fullWidth />
			<NumberField source="funding_value" />
			<TextField source="funding_status" />
			<TextField source="funding_type" />
			<BooleanField source="is_seller" />
			<TextField source="price" />
			<ArrayField source="costs">
				<Datagrid>
					<TextField source="cost_type" />
					<TextField source="description" />
					<TextField source="type" />
					<TextField source="quantity" />
					<TextField source="value" />
				</Datagrid>
			</ArrayField>
		</SimpleShowLayout>
	);
};
CostForm.propTypes = {
	record: PropTypes.shape({ id: PropTypes.number }),
	resource: PropTypes.string,
};

CostForm.defaultProps = {
	record: { id: null },
	resource: '',
};

export default CostForm;
