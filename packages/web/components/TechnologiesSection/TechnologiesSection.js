import React from 'react';
import PropTypes from 'prop-types';
import { Card } from '../Card';

import { Section, CardsContainer } from './styles';

export const TechnologiesSection = ({ header, technologies, bgColor }) => {
	return (
		<Section bgColor={bgColor}>
			<h2>
				<span>Soluções </span>
				{header}
			</h2>
			<CardsContainer>
				{technologies.map(
					({ id, title, image, place, date, likes, weeks, region, url }) => (
						<Card
							key={id}
							title={title}
							image={image}
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
