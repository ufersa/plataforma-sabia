import React from 'react';
import PropTypes from 'prop-types';
import { Card } from '../Card';

import { Section, CardsContainer } from './styles';

const TechnologiesSection = ({ header, technologies, bgColor }) => {
	return (
		<Section bgColor={bgColor}>
			{/* TODO:use SafeHTML component */}
			{/* eslint-disable-next-line react/no-danger */}
			<h2 dangerouslySetInnerHTML={{ __html: header }} />
			<CardsContainer>
				{technologies.map(
					({
						id,
						title,
						category,
						price,
						logo,
						place,
						date,
						likes,
						weeks,
						region,
						url,
					}) => (
						<Card
							key={id}
							title={title}
							category={category}
							price={price}
							logo={logo}
							place={place}
							date={date}
							likes={likes}
							weeks={weeks}
							region={region}
							url={url}
						/>
					),
				)}
			</CardsContainer>
		</Section>
	);
};

TechnologiesSection.propTypes = {
	header: PropTypes.string.isRequired,
	technologies: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
	bgColor: PropTypes.string,
};

TechnologiesSection.defaultProps = {
	bgColor: '',
};

export default TechnologiesSection;
