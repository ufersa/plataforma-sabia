import React from 'react';
import PropTypes from 'prop-types';
import { SimpleForm, TextInput, NumberInput, BooleanInput } from 'react-admin';

import { TechnologyTermsSelect } from '../../../components';

const AboutForm = ({ record, resource, save }) => {
	return (
		<SimpleForm record={record} save={save} resource={resource}>
			<TextInput source="title" fullWidth resettable />
			<TextInput source="description" fullWidth resettable />
			<BooleanInput source="private" />
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
