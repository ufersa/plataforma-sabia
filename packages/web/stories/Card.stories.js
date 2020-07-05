/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Card } from '../components/Card';
import { ContentContainer } from '../components/Common';
import { CardsWrapper } from '../components/TechnologiesSection/styles';
import { theme } from '../styles';
import { technologies } from './utils/fakeData';

export default {
	title: 'Card',
	component: Card,
};

export const Single = () => {
	return (
		<ContentContainer bgColor={theme.colors.whiteSmoke}>
			<CardsWrapper>
				<Card {...technologies[0]} />
			</CardsWrapper>
		</ContentContainer>
	);
};

export const Grid = () => {
	return (
		<ContentContainer bgColor={theme.colors.whiteSmoke}>
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
