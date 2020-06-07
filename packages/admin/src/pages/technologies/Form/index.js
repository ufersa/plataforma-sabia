import React from 'react';
import PropTypes from 'prop-types';
import { SimpleForm, TextInput, ImageField } from 'react-admin';

const TechnologiesForm = ({ record, save, resource }) => (
	<SimpleForm record={record} save={save} resource={resource}>
		<TextInput source="title" fullWidth resettable />
		{record.thumbnail && (
			<ImageField source="thumbnail" title="title" label="thumbnail atual" />
		)}
		<TextInput source="thumbnail" fullWidth />
		<TextInput source="status" fullWidth />
	</SimpleForm>
);

TechnologiesForm.propTypes = {
	record: PropTypes.shape({ thumbnail: PropTypes.string }),
	resource: PropTypes.string,
	save: PropTypes.func,
};

TechnologiesForm.defaultProps = {
	record: { thumbnail: '' },
	resource: '',
	save: () => {},
};

export default TechnologiesForm;
