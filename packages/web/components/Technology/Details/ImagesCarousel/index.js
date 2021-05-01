/* eslint-disable react/jsx-props-no-spreading */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTechnology } from '../../../../hooks';

import { CarouselContainer, ImageContainer } from './styles';

const defaultThumbnail = 'https://rocketfinalchallenge.s3.amazonaws.com/card-image.jpg';

const ImagesCarousel = ({ settings }) => {
	const { technology } = useTechnology();

	const technologyImages = useMemo(() => {
		const MAX_LENGTH = 10;
		const thumbnailId = technology?.thumbnail_id;
		const images = technology?.attachments?.images;

		if (!Array.isArray(images) || !images?.length) {
			return [];
		}

		images.forEach((image, index) => {
			if (image.id === thumbnailId) {
				images.splice(index, 1);
				images.unshift(image);
			}
		});

		return images.length > MAX_LENGTH ? images.slice(0, MAX_LENGTH) : images;
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
