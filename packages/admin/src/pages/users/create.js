import React from 'react';
import PropTypes from 'prop-types';
import { Create } from 'react-admin';
import UsersForm from './Form';

const UsersCreate = ({ resource, basePath }) => (
	<Create resource={resource} basePath={basePath}>
		<UsersForm />
	</Create>
);

UsersCreate.propTypes = {
	basePath: PropTypes.string.isRequired,
	resource: PropTypes.string.isRequired,
};

export default UsersCreate;
