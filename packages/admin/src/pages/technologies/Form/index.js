import React from 'react';
import PropTypes from 'prop-types';
import { SimpleForm, TextInput, NumberInput, BooleanInput } from 'react-admin';

import TechnologyTermsSelect from '../../../components/TechnologyTermsSelect';
import StatusForm from './statusForm';

const TechnologiesForm = ({ record, resource, save }) => {
	return (
		<div>
			<StatusForm record={record} resource={resource} />
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
		</div>
	);
};

TechnologiesForm.propTypes = {
	record: PropTypes.shape({ id: PropTypes.number }),
	resource: PropTypes.string,
	save: PropTypes.func,
};

TechnologiesForm.defaultProps = {
	record: { id: null },
	resource: '',
	save: () => {},
};

export default TechnologiesForm;
