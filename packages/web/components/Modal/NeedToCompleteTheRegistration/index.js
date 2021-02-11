import React from 'react';
import { useRouter } from 'next/router';

import { Button } from '../../Button';
import { StyledModal, StyledLabel, Container } from './styles';
import { useModal } from '../../../hooks';

const NeedToCompleteRegistrationModal = () => {
	const router = useRouter();
	const { closeModal } = useModal();

	return (
		<StyledModal>
			<Container>
				<StyledLabel>
					Você precisa completar o seu cadastro antes de prosseguir, preenchas todos os
					campos obrigatórios dados de acordo com o seu perfil.
				</StyledLabel>
				<Button
					onClick={() => {
						closeModal();
						router.push('/user/my-account');
					}}
				>
					Completar cadastro
				</Button>
			</Container>
		</StyledModal>
	);
};

NeedToCompleteRegistrationModal.propTypes = {};

NeedToCompleteRegistrationModal.defaultProps = {};

export default NeedToCompleteRegistrationModal;
