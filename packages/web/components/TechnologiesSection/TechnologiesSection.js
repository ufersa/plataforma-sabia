import React from 'react';
import PropTypes from 'prop-types';
import { Card } from '../Card';
import { ContentContainer, Title } from '../Common';
import { SafeHtml } from '../SafeHtml';
import { CardsWrapper } from './styles';

const TechnologiesSection = ({ header, technologies, bgColor }) => (
	<ContentContainer bgColor={bgColor}>
		<Title>
			<SafeHtml html={header} />
		</Title>
		<CardsWrapper data-testid="cards-wrapper">
			{technologies.map(
				({
					id,
					title,
					terms,
					private: privateTechnology,
					patent,
					thumbnail,
					created_at,
					likes,
					slug,
					users,
				}) => (
					<Card
						key={id}
						id={id}
						title={title}
						category={terms.find((category) => !category.parent_id)?.term}
						privateTechnology={!!privateTechnology}
						patent={!!patent}
						thumbnail={thumbnail}
						date={new Date(created_at)}
						likes={likes}
						url={`/t/${slug}`}
						institution={users.find((user) => user.pivot.role === 'OWNER')?.company}
					/>
				),
			)}
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
