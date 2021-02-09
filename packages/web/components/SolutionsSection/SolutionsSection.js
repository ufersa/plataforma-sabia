import React from 'react';
import PropTypes from 'prop-types';
import { Card } from '../Card';
import { ContentContainer, SectionTitle } from '../Common';
import { CardsWrapper } from './styles';

const SolutionsSection = ({ header, data, bgColor }) => {
	return (
		<ContentContainer bgColor={bgColor}>
			<SectionTitle noPadding>{header}</SectionTitle>
			<CardsWrapper data-testid="cards-wrapper">
				{data.map(({ id, thumbnail, title, price, likes, url, institution }) => (
					<Card
						key={id}
						id={id}
						thumbnail={thumbnail?.url}
						title={title}
						price={price}
						likes={likes}
						url={url}
						institution={institution}
					/>
				))}
			</CardsWrapper>
		</ContentContainer>
	);
};

SolutionsSection.propTypes = {
	header: PropTypes.string.isRequired,
	data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
	bgColor: PropTypes.string,
};

SolutionsSection.defaultProps = {
	bgColor: '',
};

export default SolutionsSection;
