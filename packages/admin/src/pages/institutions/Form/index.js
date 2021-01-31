import React from 'react';
import PropTypes from 'prop-types';
import {
	SimpleForm,
	TextInput,
	required,
	SelectInput,
	ReferenceInput,
	SimpleShowLayout,
} from 'react-admin';
import { UploadInput } from '../../../components';

const InstitutionsForm = ({ record, save, resource }) => (
	<SimpleShowLayout record={record} resource={resource}>
		<UploadInput source="logo_id" />
		<SimpleForm save={save}>
			<TextInput source="name" fullWidth validate={[required()]} />
			<TextInput source="initials" fullWidth validate={[required()]} />
			<TextInput source="email" fullWidth validate={[required()]} />
			<TextInput source="phone_number" fullWidth validate={[required()]} />
			<TextInput source="website" fullWidth validate={[required()]} />
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
				<SelectInput optionText="full_name" resettable emptyValue={null} />
			</ReferenceInput>
		</SimpleForm>
	</SimpleShowLayout>
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
