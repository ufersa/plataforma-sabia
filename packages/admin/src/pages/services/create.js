import React from 'react';
import PropTypes from 'prop-types';
import { Create } from 'react-admin';
import ServicesForm from './Form';

const ServicesCreate = ({ resource, basePath }) => (
	<Create resource={resource} basePath={basePath}>
		<ServicesForm />
	</Create>
);

ServicesCreate.propTypes = {
	basePath: PropTypes.string.isRequired,
	resource: PropTypes.string.isRequired,
};

export default ServicesCreate;
