import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { RectangularButton } from '../../Button';
import { toast } from '../../Toast';
import { Modal, InfosContainer, Summary, Actions } from './styles';
import { CurrencyInputField, InputField } from '../../Form';
import { formatCurrencyToInt, formatMoney } from '../../../utils/helper';
import { settleADeal } from '../../../services';

const SettleDealModal = ({ closeModal, id, orderType }) => {
	const router = useRouter();
	const [totalValue, setTotalValue] = useState(0);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const form = useForm();
	const { watch } = form;
	const formValues = watch();

	const onSubmit = async () => {
		setIsSubmitting(true);
		const { quantity, unit_value } = formValues;
		const { query } = router;

		const result = await settleADeal(id, {
			quantity,
			unit_value: formatCurrencyToInt(unit_value),
			orderType,
		});

		if (result) {
			toast.success('Pedido fechado com sucesso');
		} else {
			toast.error('Ocorreu um erro ao fechar pedido. Tente novamente mais tarde.');
		}

		router.push('/user/my-account/orders', { query });
		setIsSubmitting(false);
		closeModal();
	};

	useEffect(() => {
		const { quantity, unit_value } = formValues;

		if (quantity && unit_value) {
			const intCurrency = formatCurrencyToInt(unit_value);
			const total = intCurrency * quantity;

			setTotalValue(total);
		} else {
			setTotalValue(0);
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
					name="unit_value"
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

				<Actions>
					<RectangularButton variant="outlined" colorVariant="red" onClick={closeModal}>
						Cancelar
					</RectangularButton>
					<RectangularButton
						variant="filled"
						colorVariant="green"
						type="submit"
						disabled={isSubmitting}
					>
						Fechar pedido
					</RectangularButton>
				</Actions>
			</InfosContainer>
		</Modal>
	);
};

SettleDealModal.propTypes = {
	closeModal: PropTypes.func.isRequired,
	id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	orderType: PropTypes.string.isRequired,
};

export default SettleDealModal;
