import React from 'react';
import PropTypes from 'prop-types';
import { Card } from '../Card';
import { ContentContainer, SectionTitle } from '../Common';
import { CardsWrapper } from './styles';

const TechnologiesSection = ({ header, technologies, bgColor }) => (
	<ContentContainer bgColor={bgColor}>
		<SectionTitle noPadding>{header}</SectionTitle>
		<CardsWrapper data-testid="cards-wrapper">
			{technologies.map(({ id, thumbnail, title, costs, likes, slug, users }) => (
				<Card
					key={id}
					id={id}
					thumbnail={thumbnail?.url}
					title={title}
					price={costs?.[0]?.price}
					likes={likes}
					url={`/t/${slug}`}
					institution={users?.find((user) => user?.pivot?.role === 'OWNER')?.company}
				/>
			))}
		</CardsWrapper>
	</ContentContainer>
);

TechnologiesSection.propTypes = {
	header: PropTypes.string.isRequired,
	technologies: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
	bgColor: PropTypes.string,
};

TechnologiesSection.defaultProps = {
	bgColor: '',
};

export default TechnologiesSection;
