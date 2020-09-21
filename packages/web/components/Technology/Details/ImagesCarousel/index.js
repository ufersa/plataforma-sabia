/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { useTechnology } from '../../../../hooks';

import { CarouselContainer, ImageContainer } from './styles';

const defaultThumbnail = 'https://rocketfinalchallenge.s3.amazonaws.com/card-image.jpg';

const ImagesCarousel = () => {
	const { technology } = useTechnology();
	const settings = {
		dots: true,
		lazyLoad: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		prevArrow: <FiChevronLeft />,
		nextArrow: <FiChevronRight />,
	};

	return (
		<div>
			<CarouselContainer {...settings}>
				{technology.attachments.images.length > 0 ? (
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

export default ImagesCarousel;
