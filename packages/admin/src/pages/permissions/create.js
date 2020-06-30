import React from 'react';
import PropTypes from 'prop-types';
import { Create } from 'react-admin';
import PermissionsForm from './Form';

const PermissionsCreate = ({ resource, basePath }) => (
	<Create resource={resource} basePath={basePath}>
		<PermissionsForm />
	</Create>
);

PermissionsCreate.propTypes = {
	basePath: PropTypes.string.isRequired,
	resource: PropTypes.string.isRequired,
};

export default PermissionsCreate;
