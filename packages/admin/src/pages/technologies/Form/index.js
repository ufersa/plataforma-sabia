import React from 'react';
import PropTypes from 'prop-types';
import {
	SimpleForm,
	TextInput,
	NumberInput,
	BooleanInput,
	ImageField,
	SelectInput,
} from 'react-admin';

import MultSelect from '../../../components/MultSelect';

const TechnologiesForm = ({ record, save, resource }) => (
	<SimpleForm record={record} save={save} resource={resource}>
		<TextInput source="title" fullWidth resettable />
		<TextInput source="description" fullWidth resettable />
		<BooleanInput source="private" />
		<BooleanInput source="patent" defaultValue />
		<NumberInput source="likes" />
		<TextInput source="patent_number" fullWidth resettable />
		<TextInput source="primary_purpose" fullWidth resettable multiline />
		<TextInput source="secondary_purpose" fullWidth resettable multiline />
		<TextInput source="application_mode" fullWidth resettable multiline />
		<TextInput source="application_examples" fullWidth resettable multiline />
		<TextInput source="installation_time" fullWidth resettable multiline />
		<TextInput source="solves_problem" fullWidth resettable multiline />
		<TextInput source="entailes_problem" fullWidth resettable multiline />
		<TextInput source="requirements" fullWidth resettable multiline />
		<TextInput source="risks" fullWidth resettable multiline />
		<TextInput source="contribution" fullWidth resettable multiline />
		<SelectInput
			label="Status"
			source="status"
			fullWidth
			choices={[
				{ id: 'DRAFT', name: 'Draft' },
				{ id: 'PENDING', name: 'Pending' },
				{ id: 'PUBLISH', name: 'Publish' },
			]}
		/>

		{record.thumbnail && (
			<ImageField source="thumbnail" title="title" label="thumbnail atual" />
		)}
		<TextInput source="thumbnail" fullWidth />
		<MultSelect record={record} />
	</SimpleForm>
);

TechnologiesForm.propTypes = {
	record: PropTypes.shape({ thumbnail: PropTypes.string }),
	resource: PropTypes.string,
	save: PropTypes.func,
};

TechnologiesForm.defaultProps = {
	record: { thumbnail: '' },
	resource: '',
	save: () => {},
};

export default TechnologiesForm;
