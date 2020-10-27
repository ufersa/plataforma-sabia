import React from 'react';
import PropTypes from 'prop-types';
import { Create } from 'react-admin';
import ReviewersForm from './Form';

const ReviewersCreate = ({ resource, basePath }) => (
	<Create resource={resource} basePath={basePath}>
		<ReviewersForm />
	</Create>
);

ReviewersCreate.propTypes = {
	basePath: PropTypes.string.isRequired,
	resource: PropTypes.string.isRequired,
};

export default ReviewersCreate;
