import React from 'react';
import PropTypes from 'prop-types';
import { SimpleForm, TextInput } from 'react-admin';

const TaxonomyForm = ({ record, save, resource }) => (
	<SimpleForm record={record} save={save} resource={resource}>
		<TextInput source="taxonomy" fullWidth resettable />
		<TextInput source="description" fullWidth />
	</SimpleForm>
);

TaxonomyForm.propTypes = {
	record: PropTypes.shape({}),
	resource: PropTypes.string,
	save: PropTypes.func,
};

TaxonomyForm.defaultProps = {
	record: {},
	resource: '',
	save: () => {},
};

export default TaxonomyForm;
