import React from 'react';
import PropTypes from 'prop-types';
import { Edit } from 'react-admin';
import UsersForm from './Form';

const UsersEdit = ({ basePath, id, resource }) => (
	<Edit id={id} basePath={basePath} resource={resource}>
		<UsersForm />
	</Edit>
);

UsersEdit.propTypes = {
	id: PropTypes.string.isRequired,
	basePath: PropTypes.string.isRequired,
	resource: PropTypes.string.isRequired,
};

export default UsersEdit;
