import React from 'react';
import PropTypes from 'prop-types';
import { Create } from 'react-admin';
import AnnouncementsForm from './Form';

const AnnouncementsCreate = ({ resource, basePath }) => (
	<Create resource={resource} basePath={basePath}>
		<AnnouncementsForm />
	</Create>
);

AnnouncementsCreate.propTypes = {
	basePath: PropTypes.string.isRequired,
	resource: PropTypes.string.isRequired,
};

export default AnnouncementsCreate;
