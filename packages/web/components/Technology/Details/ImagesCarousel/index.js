/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { useTechnology } from '../../../../hooks';

import { CarouselContainer, ImageContainer } from './styles';

const defaultThumbnail = 'https://rocketfinalchallenge.s3.amazonaws.com/card-image.jpg';

const ImagesCarousel = ({ settings }) => {
	const { technology } = useTechnology();

	return (
		<div role="listbox" aria-label="Carrossel com imagens da tecnologia">
			<CarouselContainer
				arrows={false}
				dots
				lazyLoad
				infinite
				speed={500}
				slidesToShow={1}
				slidesToScroll={1}
				{...settings}
			>
				{technology.attachments?.images?.length ? (
					technology.attachments.images.map((item) => (
						<ImageContainer key={item.url} src={item.url} />
					))
				) : (
					<ImageContainer key="slide-default" src={defaultThumbnail} />
				)}
			</CarouselContainer>
		</div>
	);
};

ImagesCarousel.propTypes = {
	settings: PropTypes.shape({}),
};

ImagesCarousel.defaultProps = {
	settings: {},
};

export default ImagesCarousel;
