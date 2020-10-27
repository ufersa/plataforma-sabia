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
				format={(v) => {
					try {
						return v.map((i) => i.id || i);
					} catch (error) {
						return v;
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
