import React from 'react';
import PropTypes from 'prop-types';
import {
	SimpleForm,
	TextInput,
	NumberInput,
	BooleanInput,
	SelectInput,
	required,
} from 'react-admin';

import { TechnologyTermsSelect, KnowledgeAreaInput } from '../../../components';

const AboutForm = ({ record, resource, save }) => {
	return (
		<SimpleForm record={record} save={save} resource={resource}>
			<SelectInput
				source="type"
				fullWidth
				validate={[required()]}
				choices={[
					{ id: 'equipment', name: 'Equipment' },
					{ id: 'material', name: 'Material' },
					{ id: 'methodology', name: 'Methodology' },
					{ id: 'model', name: 'Model' },
					{ id: 'process', name: 'Process' },
					{ id: 'service', name: 'Service' },
					{ id: 'software', name: 'Software' },
					{ id: 'other', name: 'Other' },
				]}
			/>
			<TextInput source="title" fullWidth resettable />
			<TextInput source="description" fullWidth resettable />
			<BooleanInput source="private" />
			<BooleanInput source="public_domain" />
			<KnowledgeAreaInput />
			<NumberInput source="thumbnail_id" fullWidth />
			<NumberInput source="likes" fullWidth />
			<BooleanInput source="patent" defaultValue />
			<TextInput source="patent_number" fullWidth resettable />
			<TextInput source="primary_purpose" fullWidth resettable multiline />
			<TextInput source="secondary_purpose" fullWidth resettable multiline />
			<TextInput source="application_mode" fullWidth resettable multiline />
			<TextInput source="application_examples" fullWidth resettable multiline />
			<NumberInput source="installation_time" fullWidth />
			<TextInput source="solves_problem" fullWidth resettable multiline />
			<TextInput source="entailes_problem" fullWidth resettable multiline />
			<TextInput source="requirements" fullWidth resettable multiline />
			<TextInput source="risks" fullWidth resettable multiline />
			<TextInput source="contribution" fullWidth resettable multiline />
			<TechnologyTermsSelect record={record} />
		</SimpleForm>
	);
};

AboutForm.propTypes = {
	record: PropTypes.shape({ id: PropTypes.number }),
	resource: PropTypes.string,
	save: PropTypes.func,
};

AboutForm.defaultProps = {
	record: { id: 0 },
	resource: '',
	save: () => {},
};

export default AboutForm;
