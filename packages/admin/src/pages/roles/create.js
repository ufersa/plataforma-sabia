import React from 'react';
import PropTypes from 'prop-types';
import { Create } from 'react-admin';
import RolesForm from './Form';

const RolesCreate = ({ resource, basePath }) => (
	<Create resource={resource} basePath={basePath}>
		<RolesForm />
	</Create>
);

RolesCreate.propTypes = {
	basePath: PropTypes.string.isRequired,
	resource: PropTypes.string.isRequired,
};

export default RolesCreate;
