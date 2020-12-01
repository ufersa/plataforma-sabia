import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { ReviewButton as Button } from '../CurateTechnologyModal/styles';
import { Modal, InfosContainer } from './styles';

const DeleteModal = ({ closeModal, title, active, continueMessage, cancelMessage, onSubmit }) => {
	const form = useForm();

	const handleSubmit = async (data) => {
		await onSubmit(data);
		closeModal();
	};

	return (
		<Modal onSubmit={form.handleSubmit(handleSubmit)} noValidate>
			<div>
				{active ? (
					<img
						src="/feeling-blue-rafiki.svg"
						alt="Ilustração de um rapaz segurando uma placa com um emoji triste"
					/>
				) : (
					<img
						src="/building-blocks-rafiki.svg"
						alt="Ilustração de um rapaz em pé segurando uma caixa laranja em frente a algumas caixas verdes empilhadas"
					/>
				)}
			</div>

			<InfosContainer>
				<h3>{title}</h3>
				<div>
					<Button type="submit" variant="deny">
						{continueMessage}
					</Button>
					<Button variant="approve" type="button" onClick={closeModal}>
						{cancelMessage}
					</Button>
				</div>
			</InfosContainer>
		</Modal>
	);
};

DeleteModal.propTypes = {
	closeModal: PropTypes.func.isRequired,
	title: PropTypes.string,
	active: PropTypes.bool,
	continueMessage: PropTypes.string,
	cancelMessage: PropTypes.string,
	onSubmit: PropTypes.func,
};

DeleteModal.defaultProps = {
	title: 'Deseja continuar?',
	active: true,
	continueMessage: 'Sim, continuar',
	cancelMessage: 'Não, cancelar',
	onSubmit: () => {},
};

export default DeleteModal;
