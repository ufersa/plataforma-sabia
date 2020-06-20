import React from 'react';
import PropTypes from 'prop-types';
import { SimpleForm, TextInput, TextField, required } from 'react-admin';

const RolesForm = ({ record, save, resource }) => (
	<SimpleForm record={record} save={save} resource={resource}>
		{record.id ? (
			<TextField source="role" />
		) : (
			<TextInput source="role" fullWidth validate={[required()]} />
		)}
		<TextInput source="description" fullWidth validate={[required()]} />
	</SimpleForm>
);

RolesForm.propTypes = {
	record: PropTypes.shape({ id: PropTypes.number }),
	resource: PropTypes.string,
	save: PropTypes.func,
};

RolesForm.defaultProps = {
	record: { id: false },
	resource: '',
	save: () => {},
};

export default RolesForm;
