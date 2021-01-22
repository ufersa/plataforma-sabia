import React, { useState } from 'react';
import PropTypes from 'prop-types';

import * as S from './styles';

const IframeModal = ({ src, title, frameBorder, allow, allowFullScreen, closeModal }) => {
	const [isLoading, setIsLoading] = useState(true);

	return (
		<S.Container>
			{isLoading && (
				<S.SpinnerContainer>
					<S.Spinner />
				</S.SpinnerContainer>
			)}

			<S.CloseIcon role="button" onClick={() => closeModal()} aria-label="Close modal" />
			<iframe
				src={src}
				title={title}
				frameBorder={frameBorder}
				allow={allow}
				allowFullScreen={allowFullScreen}
				onLoad={() => setIsLoading(false)}
			/>
		</S.Container>
	);
};

IframeModal.propTypes = {
	src: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	frameBorder: PropTypes.string,
	allow: PropTypes.string,
	allowFullScreen: PropTypes.bool,
	closeModal: PropTypes.func.isRequired,
};

IframeModal.defaultProps = {
	frameBorder: 0,
	allow: '',
	allowFullScreen: false,
};

export default IframeModal;
