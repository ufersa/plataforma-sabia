import React from 'react';
import PropTypes from 'prop-types';
import Head from '../../components/head';
import { getTechnology } from '../../services/technology';

import { TechnologyProvider } from '../../components/Technology';

import Search from './Search';
import Header from './Header';

import { Container } from './styles';

const Technology = ({ technology }) => {
	return (
		<>
			<Head title={technology.title} />
			<Search />

			<TechnologyProvider technology={technology}>
				<Container>
					<Header />
				</Container>
			</TechnologyProvider>
		</>
	);
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
		namespacesRequired: ['common', 'search', 'card', 'helper'],
		technology,
	};
};

Technology.propTypes = {
	technology: PropTypes.shape().isRequired,
};

export default Technology;
