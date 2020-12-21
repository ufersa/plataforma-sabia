import React from 'react';
import PropTypes from 'prop-types';
import { Edit } from 'react-admin';
import InstitutionsForm from './Form';

const InstitutionsEdit = ({ basePath, id, resource }) => (
	<Edit id={id} basePath={basePath} resource={resource}>
		<InstitutionsForm />
	</Edit>
);

InstitutionsEdit.propTypes = {
	id: PropTypes.string.isRequired,
	basePath: PropTypes.string.isRequired,
	resource: PropTypes.string.isRequired,
};

export default InstitutionsEdit;
