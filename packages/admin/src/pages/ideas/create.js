import React from 'react';
import PropTypes from 'prop-types';
import { Create } from 'react-admin';
import IdeassForm from './Form';

const IdeassCreate = ({ resource, basePath }) => (
	<Create resource={resource} basePath={basePath}>
		<IdeassForm />
	</Create>
);

IdeassCreate.propTypes = {
	basePath: PropTypes.string.isRequired,
	resource: PropTypes.string.isRequired,
};

export default IdeassCreate;
