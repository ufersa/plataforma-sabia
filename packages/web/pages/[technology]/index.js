import React from 'react';
import PropTypes from 'prop-types';
import { getTechnology } from '../../services/technology';

const Technology = ({ technology }) => {
	return <h1>{technology.title}</h1>;
};

Technology.propTypes = {
	technology: PropTypes.isRequired,
};

Technology.getInitialProps = async (ctx) => {
	const { query, res } = ctx;

	let technology = {};

	if (query && query.technology) {
		technology = await getTechnology(query.technology);

		// redirect if that technology does not exist.
		if (!technology && res) {
			res.writeHead(404, {
				Location: '/',
			}).end();
		}
	}

	return {
		namespacesRequired: ['common', 'search', 'card'],
		technology,
	};
};

export default Technology;
