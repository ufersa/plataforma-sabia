/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { ServiceCard, TechnologyCard } from '../Card';
import { ContentContainer, SectionTitle } from '../Common';
import { CardsWrapper } from './styles';

const cardsMap = {
	technology: TechnologyCard,
	service: ServiceCard,
};

const SolutionsSection = ({ header, data, type, bgColor }) => {
	const CardComponent = cardsMap[type];
	return (
		<ContentContainer bgColor={bgColor} padding="3.2rem 5%">
			<SectionTitle noPadding>{header}</SectionTitle>
			<CardsWrapper data-testid="cards-wrapper">
				{data.map((solution) => (
					<CardComponent {...solution} />
				))}
			</CardsWrapper>
		</ContentContainer>
	);
};

SolutionsSection.propTypes = {
	header: PropTypes.string.isRequired,
	data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
	bgColor: PropTypes.string,
	type: PropTypes.string.isRequired,
};

SolutionsSection.defaultProps = {
	bgColor: '',
};

export default SolutionsSection;
