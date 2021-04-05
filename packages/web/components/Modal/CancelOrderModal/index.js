import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { TextField } from '../../Form';
import { RectangularButton } from '../../Button';
import { toast } from '../../Toast';
import { Modal, InfosContainer, customTextFieldCss, Actions } from './styles';
import { cancelOrder } from '../../../services';

const CancelOrderModal = ({ closeModal, id, orderType }) => {
	const router = useRouter();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const form = useForm();

	const onSubmit = async () => {
		setIsSubmitting(true);
		const { cancellation_reason } = form.getValues();
		const { query } = router;
		const result = await cancelOrder(id, { cancellation_reason, orderType });

		if (result) {
			toast.success('Pedido cancelado com sucesso');
		} else {
			toast.error('Ocorreu um erro ao cancelar o pedido. Tente novamente mais tarde.');
		}

		router.push(router.pathname, { query });
		setIsSubmitting(false);
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
					name="cancellation_reason"
					variant="gray"
					label="Antes de cancelar, nos conte o que aconteceu, qual o motivo pelo qual está cancelando o pedido?"
					wrapperCss={customTextFieldCss}
					placeholder="Digite sua mensagem"
					validation={{ required: true }}
				/>

				<Actions>
					<RectangularButton
						variant="outlined"
						colorVariant="red"
						disabled={isSubmitting}
						type="submit"
					>
						Sim, quero cancelar
					</RectangularButton>
					<RectangularButton variant="filled" colorVariant="green" onClick={closeModal}>
						Não, quero voltar
					</RectangularButton>
				</Actions>
			</InfosContainer>
		</Modal>
	);
};

CancelOrderModal.propTypes = {
	closeModal: PropTypes.func.isRequired,
	id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	orderType: PropTypes.string.isRequired,
};

export default CancelOrderModal;
