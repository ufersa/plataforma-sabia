import PropTypes from 'prop-types';
import React from 'react';
import {
	CheckboxGroupInput,
	ReferenceField,
	ReferenceArrayInput,
	required,
	SimpleForm,
	TextField,
	TextInput,
	SelectInput,
	NumberInput,
	DateInput,
	ReferenceInput,
	SimpleShowLayout,
} from 'react-admin';
import { StatusForm } from '../../../components';

const AnnouncementsForm = ({ record, save, resource, basePath }) => {
	record.keywords = record.terms;
	record.targetAudiences = record.terms;
	return (
		<SimpleShowLayout resource={resource} save={save} record={record} basePath={basePath}>
			{record?.user_id && (
				<ReferenceField basePath="/users" source="user_id" reference="users">
					<TextField source="email" />
				</ReferenceField>
			)}
			{record?.id && <StatusForm />}
			<SimpleForm record={record} save={save} resource={resource}>
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
					fullWidth
					perPage={100}
					sort={{ field: 'term', order: 'ASC' }}
					filter={{ taxonomy: 'target_audience' }}
					format={(values) => values?.map((term) => term.id || term)}
					validate={[required()]}
				>
					<CheckboxGroupInput optionText="term" />
				</ReferenceArrayInput>
				<ReferenceArrayInput
					source="keywords"
					reference="terms"
					fullWidth
					perPage={100}
					validate={[required()]}
					sort={{ field: 'term', order: 'ASC' }}
					filter={{ taxonomy: 'keywords' }}
					format={(values) => values?.map((term) => term.id || term)}
				>
					<CheckboxGroupInput optionText="term" />
				</ReferenceArrayInput>
				<NumberInput source="financial_resources" fullWidth validate={[required()]} />
				<DateInput source="start_date" fullWidth validate={[required()]} />
				<DateInput source="end_date" fullWidth validate={[required()]} />
				<TextInput source="comment" fullWidth resettable validate={[required()]} />
				<TextInput source="url" fullWidth />
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
