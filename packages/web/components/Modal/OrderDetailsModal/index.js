import React from 'react';
import PropTypes from 'prop-types';
import { ReviewButton as Button } from '../CurateTechnologyModal/styles';
import { Modal, InfosContainer, Details, Title } from './styles';
import { InputField } from '../../Form';

const technologyMock = {
	id: 1,
	title: 'Construção de cacimbas rasas',
	quantity: 1,
	funding: 'has_funding',
	use: 'enterprise',
	comment: 'Irei testar, se ocorrer tudo bem quero negociar mais 5 unidades',
	thumbnail: 'https://rocketfinalchallenge.s3.amazonaws.com/card-image.jpg',
};

const OrderDetailsModal = ({ closeModal }) => {
	return (
		<Modal>
			<Title>Detalhes do pedido</Title>

			<InfosContainer>
				<img src={technologyMock.thumbnail} alt="Technology thumbnail" />

				<Details>
					<h4>{technologyMock.title}</h4>
					<p>
						Quantidade: <span>{technologyMock.quantity}</span>
					</p>
					<p>
						Financiamento: <span>{technologyMock.funding}</span>
					</p>
					<p>
						Uso da tecnologia: <span>{technologyMock.use}</span>
					</p>
				</Details>
			</InfosContainer>

			<InputField
				form={{ register: () => {} }}
				name="comments"
				label="Observações"
				variant="gray"
				defaultValue={technologyMock.comment}
				disabled
			/>

			<Button variant="approve" type="button" onClick={closeModal}>
				Voltar para meus pedidos
			</Button>
		</Modal>
	);
};

OrderDetailsModal.propTypes = {
	closeModal: PropTypes.func.isRequired,
};

export default OrderDetailsModal;
