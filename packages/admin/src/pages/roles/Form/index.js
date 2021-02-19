import React from 'react';
import PropTypes from 'prop-types';
import { SimpleForm, TextInput, CheckboxGroupInput, TextField, required } from 'react-admin';
import { ReferenceArrayInput } from '../../../components';

const RolesForm = ({ record, save, resource }) => (
	<SimpleForm record={record} save={save} resource={resource}>
		{record.id ? (
			<TextField source="role" />
		) : (
			<TextInput source="role" fullWidth validate={[required()]} />
		)}
		<TextInput source="description" fullWidth validate={[required()]} />
		<ReferenceArrayInput source="permissions" reference="permissions">
			<CheckboxGroupInput optionText="description" />
		</ReferenceArrayInput>
	</SimpleForm>
);

RolesForm.propTypes = {
	record: PropTypes.shape({ id: PropTypes.number }),
	resource: PropTypes.string,
	save: PropTypes.func,
};

RolesForm.defaultProps = {
	record: { id: 0 },
	resource: '',
	save: () => {},
};

export default RolesForm;
