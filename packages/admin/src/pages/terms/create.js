import React from 'react';
import PropTypes from 'prop-types';
import { Create } from 'react-admin';
import TermsForm from './Form';

const TermsCreate = ({ resource, basePath }) => (
	<Create resource={resource} basePath={basePath}>
		<TermsForm />
	</Create>
);

TermsCreate.propTypes = {
	basePath: PropTypes.string.isRequired,
	resource: PropTypes.string.isRequired,
};

export default TermsCreate;
