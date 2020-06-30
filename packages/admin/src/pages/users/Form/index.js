import React from 'react';
import PropTypes from 'prop-types';
import {
	SimpleForm,
	TextInput,
	ReferenceInput,
	SelectInput,
	ReferenceArrayInput,
	SelectArrayInput,
	required,
} from 'react-admin';

const UsersForm = ({ record, save, resource }) => {
	return (
		<SimpleForm record={record} save={save} resource={resource}>
			<TextInput
				label="Email"
				source="email"
				type="email"
				fullWidth
				validate={[required()]}
			/>
			<SelectInput
				label="Status"
				source="status"
				fullWidth
				choices={[
					{ id: 'pending', name: 'Pending' },
					{ id: 'verified', name: 'Verified' },
				]}
			/>
			<TextInput source="first_name" fullWidth validate={[required()]} />
			<TextInput source="last_name" fullWidth validate={[required()]} />
			<TextInput source="company" fullWidth resettable />
			<ReferenceInput
				label="Role"
				source="role_id"
				reference="roles"
				validate={[required()]}
				fullWidth
			>
				<SelectInput optionText="role" />
			</ReferenceInput>

			<ReferenceArrayInput
				label="Permissions"
				source="permissions"
				reference="permissions"
				fullWidth
			>
				<SelectArrayInput optionText="description" />
			</ReferenceArrayInput>
		</SimpleForm>
	);
};

UsersForm.propTypes = {
	record: PropTypes.shape({}),
	resource: PropTypes.string,
	save: PropTypes.func,
};

UsersForm.defaultProps = {
	record: {},
	resource: '',
	save: () => {},
};

export default UsersForm;
