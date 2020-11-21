import React from 'react';
import PropTypes from 'prop-types';

import ImagesCarousel from '../../Technology/Details/ImagesCarousel';
import { TechnologyProvider } from '../../Technology';
import * as S from './styles';

const ImagesGalleryModal = ({ technology, settings, closeModal }) => {
	return (
		<TechnologyProvider technology={technology}>
			<S.Container>
				<S.Close role="button" aria-label="close modal" onClick={closeModal} />
				<S.Content>
					<ImagesCarousel settings={settings} />
				</S.Content>
			</S.Container>
		</TechnologyProvider>
	);
};

ImagesGalleryModal.propTypes = {
	technology: PropTypes.shape({}).isRequired,
	settings: PropTypes.shape({}).isRequired,
	closeModal: PropTypes.func.isRequired,
};

export default ImagesGalleryModal;
