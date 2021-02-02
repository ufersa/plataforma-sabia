import React from 'react';
import PropTypes from 'prop-types';
import {
	SimpleForm,
	TextInput,
	ReferenceInput,
	SelectInput,
	CheckboxGroupInput,
	required,
	TextField,
	DateTimeInput,
} from 'react-admin';
import { ReferenceArrayInput } from '../../../components';

const AboutForm = ({ record, save, resource }) => {
	record.role = record?.role_id;
	return (
		<SimpleForm record={record} save={save} resource={resource}>
			<TextField source="email" />
			<TextField source="status" />
			<TextInput source="first_name" fullWidth resettable validate={[required()]} />
			<TextInput source="last_name" fullWidth resettable validate={[required()]} />
			<TextInput source="company" fullWidth resettable />
			<ReferenceInput
				source="institution_id"
				reference="institutions"
				validate={[required()]}
				fullWidth
			>
				<SelectInput optionText="name" />
			</ReferenceInput>
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

			<ReferenceArrayInput label="Permissions" source="permissions" reference="permissions">
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
	record: { role: null, role_id: null },
	resource: '',
	save: () => {},
};

export default AboutForm;
