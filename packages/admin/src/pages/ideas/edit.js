import React from 'react';
import PropTypes from 'prop-types';
import { Edit } from 'react-admin';
import IdeasForm from './Form';

const IdeasEdit = ({ basePath, id, resource }) => (
	<Edit id={id} basePath={basePath} resource={resource}>
		<IdeasForm />
	</Edit>
);

IdeasEdit.propTypes = {
	id: PropTypes.string.isRequired,
	basePath: PropTypes.string.isRequired,
	resource: PropTypes.string.isRequired,
};

export default IdeasEdit;
