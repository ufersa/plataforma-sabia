import React from 'react';
import PropTypes from 'prop-types';
import { Create } from 'react-admin';
import IdeasForm from './Form';

const IdeasCreate = ({ resource, basePath }) => (
	<Create resource={resource} basePath={basePath}>
		<IdeasForm />
	</Create>
);

IdeasCreate.propTypes = {
	basePath: PropTypes.string.isRequired,
	resource: PropTypes.string.isRequired,
};

export default IdeasCreate;
