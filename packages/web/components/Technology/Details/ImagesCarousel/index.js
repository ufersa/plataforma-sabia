/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';

import { CarouselContainer, ImageContainer } from './styles';

const defaultThumbnail = 'https://rocketfinalchallenge.s3.amazonaws.com/card-image.jpg';

const ImagesCarousel = () => {
	const settings = {
		dots: true,
		lazyLoad: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		initialSlide: 2,
		prevArrow: <FiChevronLeft />,
		nextArrow: <FiChevronRight />,
	};

	return (
		<div>
			<CarouselContainer {...settings}>
				<div>
					<ImageContainer src={defaultThumbnail} />
				</div>
				<div>
					<ImageContainer src={defaultThumbnail} />
				</div>
				<div>
					<ImageContainer src={defaultThumbnail} />
				</div>
			</CarouselContainer>
		</div>
	);
};

export default ImagesCarousel;
