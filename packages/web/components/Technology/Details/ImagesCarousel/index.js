/* eslint-disable react/jsx-props-no-spreading */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTechnology } from '../../../../hooks';

import { CarouselContainer, ImageContainer } from './styles';

const defaultThumbnail = 'https://rocketfinalchallenge.s3.amazonaws.com/card-image.jpg';

const ImagesCarousel = ({ settings }) => {
	const { technology } = useTechnology();

	// Reorder the images for the technology thumbnail to be the first item in the array
	const technologyImages = useMemo(() => {
		const MAX_LENGTH = 10;
		const thumbnailId = technology?.thumbnail_id;
		const images = technology?.attachments?.images;

		if (!Array.isArray(images) || !images?.length) {
			return [];
		}

		const thumbnailIndex = images.findIndex((image) => image.id === thumbnailId);

		return images.reduce(
			(acc, image, index) => {
				if (acc.length < MAX_LENGTH && index !== thumbnailIndex) {
					acc.push(image);
				}

				return acc;
			},
			[images[thumbnailIndex]],
		);
	}, [technology]);

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
				{technologyImages.length ? (
					technologyImages.map((image) => (
						<ImageContainer key={image.url} src={image.url} />
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
