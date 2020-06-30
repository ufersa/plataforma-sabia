import React from 'react';
import PropTypes from 'prop-types';
import { Edit } from 'react-admin';
import PermissionsForm from './Form';

const PermissionsEdit = ({ basePath, id, resource }) => (
	<Edit id={id} basePath={basePath} resource={resource}>
		<PermissionsForm />
	</Edit>
);

PermissionsEdit.propTypes = {
	id: PropTypes.string.isRequired,
	basePath: PropTypes.string.isRequired,
	resource: PropTypes.string.isRequired,
};

export default PermissionsEdit;
