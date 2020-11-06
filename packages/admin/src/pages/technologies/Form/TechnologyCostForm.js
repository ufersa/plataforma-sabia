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

const TechnologyCostForm = ({ record, resource }) => {
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
	if (error) return <Error />;
	if (loading) return <Loading />;
	const newData = data ? { ...data, funding_required: !!data.funding_required } : {};
	return (
		<SimpleShowLayout record={newData} resource={resource}>
			<BooleanField source="funding_required" fullWidth />
			<TextField source="notes" fullWidth />
			<NumberField source="funding_value" fullWidth />
			<TextField source="funding_status" fullWidth />
			<TextField source="funding_type" fullWidth />
			<ArrayField source="costs" style={{ width: '100%' }}>
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
TechnologyCostForm.propTypes = {
	record: PropTypes.shape({ id: PropTypes.number }),
	resource: PropTypes.string,
};

TechnologyCostForm.defaultProps = {
	record: { id: null },
	resource: '',
};

export default TechnologyCostForm;
