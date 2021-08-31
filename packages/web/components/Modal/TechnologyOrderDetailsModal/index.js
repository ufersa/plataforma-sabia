import React from 'react';
import PropTypes from 'prop-types';
import useSwr from 'swr';
import Link from 'next/link';

import { RectangularButton } from '../../Button';
import { Modal, InfosContainer, Details, Title } from './styles';
import { InputField } from '../../Form';
import { getOrder } from '../../../services';
import Loading from '../../Loading';
import { getFundingLabelText, getUseLabelText } from '../../../utils/technologyOrders';
import { internal as internalPages } from '../../../utils/enums/pages.enum';

const TechnologyOrderDetailsModal = ({ closeModal, id }) => {
	const { data: order, isValidating } = useSwr(
		['getOrder', id],
		(_, orderId) => getOrder(orderId, 'technology'),
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
						<h4>{order?.technology?.title}</h4>
						<p>
							Quantidade: <span>{order?.quantity}</span>
						</p>
						<p>
							Financiamento: <span>{getFundingLabelText(order?.funding)}</span>
						</p>
						<p>
							Uso da tecnologia: <span>{getUseLabelText(order?.use)}</span>
						</p>

						<Link
							href={internalPages.technologyDetails.replace(
								':slug',
								order.technology?.slug,
							)}
							passHref
						>
							<RectangularButton
								as="a"
								onClick={closeModal}
								colorVariant="green"
								variant="outlined"
							>
								Ver tecnologia
							</RectangularButton>
						</Link>
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

TechnologyOrderDetailsModal.propTypes = {
	closeModal: PropTypes.func.isRequired,
	id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default TechnologyOrderDetailsModal;
