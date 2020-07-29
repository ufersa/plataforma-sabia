import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Head from '../../../components/head';
import { TechnologyProvider } from '../../../components/Technology';
import Header from '../../../components/Technology/Details/Header';
import Search from '../../../components/Technology/Details/Search';
import Tabs from '../../../components/Technology/Details/Tabs';
import { getTechnology } from '../../../services/technology';
import Error from '../../_error';

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

Technology.getInitialProps = async ({ query, res }) => {
	let technology = {};

	if (query && query.technology) {
		technology = await getTechnology(query.technology, {
			taxonomies: true,
		});

		if (technology) {
			technology.taxonomies = technology?.terms?.map((term) => ({
				key: term?.taxonomy?.taxonomy,
				value: term?.term,
			}));

			technology.taxonomies = Object.values(
				technology?.taxonomies.reduce((acc, { key, value }) => {
					acc[key] = acc[key] || { key, value: [] };
					acc[key].value.push(value);
					return acc;
				}, {}),
			).reduce((arr, { key, value }) => ({ ...arr, [key]: [...value].join(', ') }), {});
		} else {
			res.statusCode = 404;
		}
	}

	return {
		statusCode: res.statusCode || 200,
		technology,
		namespacesRequired: ['home-page'],
	};
};

Technology.propTypes = {
	technology: PropTypes.oneOfType([PropTypes.shape(), PropTypes.bool]).isRequired,
	statusCode: PropTypes.number.isRequired,
};

export const Container = styled.div`
	padding: 2rem;
	background-color: ${({ theme: { colors } }) => colors.whiteSmoke};

	@media (min-width: ${({ theme: { screens } }) => screens.medium}px) {
		padding: 6rem 4rem;
	}
`;

export default Technology;
