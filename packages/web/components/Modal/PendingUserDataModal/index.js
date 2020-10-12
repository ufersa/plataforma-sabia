import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Modal, Button, InfosContainer } from './styles';

const PendingUserDataModal = ({ closeModal }) => {
	const router = useRouter();

	const handleClick = () => {
		closeModal();
		router.push('/user/my-account');
	};

	return (
		<Modal>
			<div>
				<img
					src="/alone-rafiki.svg"
					alt="Rapaz sentado em um balanço e ao lado um balanço vazio representando solidão"
				/>
			</div>

			<InfosContainer>
				<p>Você possui dados pendentes</p>
				<span>Complete o seu cadastro para solicitar ser um curador.</span>

				<Button onClick={handleClick}>Ir para meu perfil</Button>
			</InfosContainer>
		</Modal>
	);
};

PendingUserDataModal.propTypes = {
	closeModal: PropTypes.func.isRequired,
};

export default PendingUserDataModal;
