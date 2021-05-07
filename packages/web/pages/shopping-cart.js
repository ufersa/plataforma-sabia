/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';
import { FiAlertTriangle } from 'react-icons/fi';
import { RectangularButton } from '../components/Button';
import EmptyScreen from '../components/EmptyScreen';
import { SectionTitle } from '../components/Common';
import { CartItem } from '../components/ShoppingCart';
import { TextField } from '../components/Form';
import { useAuth, useModal, useShoppingCart } from '../hooks';
import { formatMoney, getMeasureUnitLabel } from '../utils/helper';
import { createServiceOrder } from '../services';
import { toast } from '../components/Toast';
import Head from '../components/head';

const getItemChangeLabel = (value) =>
	({
		nameChanged: 'teve o nome alterado',
		institutionChanged: 'teve a instituição alterada',
		priceChanged: 'teve o preço alterado',
		measureUnitChanged: 'teve a unidade de medida alterada',
	}[value]);

const getItemChangeContent = (key, value) =>
	({
		nameChanged: value,
		institutionChanged: value,
		priceChanged: formatMoney(value),
		measureUnitChanged: getMeasureUnitLabel(value),
	}[key]);

const ShoppingCart = () => {
	const { t } = useTranslation(['common', 'pages']);
	const form = useForm({ comment: '' });
	const {
		items,
		totalPrice,
		updateItem,
		removeItem,
		resetCart,
		checkForItemsUpdates,
	} = useShoppingCart();
	const { openModal } = useModal();
	const { user } = useAuth();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [cartItemsUpdates, setCartItemsUpdates] = useState([]);

	const handleSubmit = async (values) => {
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

		setIsSubmitting(true);

		const itemsUpdates = await checkForItemsUpdates();

		if (itemsUpdates.length) {
			setIsSubmitting(false);
			setCartItemsUpdates(itemsUpdates);

			return toast.info(
				'Houve alterações nos itens do seu carrinho. Por favor verifique o card informativo e refaça a operação caso esteja de acordo.',
			);
		}

		const result = await createServiceOrder(
			items.map((item) => ({ service_id: item.id, quantity: item.quantity })),
			values.comment,
		);

		if (!result) {
			return toast.error(
				'Ocorreu um erro ao finalizar seu pedido. Tente novamente em instantes.',
			);
		}

		toast.success('Pedido enviado com sucesso!');
		resetCart();
		return setIsSubmitting(false);
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
		<>
			<Head title={t('pages:shoppingCart.title')} noIndex />
			<Wrapper onSubmit={form.handleSubmit(handleSubmit)}>
				<Container>
					<CartItems>
						<SectionTitle align="left" color="black" noMargin noPadding>
							Meu carrinho
						</SectionTitle>

						<CartItemsWrapper>
							{!!cartItemsUpdates.length && (
								<ChangesWrapper>
									<ChangesHeader>
										<FiAlertTriangle fontSize={24} />
										<p>Mensagem importante sobre o seu carrinho</p>
									</ChangesHeader>
									<ChangesBody>
										<p>
											Houve {cartItemsUpdates.length}{' '}
											{cartItemsUpdates.length > 1
												? 'alterações'
												: 'alteração'}{' '}
											nos itens do seu carrinho:
										</p>
										<ChangesList>
											{cartItemsUpdates.map((item) => {
												if (item.type === 'deleted') {
													return (
														<li
															key={`${item.id}-${item.from}-${item.to}`}
														>
															<span>{item.name} </span>
															<span>
																foi excluído pois não está mais
																disponível
															</span>
														</li>
													);
												}

												return (
													<li key={`${item.id}-${item.from}-${item.to}`}>
														<span>{item.name} </span>
														<span>
															{getItemChangeLabel(item.type)}{' '}
														</span>

														<span>
															de{' '}
															<strong>
																{getItemChangeContent(
																	item.type,
																	item.from,
																)}{' '}
															</strong>
														</span>

														<span>
															para{' '}
															<strong>
																{getItemChangeContent(
																	item.type,
																	item.to,
																)}{' '}
															</strong>
														</span>
													</li>
												);
											})}
										</ChangesList>
									</ChangesBody>
								</ChangesWrapper>
							)}
							{items.map((item) => (
								<CartItem
									{...item}
									key={`${item.id}-${item.type}`}
									form={form}
									onRemoveFromCart={() =>
										removeItem({ id: item.id, type: item.type })
									}
									onUpdateItem={(newValues) =>
										updateItem({ ...item, ...newValues })
									}
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
								name="comment"
								variant="gray"
								label="Observações"
								placeholder="Digite suas observações"
								resize="none"
							/>

							<RectangularButton
								variant="filled"
								colorVariant="orange"
								type="submit"
								disabled={isSubmitting}
								fullWidth
							>
								Finalizar pedido
							</RectangularButton>
							<Link href="/search?solution=services" passHref>
								<RectangularButton
									variant="outlined"
									colorVariant="blue"
									as="a"
									disabled={isSubmitting}
									fullWidth
								>
									Escolher mais serviços
								</RectangularButton>
							</Link>
						</CheckoutInfos>
					</Checkout>
				</Container>
			</Wrapper>
		</>
	);
};

ShoppingCart.getInitialProps = async () => {
	return {
		namespacesRequired: ['common', 'helper', 'pages'],
	};
};

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

const ChangesWrapper = styled.div`
	${({ theme: { colors, metrics } }) => css`
		position: relative;

		border: 1px solid ${colors.primary};
		border-radius: ${metrics.baseRadius}rem;

		padding: 0.8rem;

		&:before {
			content: '';
			display: block;
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			pointer-events: none;
			background-color: ${colors.primary};
			opacity: 0.1;
		}
	`}
`;

const ChangesHeader = styled.div`
	${({ theme: { colors } }) => css`
		display: flex;
		align-items: center;
		color: ${colors.primary};
		margin-bottom: 0.8rem;
		font-weight: bold;
		line-height: 2.4rem;

		svg {
			margin-right: 0.8rem;
		}
	`}
`;

const ChangesBody = styled.div`
	${({ theme: { colors } }) => css`
		font-size: 1.2rem;
		line-height: 1.6rem;

		p {
			color: ${colors.black};
			font-weight: bold;
		}
	`}
`;

const ChangesList = styled.ul`
	${({ theme: { colors } }) => css`
		margin-top: 0.8rem;
		color: ${colors.black};

		li {
			&:not(:last-child) {
				margin-bottom: 0.4rem;
			}
			> span:first-child {
				font-weight: bold;
			}
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
