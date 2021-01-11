import React from 'react';
import PropTypes from 'prop-types';
import { Edit } from 'react-admin';
import AnnouncementsForm from './Form';

const AnnouncementsEdit = ({ basePath, id, resource }) => (
	<Edit id={id} basePath={basePath} resource={resource}>
		<AnnouncementsForm />
	</Edit>
);

AnnouncementsEdit.propTypes = {
	id: PropTypes.string.isRequired,
	basePath: PropTypes.string.isRequired,
	resource: PropTypes.string.isRequired,
};

export default AnnouncementsEdit;
