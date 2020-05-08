import React from 'react';
import PropTypes from 'prop-types';
import { Edit } from 'react-admin';
import TechnologiesForm from './Form';

const TechnologiesEdit = ({ basePath, id, resource }) => (
	<Edit id={id} basePath={basePath} resource={resource}>
		<TechnologiesForm />
	</Edit>
);

TechnologiesEdit.propTypes = {
	id: PropTypes.string.isRequired,
	basePath: PropTypes.string.isRequired,
	resource: PropTypes.string.isRequired,
};

export default TechnologiesEdit;
