import React from 'react';
import PropTypes from 'prop-types';
import { SimpleShowLayout, TextInput, BooleanInput, NumberInput, SimpleForm } from 'react-admin';

const CostForm = ({ record, resource }) => {
	const costs = record?.costs[0];
	return (
		<SimpleShowLayout record={costs} resource={resource}>
			<SimpleForm record={costs} resource={resource}>
				<BooleanInput source="funding_required" fullWidth />
				<TextInput source="notes" fullWidth />
				<NumberInput source="funding_value" />
				<TextInput source="funding_status" />
				<TextInput source="funding_type" />
				<BooleanInput source="is_seller" />
				<TextInput source="price" />
				{/* <ArrayInput source="costs">
					<Datagrid>
						<TextInput source="cost_type" />
						<TextInput source="description" />
						<TextInput source="type" />
						<TextInput source="measure_unit" />
						<TextInput source="quantity" />
						<TextInput source="value" />
					</Datagrid>
				</ArrayInput> */}
			</SimpleForm>
		</SimpleShowLayout>
	);
};
CostForm.propTypes = {
	record: PropTypes.shape({
		feature: PropTypes.string,
		costs: PropTypes.arrayOf(
			PropTypes.shape({
				id: PropTypes.number,
			}),
		),
	}),
	resource: PropTypes.string,
};

CostForm.defaultProps = {
	record: { id: null, feature: 'costs' },
	resource: '',
};

export default CostForm;
