/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import * as S from './styles';

const ImagesGalleryModal = ({ images, settings, sliderRef }) => {
	return (
		<S.Container>
			<S.Content>
				<Slider ref={sliderRef} {...settings}>
					{images.map((image) => (
						<img key={image.url} src={image.url} alt="Imagem da tecnologia" />
					))}
				</Slider>
			</S.Content>
		</S.Container>
	);
};

ImagesGalleryModal.propTypes = {
	images: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
	settings: PropTypes.shape({}).isRequired,
	sliderRef: PropTypes.shape({
		current: PropTypes.shape({
			slickGoTo: PropTypes.func,
		}),
	}),
};

ImagesGalleryModal.defaultProps = {
	sliderRef: {
		current: {},
	},
};

export default ImagesGalleryModal;
