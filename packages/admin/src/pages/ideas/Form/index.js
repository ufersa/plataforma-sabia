import PropTypes from 'prop-types';
import React from 'react';
import {
	CheckboxGroupInput,
	ReferenceField,
	required,
	SimpleForm,
	TextField,
	TextInput,
} from 'react-admin';
import { ReferenceArrayInput } from '../../../components';

const IdeasForm = ({ record, save, resource }) => {
	const keywords = record?.keywords.map((keyword) => keyword.id);
	const newRecord = {
		...record,
		keywords,
	};
	return (
		<SimpleForm record={newRecord} save={save} resource={resource}>
			{record?.user_id && (
				<ReferenceField
					basePath="/users"
					label="labels.owner"
					source="user_id"
					reference="users"
				>
					<TextField source="email" />
				</ReferenceField>
			)}
			<TextInput source="title" fullWidth resettable validate={[required()]} />
			<TextInput source="description" fullWidth resettable validate={[required()]} />
			<ReferenceArrayInput
				source="keywords"
				reference="terms"
				validate={[required()]}
				sort={{ field: 'term', order: 'ASC' }}
				filter={{ taxonomy: 'keywords' }}
			>
				<CheckboxGroupInput optionText="term" />
			</ReferenceArrayInput>
		</SimpleForm>
	);
};
IdeasForm.propTypes = {
	record: PropTypes.shape({
		keywords: PropTypes.array,
		user_id: PropTypes.number,
	}),
	resource: PropTypes.string,
	save: PropTypes.func,
};

IdeasForm.defaultProps = {
	record: { keywords: null, user_id: 0 },
	resource: '',
	save: () => {},
};

export default IdeasForm;
