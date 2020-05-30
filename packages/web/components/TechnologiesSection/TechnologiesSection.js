import React from 'react';
import PropTypes from 'prop-types';
import { Card } from '../Card';
import { ContentContainer, Title } from '../Common';
import { CardsWrapper } from './styles';

const TechnologiesSection = ({ header, technologies, bgColor }) => {
	return (
		<ContentContainer bgColor={bgColor}>
			<Title dangerouslySetInnerHTML={{ __html: header }} />
			<CardsWrapper>
				{technologies.map(
					({
						id,
						title,
						category,
						privateTechnology,
						patent,
						thumbnail,
						date,
						likes,
						installation_time,
						url,
					}) => (
						<Card
							key={id}
							title={title}
							category={category}
							privateTechnology={privateTechnology}
							patent={patent}
							thumbnail={thumbnail}
							date={date}
							likes={likes}
							installation_time={installation_time}
							url={url}
						/>
					),
				)}
			</CardsWrapper>
		</ContentContainer>
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
