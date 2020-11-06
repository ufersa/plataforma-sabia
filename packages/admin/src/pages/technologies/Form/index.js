import React from 'react';
import PropTypes from 'prop-types';
import {
	SimpleForm,
	TextInput,
	NumberInput,
	BooleanInput,
	TextField,
	Datagrid,
	ShowButton,
	TabbedShowLayout,
	ArrayField,
	Tab,
} from 'react-admin';

import { TechnologyTermsSelect } from '../../../components';
import StatusForm from './statusForm';
import TechnologyCostForm from './TechnologyCostForm';

const TechnologiesForm = ({ record, resource, save }) => {
	return (
		<TabbedShowLayout record={record} resource={resource}>
			<Tab label="About" path="">
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
			</Tab>
			<Tab label="Status" path="status">
				<StatusForm record={record} resource={resource} />
			</Tab>
			<Tab label="Funding" path="funding">
				<TechnologyCostForm record={record} resource={resource} />
			</Tab>
			<Tab label="Responsible" path="responsible">
				<ArrayField source="users">
					<Datagrid>
						<TextField source="full_name" />
						<TextField source="email" />
						<TextField label="Role" source="pivot.role" />
						<TextField source="status" />
						<ShowButton basePath="/users" />
					</Datagrid>
				</ArrayField>
			</Tab>
		</TabbedShowLayout>
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
