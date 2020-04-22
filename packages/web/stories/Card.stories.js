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
				<Card {...technologies[0]} image="https://via.placeholder.com/500" />
			</CardsContainer>
		</Section>
	);
};

export const Grid = () => {
	return (
		<Section bgColor={theme.colors.whiteSmoke}>
			<CardsContainer>
				{technologies.map(
					({ id, title, category, price, place, date, likes, weeks, region, url }) => (
						<Card
							key={id}
							title={title}
							category={category}
							price={price}
							image="https://via.placeholder.com/500"
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
