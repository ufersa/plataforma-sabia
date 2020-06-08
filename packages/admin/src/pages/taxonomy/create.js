import React from 'react';
import PropTypes from 'prop-types';
import { Create } from 'react-admin';
import TaxonomyForm from './Form';

const TaxonomyCreate = ({ resource, basePath }) => (
	<Create resource={resource} basePath={basePath}>
		<TaxonomyForm />
	</Create>
);

TaxonomyCreate.propTypes = {
	basePath: PropTypes.string.isRequired,
	resource: PropTypes.string.isRequired,
};

export default TaxonomyCreate;
