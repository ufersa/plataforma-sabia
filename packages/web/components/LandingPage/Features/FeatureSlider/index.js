import React from 'react';
import Slider from 'react-slick';
import PropTypes from 'prop-types';

import Item from './Item';

import { Container } from './styles';

const FeatureSlider = ({ item }) => {
	const handleCustomPaging = (i) => item.dots[i];

	return (
		<Container reversed={item.reversed}>
			<h2>{item.title}</h2>
			<Slider
				infinite
				speed={500}
				slidesToShow={1}
				slidesToScroll={1}
				arrows
				dots
				customPaging={handleCustomPaging}
			>
				{item.items.map((sliderItem) => (
					<Item key={sliderItem.label} item={sliderItem} />
				))}
			</Slider>
		</Container>
	);
};

FeatureSlider.propTypes = {
	item: PropTypes.shape({
		id: PropTypes.number,
		title: PropTypes.string,
		items: PropTypes.arrayOf(
			PropTypes.shape({
				label: PropTypes.string,
				description: PropTypes.string,
				image: PropTypes.string,
			}),
		),
		dots: PropTypes.arrayOf(PropTypes.element),
		reversed: PropTypes.bool,
	}).isRequired,
};

export default FeatureSlider;
