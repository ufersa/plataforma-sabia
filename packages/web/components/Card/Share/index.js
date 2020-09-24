import React, { useCallback } from 'react';
import { useModal } from '../../../hooks';
import { Container, Icon } from './styles';

const Share = () => {
	const { openModal } = useModal();
	const handleOpenModal = useCallback(() => openModal('share'), [openModal]);

	return (
		<Container aria-label="share" onClick={handleOpenModal}>
			<Icon />
		</Container>
	);
};

export default Share;
