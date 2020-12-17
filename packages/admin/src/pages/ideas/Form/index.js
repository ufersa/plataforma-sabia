import React from 'react';
import PropTypes from 'prop-types';
import {
	SimpleForm,
	TextInput,
	ReferenceField,
	TextField,
	ReferenceArrayInput,
	required,
	CheckboxGroupInput,
} from 'react-admin';

const IdeassForm = ({ record, save, resource }) => {
	if (record?.terms) record.keywords = record.terms;
	return (
		<SimpleForm record={record} save={save} resource={resource}>
			{record?.user_id && (
				<ReferenceField basePath="/users" label="Owner" source="user_id" reference="users">
					<TextField source="email" />
				</ReferenceField>
			)}
			<TextInput source="title" fullWidth resettable validate={[required()]} />
			<TextInput source="description" fullWidth resettable validate={[required()]} />
			<ReferenceArrayInput
				label="Keywords"
				source="keywords"
				reference="terms"
				fullWidth
				perPage={100}
				validate={[required()]}
				sort={{ field: 'term', order: 'ASC' }}
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
};
IdeassForm.propTypes = {
	record: PropTypes.shape({
		keywords: PropTypes.array,
		terms: PropTypes.array,
		user_id: PropTypes.number,
	}),
	resource: PropTypes.string,
	save: PropTypes.func,
};

IdeassForm.defaultProps = {
	record: { keywords: null, terms: null, user_id: 0 },
	resource: '',
	save: () => {},
};

export default IdeassForm;
