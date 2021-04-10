import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import { dateToString } from '../../utils/helper';
import { getServiceTypeThumbnail } from '../../utils/service';
import * as S from './styles';

const getTechnologyInfos = ({ technology }, isBuyer) => ({
	orderHeader: isBuyer ? 'Tecnologia adquirida' : 'Tecnologia negociada',
	thumbnail: technology?.thumbnail?.url || '/card-image.jpg',
	title: technology?.title,
	button: {
		label: 'Ver tecnologia',
		link: `/t/${technology?.slug}`,
	},
});

const getServiceInfos = ({ service }, isBuyer) => ({
	orderHeader: isBuyer ? 'Serviço adquirido' : 'Serviço negociado',
	thumbnail: service?.thumbnail?.url || getServiceTypeThumbnail(service?.type),
	title: service?.name,
});

const solutionMapper = {
	technology: getTechnologyInfos,
	service: getServiceInfos,
};

const SolutionInfos = ({ order, isBuyer }) => {
	const solutionData = solutionMapper[order.type](order, isBuyer);

	return (
		<S.Solution>
			<p>{solutionData.orderHeader}</p>

			<div>
				<img src={solutionData.thumbnail} alt={`${order.type} thumbnail`} />
				<S.SolutionDetails>
					<p>{solutionData.title}</p>
					<p>Data do pedido: {dateToString(order.created_at)}</p>
					<p>Quantidade: {order.quantity}</p>

					{solutionData.button && (
						<Link href={solutionData.button.link} passHref>
							<S.Button as="a" target="_blank">
								{solutionData.button.label}
							</S.Button>
						</Link>
					)}
				</S.SolutionDetails>
			</div>
		</S.Solution>
	);
};

SolutionInfos.propTypes = {
	order: PropTypes.shape({
		quantity: PropTypes.number,
		type: PropTypes.string,
		created_at: PropTypes.string,
	}).isRequired,
	isBuyer: PropTypes.bool.isRequired,
};

export default SolutionInfos;
