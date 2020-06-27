import React from 'react';
import PropTypes from 'prop-types';
import { SimpleForm, TextInput, TextField, required } from 'react-admin';

const PermissionsForm = ({ record, save, resource }) => (
	<SimpleForm record={record} save={save} resource={resource}>
		{record.id ? (
			<TextField source="permission" />
		) : (
			<TextInput source="permission" fullWidth validate={[required()]} />
		)}
		<TextInput source="description" fullWidth validate={[required()]} />
	</SimpleForm>
);

PermissionsForm.propTypes = {
	record: PropTypes.shape({ id: PropTypes.number }),
	resource: PropTypes.string,
	save: PropTypes.func,
};

PermissionsForm.defaultProps = {
	record: { id: 0 },
	resource: '',
	save: () => {},
};

export default PermissionsForm;
