import React from 'react';
import PropTypes from 'prop-types';
import { Edit } from 'react-admin';
import TermsForm from './Form';

const TermsEdit = ({ basePath, id, resource }) => (
	<Edit id={id} basePath={basePath} resource={resource}>
		<TermsForm />
	</Edit>
);

TermsEdit.propTypes = {
	id: PropTypes.string.isRequired,
	basePath: PropTypes.string.isRequired,
	resource: PropTypes.string.isRequired,
};

export default TermsEdit;
