import React from 'react';
import styled, { css } from 'styled-components';
import { SectionTitle } from '../components/Common';
import { CartItem } from '../components/ShoppingCart';

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
];

const ShoppingCart = () => {
	return (
		<Wrapper>
			<Container>
				<SectionTitle align="left" color="black" noMargin noPadding>
					Meu carrinho
				</SectionTitle>

				{shoppingCartMock.map(({ id, name, user: { institution }, price }) => (
					<CartItem key={id} title={name} institution={institution.name} price={price} />
				))}
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

const Wrapper = styled.section`
	${({ theme: { colors } }) => css`
		display: flex;
		background-color: ${colors.lightGray4};
	`}
`;

const Container = styled.div`
	flex-grow: 1;
	h2 {
		margin: 3.2rem 0;
	}
`;

export default ShoppingCart;
