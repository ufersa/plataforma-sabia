import React from 'react';
import PropTypes from 'prop-types';
import {
	SimpleForm,
	ArrayInput,
	SimpleFormIterator,
	ReferenceInput,
	SelectInput,
} from 'react-admin';

const ResponsibleForm = ({ record, resource, save }) => {
	const newRecord = { users: record?.users };
	return (
		<SimpleForm record={newRecord} resource={resource} save={save}>
			<ArrayInput source="users">
				<SimpleFormIterator>
					<ReferenceInput
						label="full_name"
						source="id"
						reference="users"
						perPage={100}
						fullWidth
					>
						<SelectInput optionText="full_name" fullWidth />
					</ReferenceInput>
				</SimpleFormIterator>
			</ArrayInput>
		</SimpleForm>
	);
};
ResponsibleForm.propTypes = {
	record: PropTypes.shape({ id: PropTypes.number }),
	resource: PropTypes.string,
	save: PropTypes.func,
};

ResponsibleForm.defaultProps = {
	record: { id: null },
	resource: '',
	save: () => {},
};

export default ResponsibleForm;
