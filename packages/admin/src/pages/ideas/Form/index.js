import React from 'react';
import PropTypes from 'prop-types';
import {
	SimpleForm,
	TextInput,
	ReferenceInput,
	SelectInput,
	ReferenceArrayInput,
	required,
	CheckboxGroupInput,
} from 'react-admin';

const IdeassForm = ({ record, save, resource }) => (
	<SimpleForm record={record} save={save} resource={resource}>
		<TextInput source="title" fullWidth resettable validate={[required()]} />
		<TextInput source="description" fullWidth resettable validate={[required()]} />
		<ReferenceInput
			label="User"
			source="user_id"
			reference="users"
			validate={[required()]}
			perPage={100}
			fullWidth
		>
			<SelectInput optionText="email" />
		</ReferenceInput>
		<ReferenceArrayInput
			label="Keywords"
			source="keywords"
			reference="terms"
			validate={[required()]}
			perPage={100}
			sort={{ field: 'term', order: 'ASC' }}
			fullWidth
			filter={{ taxonomy: 'keywords' }}
			format={(values) => {
				try {
					return values.map((term) => term.id || term);
				} catch (error) {
					return values;
				}
			}}
		>
			<CheckboxGroupInput optionText="term" />
		</ReferenceArrayInput>
	</SimpleForm>
);

IdeassForm.propTypes = {
	record: PropTypes.shape({ taxonomy_id: PropTypes.number }),
	resource: PropTypes.string,
	save: PropTypes.func,
};

IdeassForm.defaultProps = {
	record: { taxonomy_id: null },
	resource: '',
	save: () => {},
};

export default IdeassForm;
