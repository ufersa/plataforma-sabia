import PropTypes from 'prop-types';
import React from 'react';
import {
	CheckboxGroupInput,
	DateInput,
	NumberInput,
	ReferenceField,
	ReferenceInput,
	required,
	SelectInput,
	SimpleForm,
	SimpleShowLayout,
	TextField,
	TextInput,
} from 'react-admin';
import { ReferenceArrayInput, StatusForm } from '../../../components';

const AnnouncementsForm = ({ record, save, resource, basePath }) => {
	const keywords = record?.keywords.map((keyword) => keyword.id);
	const targetAudiences = record?.targetAudiences.map((targetAudience) => targetAudience.id);
	const newRecord = {
		...record,
		keywords,
		targetAudiences,
	};
	return (
		<SimpleShowLayout resource={resource} save={save} record={newRecord} basePath={basePath}>
			{record?.user_id && (
				<ReferenceField basePath="/users" source="user_id" reference="users">
					<TextField source="email" />
				</ReferenceField>
			)}
			{record?.id && <StatusForm />}
			<SimpleForm record={newRecord} save={save} resource={resource}>
				<ReferenceInput
					source="institution_id"
					reference="institutions"
					validate={[required()]}
					fullWidth
					perPage={100}
				>
					<SelectInput optionText="name" />
				</ReferenceInput>
				<TextInput
					source="announcement_number"
					fullWidth
					resettable
					validate={[required()]}
				/>
				<TextInput source="title" fullWidth resettable validate={[required()]} />
				<TextInput
					source="description"
					multiline
					fullWidth
					resettable
					validate={[required()]}
				/>
				<ReferenceArrayInput
					source="targetAudiences"
					reference="terms"
					sort={{ field: 'term', order: 'ASC' }}
					filter={{ taxonomy: 'target_audience' }}
					validate={[required()]}
				>
					<CheckboxGroupInput optionText="term" />
				</ReferenceArrayInput>
				<ReferenceArrayInput
					source="keywords"
					reference="terms"
					validate={[required()]}
					sort={{ field: 'term', order: 'ASC' }}
					filter={{ taxonomy: 'keywords' }}
				>
					<CheckboxGroupInput optionText="term" />
				</ReferenceArrayInput>
				<NumberInput source="financial_resources" fullWidth validate={[required()]} />
				<DateInput source="start_date" fullWidth validate={[required()]} />
				<DateInput source="end_date" fullWidth validate={[required()]} />
				<TextInput source="comment" fullWidth resettable validate={[required()]} />
				<TextInput source="url" fullWidth validate={[required()]} />
			</SimpleForm>
		</SimpleShowLayout>
	);
};
AnnouncementsForm.propTypes = {
	record: PropTypes.shape({
		keywords: PropTypes.array,
		targetAudiences: PropTypes.array,
		terms: PropTypes.array,
		user_id: PropTypes.number,
		id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	}),
	resource: PropTypes.string,
	save: PropTypes.func,
	basePath: PropTypes.string,
};

AnnouncementsForm.defaultProps = {
	record: { keywords: null, targetAudiences: null, terms: null, user_id: 0 },
	resource: '',
	basePath: '',
	save: () => {},
};

export default AnnouncementsForm;
