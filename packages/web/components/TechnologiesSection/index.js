import React from 'react';
import PropTypes from 'prop-types';
import Card from '../Card';

import { Section, CardsContainer } from './styles';

const TechnologiesSection = ({ header, technologies }) => (
	<Section>
		<h2>{header}</h2>
		<CardsContainer>
			{technologies.map(({ id, title, src, place, date, likes, weeks, region }) => (
				<Card
					key={id}
					title={title}
					src={src}
					place={place}
					date={date}
					likes={likes}
					weeks={weeks}
					region={region}
				/>
			))}
		</CardsContainer>
	</Section>
);

TechnologiesSection.propTypes = {
	header: PropTypes.string.isRequired,
	technologies: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default TechnologiesSection;
