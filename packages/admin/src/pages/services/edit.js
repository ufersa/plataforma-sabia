import React from 'react';
import PropTypes from 'prop-types';
import { Edit } from 'react-admin';
import ServicesForm from './Form';

const ServicesEdit = ({ basePath, id, resource }) => (
	<Edit id={id} basePath={basePath} resource={resource}>
		<ServicesForm />
	</Edit>
);

ServicesEdit.propTypes = {
	id: PropTypes.string.isRequired,
	basePath: PropTypes.string.isRequired,
	resource: PropTypes.string.isRequired,
};

export default ServicesEdit;
