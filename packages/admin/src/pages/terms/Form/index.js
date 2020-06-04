import React from 'react';
import PropTypes from 'prop-types';
import { SimpleForm, TextInput, ReferenceInput, SelectInput, required } from 'react-admin';

const TermsForm = ({ record, save, resource }) => (
	<SimpleForm record={record} save={save} resource={resource}>
		<TextInput source="term" fullWidth resettable />
		<TextInput source="slug" fullWidth />
		<ReferenceInput
			label="Parent"
			source="parent"
			reference="terms"
			validate={[required()]}
			fullWidth
		>
			<SelectInput optionText="term" />
		</ReferenceInput>
		<ReferenceInput
			label="Taxonomy"
			source="taxonomy"
			reference="taxonomies"
			validate={[required()]}
			fullWidth
		>
			<SelectInput optionText="description" />
		</ReferenceInput>
	</SimpleForm>
);

TermsForm.propTypes = {
	record: PropTypes.shape({ logo: PropTypes.string }),
	resource: PropTypes.string,
	save: PropTypes.func,
};

TermsForm.defaultProps = {
	record: { logo: '' },
	resource: '',
	save: () => {},
};

export default TermsForm;
