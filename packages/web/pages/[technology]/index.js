import React from 'react';
import PropTypes from 'prop-types';
import Head from '../../components/head';
import { getTechnology } from '../../services/technology';

import { TechnologyProvider } from '../../components/Technology';

import Tabs from './Tabs';
import Search from './Search';
import Header from './Header';

import { Container } from './styles';

const Technology = ({ technology }) => {
	return (
		!!technology && (
			<>
				<Head title={technology.title} />
				<Search />

				<TechnologyProvider technology={technology}>
					<Container>
						<Header />
						<Tabs />
					</Container>
				</TechnologyProvider>
			</>
		)
	);
};

export const getServerSideProps = async ({ query, res }) => {
	let technology = {};

	if (query && query.technology) {
		technology = await getTechnology(query.technology, {
			taxonomy: 'category',
		});

		// redirect if that technology does not exist.
		if (!technology && res) {
			res.writeHead(302, {
				Location: '/',
			}).end();
		}

		if (technology) {
			technology.category = technology?.terms?.find((category) => !category.parent_id)?.term;
		}
	}

	return {
		props: {
			namespacesRequired: ['common', 'search', 'card', 'helper'],
			technology,
		},
	};
};

Technology.propTypes = {
	technology: PropTypes.shape().isRequired,
};

export default Technology;
