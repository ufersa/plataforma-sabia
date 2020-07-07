import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const MobileFilterButton = ({ onClick, children }) => (
	<Button onClick={onClick} type="button">
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 14">
			<path
				d="M15 1H1l5.6 6.3v4.37L9.4 13V7.3z"
				stroke="#fff"
				strokeWidth="1.29"
				fill="none"
				fillRule="evenodd"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
		{children}
	</Button>
);

MobileFilterButton.propTypes = {
	onClick: PropTypes.func.isRequired,
	children: PropTypes.string.isRequired,
};

export default MobileFilterButton;

const Button = styled.button`
	${({ theme: { colors, metrics, screens } }) => css`
		display: none;
		align-items: center;
		justify-content: center;
		background-color: ${colors.primary};
		color: ${colors.white};
		font-weight: bold;
		border: none;
		border-radius: ${metrics.baseRadius}rem;
		box-shadow: 0 0.4rem 2.2rem 0 ${colors.darkOrange};
		min-height: 4rem;
		min-width: 11rem;
		position: fixed;
		bottom: 4rem;
		left: 50%;
		transform: translateX(-50%);
		cursor: pointer;

		svg {
			height: 1.4rem;
			width: 1.4rem;
			margin-right: 0.8rem;
		}

		:hover {
			background-color: ${colors.darkOrange};
		}

		@media (max-width: ${screens.large}px) {
			display: flex;
		}
	`};
`;
