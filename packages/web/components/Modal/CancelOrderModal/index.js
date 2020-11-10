import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { useForm } from 'react-hook-form';
import { TextField } from '../../Form';
import { ReviewButton as Button } from '../CurateTechnologyModal/styles';
import { toast } from '../../Toast';

const customTextFieldCss = css`
	${({ theme: { colors } }) => css`
		> label {
			display: flex;
			font-size: 1.6rem;
			line-height: 2.4rem;
			color: ${colors.silver};
			margin-top: 0.8rem;
			margin-bottom: 1.6rem;
		}
	`}
`;

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
				<p>Cancelar este pedido?</p>
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

const InfosContainer = styled.div`
	${({ theme: { colors } }) => css`
		display: flex;
		flex-direction: column;

		> p {
			color: ${colors.red};
			font-size: 2.8rem;
			font-weight: 500;
			margin-bottom: 0.8rem;
			line-height: 3.3rem;
		}

		> span {
			color: ${colors.silver};
			font-size: 1.6rem;
			line-height: 2.4rem;
		}
	`}
`;

const Modal = styled.form`
	${({ theme: { screens } }) => css`
		display: flex;
		max-width: 77rem;

		> div:first-child {
			max-width: 26rem;
		}

		@media screen and (max-width: ${screens.medium}px) {
			flex-direction: column;

			> div:first-child {
				display: none;
			}

			${InfosContainer} {
				margin-left: 0;
				margin-right: 0;
			}
		}
	`}
`;

CancelOrderModal.propTypes = {
	closeModal: PropTypes.func.isRequired,
};

export default CancelOrderModal;
