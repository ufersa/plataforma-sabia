import React from 'react';
import PropTypes from 'prop-types';
import { Create } from 'react-admin';
import InstitutionsForm from './Form';

const InstitutionsCreate = ({ resource, basePath }) => (
	<Create resource={resource} basePath={basePath}>
		<InstitutionsForm />
	</Create>
);

InstitutionsCreate.propTypes = {
	basePath: PropTypes.string.isRequired,
	resource: PropTypes.string.isRequired,
};

export default InstitutionsCreate;
