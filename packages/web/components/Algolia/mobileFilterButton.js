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
		box-shadow: 0 4px 22px 0 ${colors.darkOrange};
		left: 50%;
		min-height: 40px;
		min-width: 112px;
		position: fixed;
		bottom: 4rem;
		transform: translateX(-50%);
		cursor: pointer;

		svg {
			height: 14px;
			margin-right: 8px;
			width: 16px;
		}

		:hover {
			background-color: ${colors.darkOrange};
		}

		@media (max-width: ${screens.large}px) {
			display: flex;
		}
	`};
`;
