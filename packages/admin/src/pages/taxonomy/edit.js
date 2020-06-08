import React from 'react';
import PropTypes from 'prop-types';
import { Edit } from 'react-admin';
import TaxonomyForm from './Form';

const TaxonomyEdit = ({ basePath, id, resource }) => (
	<Edit id={id} basePath={basePath} resource={resource}>
		<TaxonomyForm />
	</Edit>
);

TaxonomyEdit.propTypes = {
	id: PropTypes.string.isRequired,
	basePath: PropTypes.string.isRequired,
	resource: PropTypes.string.isRequired,
};

export default TaxonomyEdit;
