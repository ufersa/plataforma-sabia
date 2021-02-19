import React from 'react';
import PropTypes from 'prop-types';
import {
	SimpleShowLayout,
	TextInput,
	BooleanInput,
	NumberInput,
	SimpleForm,
	SelectInput,
	ArrayInput,
	SimpleFormIterator,
} from 'react-admin';
import RichTextInput from 'ra-input-rich-text';
import statuses from '../../../components/StatusForm/statuses';

const CostForm = ({ record, resource, save }) => {
	const newRecord = { ...record?.costs[0], feature: 'costs' };
	return (
		<SimpleShowLayout record={newRecord} resource={resource} save={save}>
			<SimpleForm record={newRecord} resource={resource} save={save}>
				<BooleanInput source="funding_required" fullWidth />
				<RichTextInput source="notes" fullWidth />
				<NumberInput source="funding_value" fullWidth />
				<SelectInput source="funding_status" fullWidth choices={statuses.fundingStatuses} />
				<SelectInput source="funding_type" fullWidth choices={statuses.fundingTypes} />
				<BooleanInput source="is_seller" fullWidth />
				<TextInput source="price" fullWidth />
				<ArrayInput source="costs">
					<SimpleFormIterator>
						<TextInput source="description" fullWidth />
						<SelectInput source="cost_type" fullWidth choices={statuses.costTypes} />
						<SelectInput source="type" fullWidth choices={statuses.costSubTypes} />
						<TextInput source="quantity" fullWidth />
						<TextInput source="value" fullWidth />
						<SelectInput
							source="measure_unit"
							fullWidth
							choices={statuses.measureUnit}
						/>
					</SimpleFormIterator>
				</ArrayInput>
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
	save: PropTypes.func,
	resource: PropTypes.string,
};

CostForm.defaultProps = {
	record: { id: null, feature: 'costs' },
	resource: '',
	save: () => {},
};

export default CostForm;
