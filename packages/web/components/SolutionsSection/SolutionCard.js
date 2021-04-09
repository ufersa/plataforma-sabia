/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { ServiceCard, TechnologyCard } from '../Card';

const cardsMap = {
	technology: TechnologyCard,
	service: ServiceCard,
};

const SolutionCard = ({ data, type }) => {
	const CardComponent = cardsMap[type];
	return <CardComponent {...data} />;
};

SolutionCard.propTypes = {
	data: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.shape({})), PropTypes.shape({})])
		.isRequired,
	type: PropTypes.string.isRequired,
};

export default SolutionCard;
