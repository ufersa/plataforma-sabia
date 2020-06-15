import React from 'react';
import PropTypes from 'prop-types';
import { SimpleForm, TextInput, required } from 'react-admin';

const RolesForm = ({ record, save, resource }) => (
	<SimpleForm record={record} save={save} resource={resource}>
		<TextInput source="role" fullWidth validate={[required()]} />
		<TextInput source="description" fullWidth validate={[required()]} />
	</SimpleForm>
);

RolesForm.propTypes = {
	record: PropTypes.shape({}),
	resource: PropTypes.string,
	save: PropTypes.func,
};

RolesForm.defaultProps = {
	record: {},
	resource: '',
	save: () => {},
};

export default RolesForm;
