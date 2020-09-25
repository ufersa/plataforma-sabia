import React from 'react';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { useTechnology } from '../../../../hooks';

import { CarouselContainer, ImageContainer } from './styles';

const defaultThumbnail = 'https://rocketfinalchallenge.s3.amazonaws.com/card-image.jpg';

const ImagesCarousel = () => {
	const { technology } = useTechnology();

	return (
		<div role="listbox" aria-label="Carrossel com imagens da tecnologia">
			<CarouselContainer
				dots
				lazyLoad
				infinite
				speed={500}
				slidesToShow={1}
				slidesToScroll={1}
				prevArrow={<FiChevronLeft />}
				nextArrow={<FiChevronRight />}
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

export default ImagesCarousel;
