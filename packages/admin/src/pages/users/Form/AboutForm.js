import React from 'react';
import PropTypes from 'prop-types';
import {
	SimpleForm,
	TextInput,
	ReferenceInput,
	SelectInput,
	ReferenceArrayInput,
	CheckboxGroupInput,
	required,
	TextField,
	DateTimeInput,
} from 'react-admin';

const AboutForm = ({ record, save, resource }) => {
	if (record.role_id) record.role = record.role_id;
	return (
		<SimpleForm record={record} save={save} resource={resource}>
			<TextField source="email" fullWidth />
			<TextField source="status" fullWidth />
			<TextInput source="first_name" fullWidth resettable validate={[required()]} />
			<TextInput source="last_name" fullWidth resettable validate={[required()]} />
			<TextInput source="company" fullWidth resettable />
			<TextInput source="cpf" fullWidth resettable />
			<TextInput source="zipcode" fullWidth resettable />
			<DateTimeInput source="birth_date" fullWidth />
			<TextInput source="phone_number" fullWidth resettable />
			<TextInput source="lattes_id" fullWidth resettable />
			<TextInput source="address" fullWidth resettable />
			<TextInput source="address2" fullWidth resettable />
			<TextInput source="district" fullWidth resettable />
			<TextInput source="city" fullWidth resettable />
			<TextInput source="state" fullWidth resettable />
			<TextInput source="country" fullWidth resettable />
			<ReferenceInput
				label="Role"
				source="role"
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
				format={(permissions) => {
					try {
						return permissions.map((permission) => permission.id || permission);
					} catch (error) {
						return permissions;
					}
				}}
			>
				<CheckboxGroupInput optionText="description" />
			</ReferenceArrayInput>
		</SimpleForm>
	);
};

AboutForm.propTypes = {
	record: PropTypes.shape({
		role: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.number]),
		role_id: PropTypes.number,
	}),
	resource: PropTypes.string,
	save: PropTypes.func,
};

AboutForm.defaultProps = {
	record: { role: 0, role_id: 0 },
	resource: '',
	save: () => {},
};

export default AboutForm;
