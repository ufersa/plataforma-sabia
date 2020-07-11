import React from 'react';
import PropTypes from 'prop-types';
import Head from '../../components/head';
import { getTechnology } from '../../services/technology';
import { SearchBox, AlgoliaSearchProvider } from '../../components/Algolia';
import { Button } from '../../components/Button';

import {
	Container,
	SearchBoxContainer,
	Title,
	ImageContainer,
	DescriptionContainer,
	HeaderContainer,
	DescriptionText,
	ActionsContainer,
	ImplementationCost,
	ButtonsContainer,
} from './styles';

const defaultThumbnail = 'https://rocketfinalchallenge.s3.amazonaws.com/card-image.jpg';

const Technology = ({ technology }) => {
	return (
		<>
			<Head title={technology.title} />

			<AlgoliaSearchProvider>
				<SearchBoxContainer>
					<SearchBox />
				</SearchBoxContainer>
			</AlgoliaSearchProvider>

			<Container>
				<Title>{technology.title}</Title>

				<HeaderContainer>
					<ImageContainer
						src={technology.thumbnail || defaultThumbnail}
						alt={technology.title}
					/>
					<DescriptionContainer>
						<Title>{technology.title}</Title>
						<DescriptionText>{technology.description}</DescriptionText>
						<ActionsContainer>
							<ButtonsContainer>
								<ImplementationCost />
								<Button variant="success">Quero Adquirir Essa Tecnologia</Button>
								<Button variant="info">Quero Suporte Para Essa Tecnologia</Button>
							</ButtonsContainer>
						</ActionsContainer>
					</DescriptionContainer>
				</HeaderContainer>
			</Container>
		</>
	);
};

Technology.propTypes = {
	technology: PropTypes.shape({
		application_examples: PropTypes.string,
		application_mode: PropTypes.string,
		contribution: PropTypes.string,
		created_at: PropTypes.string,
		description: PropTypes.string,
		entailes_problem: PropTypes.string,
		id: PropTypes.number,
		installation_time: PropTypes.number,
		likes: PropTypes.number,
		objectID: PropTypes.string,
		patent: PropTypes.number,
		patent_number: PropTypes.string,
		primary_purpose: PropTypes.string,
		private: PropTypes.number,
		requirements: PropTypes.string,
		risks: PropTypes.string,
		secondary_purpose: PropTypes.string,
		slug: PropTypes.string,
		solves_problem: PropTypes.string,
		status: PropTypes.string,
		thumbnail: PropTypes.string,
		title: PropTypes.string,
		updated_at: PropTypes.string,
	}).isRequired,
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

export default Technology;
