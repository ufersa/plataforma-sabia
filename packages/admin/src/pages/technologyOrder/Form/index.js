import React from 'react';
import PropTypes from 'prop-types';
import { SimpleForm, SelectInput } from 'react-admin';

const TechnologyOrdersForm = ({ record, save, resource }) => (
	<SimpleForm record={record} save={save} resource={resource}>
		<SelectInput
			label="Status"
			source="status"
			fullWidth
			choices={[
				{ id: 'open', name: 'Open' },
				{ id: 'finish', name: 'Finish' },
				{ id: 'canceled', name: 'Canceled' },
			]}
		/>
	</SimpleForm>
);

TechnologyOrdersForm.propTypes = {
	record: PropTypes.shape({ id: PropTypes.number }),
	resource: PropTypes.string,
	save: PropTypes.func,
};

TechnologyOrdersForm.defaultProps = {
	record: { id: 0 },
	resource: '',
	save: () => {},
};

export default TechnologyOrdersForm;
