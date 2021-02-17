/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import styled, { css } from 'styled-components';
import { useForm } from 'react-hook-form';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { RectangularButton } from '../components/Button';
import EmptyScreen from '../components/EmptyScreen';
import { SectionTitle } from '../components/Common';
import { CartItem } from '../components/ShoppingCart';
import { TextField } from '../components/Form';
import { useAuth, useModal, useShoppingCart } from '../hooks';
import { formatMoney } from '../utils/helper';
import { createServiceOrder } from '../services';
import { toast } from '../components/Toast';

const ShoppingCart = () => {
	const { t } = useTranslation(['common']);
	const form = useForm({ comments: '' });
	const { items, totalPrice, updateItem, removeItem } = useShoppingCart();
	const { openModal } = useModal();
	const { user } = useAuth();

	const handleSubmit = async () => {
		if (!user.id) {
			return openModal('login', {
				message: t('common:signInToContinue'),
			});
		}

		if (!user.operations.can_create_service_order) {
			return openModal('needToCompleteTheRegistration', null, {
				overlayClick: false,
			});
		}

		const result = await createServiceOrder(
			items.map((item) => ({ service_id: item.id, quantity: item.quantity })),
		);

		if (!result) {
			return toast.error(
				'Ocorreu um erro ao finalizar seu pedido. Tente novamente em instantes.',
			);
		}

		return toast.success('Pedido enviado com sucesso!');
	};

	if (!items.length) {
		return (
			<Wrapper>
				<EmptyScreen
					message={
						<p>
							Oops! Parece que seu carrinho está vazio. <br />
							Que tal dar uma olhada em algumas soluções?
						</p>
					}
					showHomeButton
				/>
			</Wrapper>
		);
	}

	return (
		<Wrapper onSubmit={form.handleSubmit(handleSubmit)}>
			<Container>
				<CartItems>
					<SectionTitle align="left" color="black" noMargin noPadding>
						Meu carrinho
					</SectionTitle>

					<CartItemsWrapper>
						{items.map((item) => (
							<CartItem
								{...item}
								key={`${item.id}-${item.type}`}
								form={form}
								onRemoveFromCart={() =>
									removeItem({ id: item.id, type: item.type })
								}
								onUpdateItem={(newValues) => updateItem({ ...item, ...newValues })}
							/>
						))}
					</CartItemsWrapper>
				</CartItems>

				<Checkout>
					<SectionTitle align="left" color="black" noMargin noPadding>
						Resumo do pedido
					</SectionTitle>

					<CheckoutInfos>
						<Total>
							<span>Total</span> <span>{formatMoney(totalPrice)}</span>
						</Total>

						<TextField
							form={form}
							name="comments"
							variant="gray"
							label="Observações"
							placeholder="Digite suas observações"
						/>

						<RectangularButton
							variant="filled"
							colorVariant="orange"
							type="submit"
							fullWidth
						>
							Finalizar pedido
						</RectangularButton>
						<Link href="/search" passHref>
							<RectangularButton variant="outlined" colorVariant="blue" as="a">
								Escolher mais serviços
							</RectangularButton>
						</Link>
					</CheckoutInfos>
				</Checkout>
			</Container>
		</Wrapper>
	);
};

ShoppingCart.getInitialProps = async () => {
	return {
		namespacesRequired: ['common', 'helper'],
	};
};

ShoppingCart.propTypes = {};

ShoppingCart.defaultProps = {};

const Wrapper = styled.form`
	${({ theme: { colors } }) => css`
		display: flex;
		justify-content: center;
		background-color: ${colors.lightGray4};
		padding: 0 5% 8rem;
	`}
`;

const Container = styled.div`
	${({ theme: { screens } }) => css`
		display: flex;
		flex-grow: 1;
		max-width: ${screens.large}px;
		margin: 0 auto;

		h2 {
			margin: 3.2rem 0;
		}

		@media screen and (max-width: ${screens.medium}px) {
			flex-direction: column;
		}
	`}
`;

const CartItemsWrapper = styled.div`
	height: 100%;

	> div:not(:last-child) {
		margin-bottom: 1.6rem;
	}
`;

const CartItems = styled.div`
	${({ theme: { screens } }) => css`
		flex-grow: 1;

		@media screen and (min-width: ${screens.medium + 1}px) {
			margin-right: 3.2rem;
		}
	`}
`;

const Checkout = styled.div``;

const CheckoutInfos = styled.div`
	${({ theme: { colors, metrics } }) => css`
		background-color: ${colors.white};
		border-radius: ${metrics.baseRadius}rem;
		padding 1.6rem;

		button {
			margin-bottom: 1.6rem;
		}
	`}
`;

const Total = styled.div`
	${({ theme: { colors, metrics } }) => css`
		background-color: ${colors.lightGray5};
		border-radius: ${metrics.baseRadius}rem;
		padding: 1.6rem 0.8rem;
		font-size: 1.6rem;
		line-height: 2.4rem;
		margin-bottom: 1.6rem;

		display: flex;
		align-items: center;
		justify-content: space-between;

		span:first-child {
			color: ${colors.lightGray2};
		}

		span:last-child {
			color: ${colors.black};
			font-weight: bold;
		}
	`}
`;

export default ShoppingCart;
