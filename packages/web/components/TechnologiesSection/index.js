import React from 'react';
import PropTypes from 'prop-types';
import Card from '../Card';

import { Section, CardsContainer } from './styles';

const TechnologiesSection = ({ header, technologies, bgColor }) => (
	<Section bgColor={bgColor}>
		<h3>
			<span>Soluções </span>
			{header}
		</h3>
		<CardsContainer>
			{technologies.map(({ id, title, src, place, date, likes, weeks, region, url }) => (
				<Card
					key={id}
					title={title}
					src={src}
					place={place}
					date={date}
					likes={likes}
					weeks={weeks}
					region={region}
					url={url}
				/>
			))}
		</CardsContainer>
	</Section>
);

TechnologiesSection.propTypes = {
	header: PropTypes.string.isRequired,
	technologies: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
	bgColor: PropTypes.string,
};

TechnologiesSection.defaultProps = {
	bgColor: '#fafafa',
};

export default TechnologiesSection;
