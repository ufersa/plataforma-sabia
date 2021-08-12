import PropTypes from 'prop-types';
import React from 'react';
import {
	AutocompleteInput,
	AutocompleteArrayInput,
	CheckboxGroupInput,
	DateTimeInput,
	ReferenceInput,
	required,
	SelectInput,
	SimpleForm,
	TextField,
	TextInput,
	useQuery,
	FormDataConsumer,
} from 'react-admin';
import { ReferenceArrayInput, statuses, CityInput } from '../../../components';

const AboutForm = ({ record, save, resource }) => {
	record.role = record?.role_id;
	const permissions = record?.permissions.map((permission) => permission.id);
	const areas = record?.areas.map((area) => area.knowledge_area_id);
	const newRecord = {
		...record,
		permissions,
		areas,
	};

	const statesResult = useQuery({
		type: 'getList',
		resource: `states`,
		payload: {
			pagination: {
				page: 1,
				perPage: 100,
			},
			sort: {
				field: 'id',
				order: 'asc',
			},
		},
	});

	const states = statesResult?.data?.map((stateItem) => ({
		id: stateItem.id,
		name: stateItem.name,
	}));

	const areasResult = useQuery({
		type: 'getList',
		resource: `areas`,
		payload: {
			pagination: {
				page: 1,
				perPage: 100,
			},
			sort: {
				field: 'knowledge_area_id',
				order: 'asc',
			},
		},
	});

	const areasMap = areasResult?.data?.map((area) => ({
		id: area.knowledge_area_id,
		name: area.name,
	}));

	return (
		<SimpleForm record={newRecord} save={save} resource={resource}>
			<SelectInput
				label="Status"
				source="status"
				fullWidth
				validate={[required()]}
				choices={statuses[resource]}
			/>
			<TextField source="email" />
			<TextInput source="full_name" fullWidth resettable validate={[required()]} />
			<ReferenceInput
				source="institution_id"
				reference="institutions"
				perPage={100}
				sort={{ field: 'name', order: 'ASC' }}
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
			<AutocompleteInput
				name="state_id"
				source="state"
				choices={states}
				fullWidth
				resettable
			/>
			<FormDataConsumer>
				{({ formData }) => !!formData.state_id && <CityInput state={formData.state_id} />}
			</FormDataConsumer>
			{!!areasMap && (
				<AutocompleteArrayInput
					name="areas"
					source="areas"
					choices={areasMap}
					suggestionLimit={10}
					fullWidth
					resettable
				/>
			)}
			<TextInput source="country" fullWidth resettable />
			<ReferenceInput source="role" reference="roles" validate={[required()]} fullWidth>
				<SelectInput optionText="role" />
			</ReferenceInput>

			<ReferenceArrayInput source="permissions" reference="permissions">
				<CheckboxGroupInput optionText="description" />
			</ReferenceArrayInput>
		</SimpleForm>
	);
};

AboutForm.propTypes = {
	record: PropTypes.shape({
		role: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.number]),
		role_id: PropTypes.number,
		state_id: PropTypes.number,
		city_id: PropTypes.number,
		permissions: PropTypes.arrayOf(PropTypes.number),
		areas: PropTypes.arrayOf(PropTypes.object),
	}),
	resource: PropTypes.string,
	save: PropTypes.func,
};

AboutForm.defaultProps = {
	record: { role: null, role_id: null, permissions: [] },
	resource: '',
	save: () => {},
};

export default AboutForm;
