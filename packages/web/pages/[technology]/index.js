import React from 'react';
import PropTypes from 'prop-types';
import Head from '../../components/head';
import { TechnologyProvider } from '../../components/Technology';
import { getTechnology } from '../../services/technology';
import Error from '../_error';
import Header from './Header';
import Search from './Search';
import Tabs from './Tabs';

import { Container } from './styles';

const Technology = ({ technology, statusCode }) => {
	return technology ? (
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
	) : (
		<Error statusCode={statusCode} />
	);
};

export const getServerSideProps = async ({ query, res }) => {
	let technology = {};

	if (query && query.technology) {
		technology = await getTechnology(query.technology, {
			taxonomy: 'category',
		});

		if (technology) {
			technology.category = technology?.terms?.find((category) => !category.parent_id)?.term;
		} else {
			res.statusCode = 404;
		}
	}

	return {
		props: {
			namespacesRequired: ['common', 'search', 'card', 'helper'],
			statusCode: res.statusCode,
			technology,
		},
	};
};

Technology.propTypes = {
	technology: PropTypes.shape().isRequired,
	statusCode: PropTypes.number.isRequired,
};

export default Technology;
