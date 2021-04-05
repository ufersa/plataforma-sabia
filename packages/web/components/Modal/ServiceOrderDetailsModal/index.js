import React from 'react';
import PropTypes from 'prop-types';
import useSwr from 'swr';

import { RectangularButton } from '../../Button';
import { Modal, InfosContainer, Details, Title } from './styles';
import { InputField } from '../../Form';
import { getOrder } from '../../../services';
import Loading from '../../Loading';
import { getServiceTypeThumbnail } from '../../../utils/service';
import { formatMoney } from '../../../utils/helper';

const ServiceOrderDetailsModal = ({ closeModal, id }) => {
	const { data: order, isValidating } = useSwr(
		['getOrder', id],
		(_, orderId) => getOrder(orderId, 'service'),
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
						src={
							order?.service?.thumbnail?.url ||
							getServiceTypeThumbnail(order?.service?.type?.trim())
						}
						alt="Service thumbnail"
					/>

					<Details>
						<h4>{order?.service?.name}</h4>
						<p>
							Quantidade: <span>{order?.quantity}</span>
						</p>
						<p>
							Preço: <span>{formatMoney(order?.service?.price)}</span>
						</p>
						<p>
							Total:{' '}
							<span>{formatMoney(order?.service?.price * order?.quantity)}</span>
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

			<RectangularButton variant="filled" colorVariant="green" onClick={closeModal}>
				Voltar para meus pedidos
			</RectangularButton>
		</Modal>
	);
};

ServiceOrderDetailsModal.propTypes = {
	closeModal: PropTypes.func.isRequired,
	id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default ServiceOrderDetailsModal;
