import React from 'react';
import Link from 'next/link';
import { FiShoppingCart } from 'react-icons/fi';

import styled, { css } from 'styled-components';
import { useShoppingCart } from '../../hooks';

const ShoppingCart = () => {
	const { items } = useShoppingCart();

	return (
		<LoginBox>
			<Link href="/shopping-cart" passHref>
				<Button as="a">
					<IconWrapper>
						<FiShoppingCart fontSize={24} />
						{!!items.length && <Badge count={items.length} />}
					</IconWrapper>
					<span>Carrinho</span>
				</Button>
			</Link>
		</LoginBox>
	);
};

const LoginBox = styled.div`
	height: 100%;
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
	${({ theme: { colors }, count }) => css`
		color: ${colors.white};
		position: absolute;
		top: -1rem;
		right: -1rem;

		&:before {
      font-size: 0.8rem;
      line-height: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
			content: '${count}';
      padding: 0.4rem 0.75rem;
			border: 1px solid ${colors.white};
			border-radius: 10px;
			background-color: ${colors.primary};
		}
	`}
`;

export default ShoppingCart;
