import React from 'react';
import Slider from 'react-slick';
import PropTypes from 'prop-types';

import Item from './Item';

import * as S from './styles';

const FeatureSlider = ({ item }) => {
	const handleCustomPaging = (i) => item.dots[i];

	return (
		<S.Container reversed={item.reversed} className="feature-slider" id={item.to}>
			<S.Title reversed={item.reversed}>{item.title}</S.Title>
			<Slider
				infinite
				speed={500}
				slidesToShow={1}
				slidesToScroll={1}
				arrows
				dots
				customPaging={handleCustomPaging}
				nextArrow={
					<S.Arrow next>
						<img src="/about/features/arrow.svg" alt="Seta para a direita" />
					</S.Arrow>
				}
				prevArrow={
					<S.Arrow>
						<img src="/about/features/arrow.svg" alt="Seta para a esquerda" />
					</S.Arrow>
				}
			>
				{item.items.map((sliderItem) => (
					<Item key={sliderItem.label} item={sliderItem} reversed={item.reversed} />
				))}
			</Slider>
		</S.Container>
	);
};

FeatureSlider.propTypes = {
	item: PropTypes.shape({
		id: PropTypes.number,
		to: PropTypes.string,
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
