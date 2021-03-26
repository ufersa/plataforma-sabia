import PropTypes from 'prop-types';
import React from 'react';
import { CheckboxGroupInput, required, SimpleForm, TextField, TextInput } from 'react-admin';
import { ReferenceArrayInput } from '../../../components';

const RolesForm = ({ record, save, resource }) => {
	const permissions = record?.permissions.map((permission) => permission.id);
	const newRecord = {
		...record,
		permissions,
	};
	return (
		<SimpleForm record={newRecord} save={save} resource={resource}>
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
};

RolesForm.propTypes = {
	record: PropTypes.shape({ id: PropTypes.number, permissions: PropTypes.array }),
	resource: PropTypes.string,
	save: PropTypes.func,
};

RolesForm.defaultProps = {
	record: { id: 0 },
	resource: '',
	save: () => {},
};

export default RolesForm;
