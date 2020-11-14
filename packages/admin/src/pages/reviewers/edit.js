import React from 'react';
import PropTypes from 'prop-types';
import { Edit } from 'react-admin';
import StatusForm from './Form/statusForm';

const ReviewersEdit = ({ basePath, id, resource }) => (
	<Edit id={id} basePath={basePath} resource={resource}>
		<StatusForm />
	</Edit>
);

ReviewersEdit.propTypes = {
	id: PropTypes.string.isRequired,
	basePath: PropTypes.string.isRequired,
	resource: PropTypes.string.isRequired,
};

export default ReviewersEdit;
