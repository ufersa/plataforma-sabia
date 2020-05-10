import React from 'react';
import PropTypes from 'prop-types';
import { Create } from 'react-admin';
import TechnologiesForm from './Form';

const TechnologiesCreate = ({ resource, basePath }) => (
	<Create resource={resource} basePath={basePath}>
		<TechnologiesForm />
	</Create>
);

TechnologiesCreate.propTypes = {
	basePath: PropTypes.string.isRequired,
	resource: PropTypes.string.isRequired,
};

export default TechnologiesCreate;
