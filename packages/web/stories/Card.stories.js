/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Card from '../components/Card';
import { CardsContainer, Section } from '../components/TechnologiesSection/styles';
import { theme } from '../styles';
import { technologies } from '../utils/fakeData';

export default {
	title: 'Card',
	component: Card,
};

export const Single = () => {
	return (
		<Section bgColor={theme.colors.whiteSmoke}>
			<CardsContainer>
				<Card {...technologies[0]} />
			</CardsContainer>
		</Section>
	);
};

export const Grid = () => {
	return (
		<Section bgColor={theme.colors.whiteSmoke}>
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
