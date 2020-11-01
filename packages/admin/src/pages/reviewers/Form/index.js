import React from 'react';
import PropTypes from 'prop-types';
import {
	SimpleForm,
	SelectInput,
	ReferenceArrayInput,
	CheckboxGroupInput,
	ReferenceInput,
	required,
} from 'react-admin';

const ReviewersForm = ({ record, save, resource }) => {
	return (
		<SimpleForm record={record} save={save} resource={resource}>
			<ReferenceInput
				label="User"
				source="user_id"
				reference="users"
				validate={[required()]}
				perPage={100}
				fullWidth
			>
				<SelectInput optionText="full_name" />
			</ReferenceInput>

			<ReferenceArrayInput
				label="Categories"
				source="categories"
				reference="terms"
				validate={[required()]}
				perPage={100}
				fullWidth
				filter={{ taxonomy: 'category' }}
				format={(values) => {
					try {
						return values.map((term) => term.id || term);
					} catch (error) {
						return values;
					}
				}}
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
