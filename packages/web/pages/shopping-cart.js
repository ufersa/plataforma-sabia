import React from 'react';
import styled, { css } from 'styled-components';
import { useForm } from 'react-hook-form';

import { RectangularButton } from '../components/Button';
import { SectionTitle } from '../components/Common';
import { CartItem } from '../components/ShoppingCart';
import { TextField } from '../components/Form';

const shoppingCartMock = [
	{
		id: 1,
		name: 'Service One',
		user: {
			institution: {
				name: 'UFERSA',
			},
		},
		price: 90,
		measure_unit: 'hour',
	},
	{
		id: 2,
		name: 'Service Two',
		user: {
			institution: {
				name: 'UFERSA',
			},
		},
		price: 150,
		measure_unit: 'month',
	},

	{
		id: 3,
		name: 'Service Three',
		user: {
			institution: {
				name: 'UFERSA',
			},
		},
		price: 150,
		measure_unit: 'day',
	},
];

const ShoppingCart = () => {
	const form = useForm({ comments: '' });

	const handleSubmit = () => {};

	return (
		<Wrapper onSubmit={form.handleSubmit(handleSubmit)}>
			<Container>
				<CartItems>
					<SectionTitle align="left" color="black" noMargin noPadding>
						Meu carrinho
					</SectionTitle>

					<CartItemsWrapper>
						{shoppingCartMock.map(({ id, name, user: { institution }, price }) => (
							<CartItem
								key={id}
								title={name}
								institution={institution.name}
								price={price}
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
							<span>Total</span> <span>R$374,00</span>
						</Total>

						<TextField form={form} name="comments" variant="gray" label="Observações" />

						<RectangularButton
							variant="filled"
							colorVariant="orange"
							type="submit"
							fullWidth
						>
							Finalizar pedido
						</RectangularButton>
						<RectangularButton
							variant="outlined"
							colorVariant="blue"
							as="a"
							href="/search"
						>
							Escolher mais serviços
						</RectangularButton>
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
		background-color: ${colors.lightGray4};
	`}
`;

const Container = styled.div`
	display: flex;
	flex-grow: 1;

	h2 {
		margin: 3.2rem 0;
	}
`;

const CartItemsWrapper = styled.div`
	height: 100%;

	> div:not(:last-child) {
		margin-bottom: 1.6rem;
	}
`;

const CartItems = styled.div`
	flex-grow: 1;
	margin-right: 3.2rem;
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
