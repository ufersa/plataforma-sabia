import React from 'react';
import PropTypes from 'prop-types';
import { useModal } from '../../../hooks';
import { Container, Icon } from './styles';

const Share = ({ id }) => {
	const { openModal } = useModal();

	return (
		<Container onClick={() => openModal('share', { id })}>
			<Icon />
		</Container>
	);
};

Share.propTypes = {
	id: PropTypes.number.isRequired,
};

export default Share;
