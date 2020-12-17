import React from 'react';
import PropTypes from 'prop-types';
import { Edit } from 'react-admin';
import IdeassForm from './Form';

const IdeassEdit = ({ basePath, id, resource }) => (
	<Edit id={id} basePath={basePath} resource={resource}>
		<IdeassForm />
	</Edit>
);

IdeassEdit.propTypes = {
	id: PropTypes.string.isRequired,
	basePath: PropTypes.string.isRequired,
	resource: PropTypes.string.isRequired,
};

export default IdeassEdit;
