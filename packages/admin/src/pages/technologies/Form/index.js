import React from 'react';
import PropTypes from 'prop-types';
import { SimpleForm, TextInput, ImageField, NumberInput } from 'react-admin';

const TechnologiesForm = ({ record, save, resource }) => (
	<SimpleForm record={record} save={save} resource={resource}>
		<TextInput source="title" fullWidth resettable />
		{record.logo && <ImageField source="logo" title="title" label="Logo atual" />}
		<TextInput source="logo" fullWidth />
		<TextInput source="category" fullWidth />
		<TextInput source="description" fullWidth multiline resettable />
		<TextInput source="site_url" fullWidth resettable />
		<NumberInput source="private" step={1} fullWidth />
		<NumberInput source="price" step={0.1} fullWidth />
		<TextInput source="place" fullWidth />
		<NumberInput source="weeks" step={1} fullWidth />
		<TextInput source="region" fullWidth />
	</SimpleForm>
);

TechnologiesForm.propTypes = {
	record: PropTypes.shape({ logo: PropTypes.string }),
	resource: PropTypes.string.isRequired,
	save: PropTypes.func,
};

TechnologiesForm.defaultProps = {
	record: { logo: '' },
	save: () => {},
};

export default TechnologiesForm;
