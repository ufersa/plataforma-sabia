import React from 'react';
import PropTypes from 'prop-types';
import {
	SimpleForm,
	TextInput,
	required,
	SelectInput,
	NumberInput,
	ReferenceInput,
} from 'react-admin';

const InstitutionsForm = ({ record, save, resource }) => (
	<SimpleForm record={record} save={save} resource={resource}>
		<TextInput source="name" fullWidth validate={[required()]} />
		<TextInput source="initials" fullWidth validate={[required()]} />
		<TextInput source="email" fullWidth validate={[required()]} />
		<TextInput source="phone_number" fullWidth validate={[required()]} />
		<TextInput source="website" fullWidth validate={[required()]} />
		<NumberInput source="logo_id" fullWidth />
		<SelectInput
			source="type"
			fullWidth
			validate={[required()]}
			choices={[
				{ id: 'public', name: 'Public' },
				{ id: 'private', name: 'Private' },
				{ id: 'mixed', name: 'Mixed' },
				{ id: 'other', name: 'Other' },
			]}
		/>
		<SelectInput
			source="category"
			fullWidth
			validate={[required()]}
			choices={[
				{ id: 'university', name: 'University' },
				{ id: 'institute', name: 'Institute' },
				{ id: 'association', name: 'Association' },
				{ id: 'foundation', name: 'Foundation' },
				{ id: 'cooperative', name: 'Cooperative' },
				{ id: 'company', name: 'Company' },
				{ id: 'other', name: 'Other' },
			]}
		/>
		<TextInput source="state" fullWidth validate={[required()]} />
		<TextInput source="city" fullWidth validate={[required()]} />
		<TextInput source="address" fullWidth validate={[required()]} />
		<TextInput source="district" fullWidth validate={[required()]} />
		<TextInput source="zipcode" fullWidth validate={[required()]} />
		<TextInput source="cnpj" fullWidth validate={[required()]} />
		<TextInput source="lat" fullWidth validate={[required()]} />
		<TextInput source="lng" fullWidth validate={[required()]} />
		<ReferenceInput source="responsible" reference="users" perPage={100} fullWidth>
			<SelectInput optionText="email" resettable emptyValue={null} />
		</ReferenceInput>
	</SimpleForm>
);

InstitutionsForm.propTypes = {
	record: PropTypes.shape({}),
	resource: PropTypes.string,
	save: PropTypes.func,
};

InstitutionsForm.defaultProps = {
	record: {},
	resource: '',
	save: () => {},
};

export default InstitutionsForm;
