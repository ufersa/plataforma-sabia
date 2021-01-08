import React from 'react';
import PropTypes from 'prop-types';
import useSwr from 'swr';

import { ReviewButton as Button } from '../CurateTechnologyModal/styles';
import { Modal, InfosContainer, Details, Title } from './styles';
import { InputField } from '../../Form';
import { getOrder } from '../../../services';
import Loading from '../../Loading';
import { getFundingLabelText, getUseLabelText } from '../../../utils/technologyOrders';

const OrderDetailsModal = ({ closeModal, id }) => {
	const { data: order, isValidating } = useSwr(
		['getOrder', id],
		(_, orderId) => getOrder(orderId),
		{
			revalidateOnFocus: false,
		},
	);

	return (
		<Modal>
			<Title>Detalhes do pedido</Title>

			<Loading loading={isValidating}>
				<InfosContainer>
					<img
						src={order?.technology?.thumbnail?.url || '/card-image.jpg'}
						alt="Technology thumbnail"
					/>

					<Details>
						<h4>{order?.technology.title}</h4>
						<p>
							Quantidade: <span>{order?.quantity}</span>
						</p>
						<p>
							Financiamento: <span>{getFundingLabelText(order?.funding)}</span>
						</p>
						<p>
							Uso da tecnologia: <span>{getUseLabelText(order?.use)}</span>
						</p>
					</Details>
				</InfosContainer>

				<InputField
					form={{ register: () => {} }}
					name="comments"
					label="Observações"
					variant="gray"
					defaultValue={order?.comment}
					disabled
				/>
			</Loading>

			<Button variant="approve" type="button" onClick={closeModal}>
				Voltar para meus pedidos
			</Button>
		</Modal>
	);
};

OrderDetailsModal.propTypes = {
	closeModal: PropTypes.func.isRequired,
	id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default OrderDetailsModal;
