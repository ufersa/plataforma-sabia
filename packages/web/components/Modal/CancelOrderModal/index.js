import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { TextField } from '../../Form';
import { ReviewButton as Button } from '../CurateTechnologyModal/styles';
import { toast } from '../../Toast';
import { Modal, InfosContainer, customTextFieldCss } from './styles';

const CancelOrderModal = ({ closeModal }) => {
	const form = useForm();

	const onSubmit = () => {
		toast.success('Pedido cancelado com sucesso');
		closeModal();
	};

	return (
		<Modal onSubmit={form.handleSubmit(onSubmit)} noValidate>
			<div>
				<img
					src="/feeling-blue-rafiki.svg"
					alt="Ilustração de um rapaz segurando uma placa com um emoji triste"
				/>
			</div>

			<InfosContainer>
				<h3>Cancelar este pedido?</h3>
				<TextField
					form={form}
					name="message"
					variant="gray"
					label="Antes de cancelar, nos conte o que aconteceu, qual o motivo pelo qual está cancelando o pedido?"
					wrapperCss={customTextFieldCss}
					placeholder="Digite sua mensagem"
					validation={{ required: true }}
				/>

				<div>
					<Button variant="deny">Sim, quero cancelar</Button>
					<Button variant="approve" type="button" onClick={closeModal}>
						Não, quero voltar
					</Button>
				</div>
			</InfosContainer>
		</Modal>
	);
};

CancelOrderModal.propTypes = {
	closeModal: PropTypes.func.isRequired,
};

export default CancelOrderModal;
