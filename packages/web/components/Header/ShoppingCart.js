import React from 'react';
import Link from 'next/link';
import { FiShoppingCart } from 'react-icons/fi';

import styled, { css } from 'styled-components';
import { internal as internalPages } from '../../utils/enums/pages.enum';
import { useShoppingCart } from '../../hooks';

const ShoppingCart = () => {
	const { items } = useShoppingCart();

	return (
		<Container>
			<Link href={internalPages.shoppingCart} passHref>
				<Button as="a">
					<IconWrapper>
						<FiShoppingCart fontSize={24} />
						{!!items.length && <Badge>{items.length}</Badge>}
					</IconWrapper>
					<span>Carrinho</span>
				</Button>
			</Link>
		</Container>
	);
};

const Container = styled.div`
	${({ theme: { screens } }) => css`
		height: 100%;

		@media screen and (max-width: ${screens.medium}px) {
			display: none;
		}
	`}
`;

const Button = styled.button`
	${({ theme: { colors, sizes, screens } }) => css`
		display: flex;
		align-items: center;
		justify-content: center;
		color: ${colors.secondary};
		background: none;
		border: 0;
		font-size: 1.2rem;
		font-weight: 700;
		text-transform: uppercase;
		height: 100%;
		min-width: 8rem;
		padding: 0 2rem;
		transition: color 0.3s;
		cursor: pointer;

		span {
			margin-left: 13px;
		}

		:hover {
			color: ${colors.darkGreen};
		}

		@media (max-width: ${screens.medium}px) {
			a {
				font-size: 1rem;
			}

			svg {
				height: ${sizes.defaultIcon}rem;
				width: ${sizes.defaultIcon}rem;
			}
		}
	`}
`;

const IconWrapper = styled.div`
	position: relative;
`;

const Badge = styled.div`
	${({ theme: { colors } }) => css`
		display: flex;
		align-items: center;
		justify-content: center;

		font-size: 0.8rem;
		color: ${colors.white};
		background-color: ${colors.primary};
		position: absolute;
		top: -1rem;
		right: -1rem;

		border-radius: 10px;
		border: 1px solid ${colors.white};
		min-width: 2rem;
		height: 2rem;
		padding: 0 6px;
	`}
`;

export default ShoppingCart;
