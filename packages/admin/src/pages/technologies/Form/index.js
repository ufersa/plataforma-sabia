import React from 'react';
import PropTypes from 'prop-types';
import {
	SimpleForm,
	TextInput,
	NumberInput,
	BooleanInput,
	ReferenceArrayInput,
	CheckboxGroupInput,
	ImageField,
} from 'react-admin';

const TechnologiesForm = ({ record, save, resource }) => (
	<SimpleForm record={record} save={save} resource={resource}>
		<TextInput source="title" fullWidth resettable />
		<TextInput source="description" fullWidth resettable />
		<BooleanInput source="private" />
		<BooleanInput source="patent" />
		<NumberInput source="likes" />
		<TextInput source="patent_number" fullWidth resettable />
		<TextInput source="primary_purpose" fullWidth resettable />
		<TextInput source="secondary_purpose" fullWidth resettable />
		<TextInput source="application_mode" fullWidth resettable />
		<TextInput source="application_examples" fullWidth resettable />
		<TextInput source="installation_time" fullWidth resettable />
		<TextInput source="solves_problem" fullWidth resettable />
		<TextInput source="entailes_problem" fullWidth resettable />
		<TextInput source="requirements" fullWidth resettable />
		<TextInput source="risks" fullWidth resettable />
		<TextInput source="contribution" fullWidth resettable />
		<TextInput source="status" fullWidth resettable />

		{record.thumbnail && (
			<ImageField source="thumbnail" title="title" label="thumbnail atual" />
		)}
		<TextInput source="thumbnail" fullWidth />
		<TextInput source="status" fullWidth />
		<ReferenceArrayInput label="Terms" source="terms" reference="terms" fullWidth perPage={999}>
			<CheckboxGroupInput optionText="term" />
		</ReferenceArrayInput>
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
