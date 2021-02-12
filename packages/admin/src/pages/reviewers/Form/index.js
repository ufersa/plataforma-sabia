import React from 'react';
import PropTypes from 'prop-types';
import { SimpleForm, SelectInput, CheckboxGroupInput, ReferenceInput, required } from 'react-admin';
import { ReferenceArrayInput } from '../../../components';

const ReviewersForm = ({ record, save, resource }) => {
	return (
		<SimpleForm record={record} save={save} resource={resource}>
			<ReferenceInput
				source="user_id"
				reference="users"
				validate={[required()]}
				perPage={100}
				fullWidth
			>
				<SelectInput optionText="full_name" />
			</ReferenceInput>

			<ReferenceArrayInput
				source="categories"
				reference="terms"
				validate={[required()]}
				filter={{ taxonomy: 'category' }}
			>
				<CheckboxGroupInput optionText="term" />
			</ReferenceArrayInput>
		</SimpleForm>
	);
};

ReviewersForm.propTypes = {
	record: PropTypes.shape({ id: PropTypes.number }),
	resource: PropTypes.string,
	save: PropTypes.func,
};

ReviewersForm.defaultProps = {
	record: { id: 0 },
	resource: '',
	save: () => {},
};

export default ReviewersForm;
