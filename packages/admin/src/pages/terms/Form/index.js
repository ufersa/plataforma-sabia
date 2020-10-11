import React from 'react';
import PropTypes from 'prop-types';
import { SimpleForm, TextInput, ReferenceInput, SelectInput, required } from 'react-admin';

const TermsForm = ({ record, save, resource }) => (
	<SimpleForm record={record} save={save} resource={resource}>
		<TextInput source="term" fullWidth resettable validate={[required()]} />
		<ReferenceInput label="Parent" source="parent_id" reference="terms" perPage={100} fullWidth>
			<SelectInput optionText="term" />
		</ReferenceInput>
		<ReferenceInput
			label="Taxonomy"
			source="taxonomy_id"
			reference="taxonomies"
			validate={[required()]}
			fullWidth
		>
			<SelectInput optionText="description" />
		</ReferenceInput>
	</SimpleForm>
);

TermsForm.propTypes = {
	record: PropTypes.shape({}),
	resource: PropTypes.string,
	save: PropTypes.func,
};

TermsForm.defaultProps = {
	record: {},
	resource: '',
	save: () => {},
};

export default TermsForm;
