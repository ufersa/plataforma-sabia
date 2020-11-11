import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { ReviewButton as Button } from '../CurateTechnologyModal/styles';
import { toast } from '../../Toast';
import { Modal, InfosContainer, Summary } from './styles';
import { CurrencyInputField, InputField } from '../../Form';
import { formatCurrencyToInt, formatMoney } from '../../../utils/helper';

const SettleDealModal = ({ closeModal }) => {
	const [totalValue, setTotalValue] = useState(0);
	const form = useForm();
	const { watch } = form;
	const formValues = watch();

	const onSubmit = () => {
		toast.success('Pedido fechado com sucesso');
		closeModal();
	};

	useEffect(() => {
		const { quantity, unityPrice } = formValues;

		if (quantity && unityPrice) {
			const intCurrency = formatCurrencyToInt(unityPrice);
			const total = intCurrency * quantity;

			setTotalValue(total);
		}
	}, [formValues]);

	return (
		<Modal onSubmit={form.handleSubmit(onSubmit)} noValidate>
			<div>
				<img
					src="/checkout-rafiki.svg"
					alt="Ilustração de uma moça registrando compras em um computador"
				/>
			</div>

			<InfosContainer>
				<h3>Deseja fechar este pedido?</h3>

				<CurrencyInputField
					form={form}
					label="Valor unitário negociado"
					name="unityPrice"
					placeholder="R$ 0,00"
					variant="gray"
					validation={{ required: true }}
				/>

				<InputField
					form={form}
					name="quantity"
					placeholder="Quantidade negociada"
					label="Quantidade negociada"
					validation={{
						required: true,
						pattern: {
							value: /^[0-9]*$/,
							message: 'Você deve digitar apenas números positivos',
						},
					}}
					type="number"
					min="0"
					variant="gray"
				/>

				<Summary>
					<span>Valor total</span>
					<span>{formatMoney(totalValue)}</span>
				</Summary>

				<div>
					<Button variant="deny" type="button" onClick={closeModal}>
						Cancelar
					</Button>
					<Button variant="approve" type="button">
						Fechar pedido
					</Button>
				</div>
			</InfosContainer>
		</Modal>
	);
};

SettleDealModal.propTypes = {
	closeModal: PropTypes.func.isRequired,
};

export default SettleDealModal;
