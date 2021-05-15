import PropTypes from 'prop-types';
import React from 'react';
import {
	ArrayInput,
	ReferenceInput,
	SelectInput,
	SimpleForm,
	SimpleFormIterator,
} from 'react-admin';
import statuses from '../../../components/StatusForm/statuses';

const ResponsibleForm = ({ record, resource, save }) => {
	const users = record?.users.map((user) => {
		return {
			...user,
			role: user.pivot.role,
		};
	});
	const newRecord = { users };
	return (
		<SimpleForm record={newRecord} resource={resource} save={save}>
			<ArrayInput label="labels.responsibles" source="users">
				<SimpleFormIterator>
					<ReferenceInput
						label=""
						source="id"
						reference="users"
						perPage={1000}
						sort={{ field: 'first_name', order: 'ASC' }}
						fullWidth
					>
						<SelectInput optionText="full_name" fullWidth />
					</ReferenceInput>
					<SelectInput source="role" fullWidth choices={statuses.roles} />
				</SimpleFormIterator>
			</ArrayInput>
		</SimpleForm>
	);
};
ResponsibleForm.propTypes = {
	record: PropTypes.shape({
		id: PropTypes.number,
		users: PropTypes.arrayOf(
			PropTypes.shape({
				pivot: PropTypes.shape({
					role: PropTypes.string,
				}),
			}),
		),
	}),
	resource: PropTypes.string,
	save: PropTypes.func,
};

ResponsibleForm.defaultProps = {
	record: { id: null },
	resource: '',
	save: () => {},
};

export default ResponsibleForm;
