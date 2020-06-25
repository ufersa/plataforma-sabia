import React from 'react';
import PropTypes from 'prop-types';
import { Edit } from 'react-admin';
import RolesForm from './Form';

const RolesEdit = ({ basePath, id, resource }) => (
	<Edit id={id} basePath={basePath} resource={resource}>
		<RolesForm />
	</Edit>
);

RolesEdit.propTypes = {
	id: PropTypes.string.isRequired,
	basePath: PropTypes.string.isRequired,
	resource: PropTypes.string.isRequired,
};

export default RolesEdit;
