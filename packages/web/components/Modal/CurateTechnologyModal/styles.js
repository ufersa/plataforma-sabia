import styled, { css } from 'styled-components';

import { Tab } from '../../Tab';
import { Modal } from '../styles';

export const StyledTab = styled(Tab)`
	${({ selected, theme: { colors, metrics } }) => css`
		border: none;
		bottom: 0;

		font-weight: 700;
		font-size: 1.2rem;

		background-color: ${selected ? colors.white : colors.secondary};
		color: ${selected ? colors.secondary : colors.white};

		padding: 0.8rem;

		&:first-child {
			border-top-left-radius: ${metrics.baseRadius}rem;
		}
	`}
`;

export const StyledModal = styled(Modal)`
	padding: 0;
	margin: 2rem;
	@media (max-width: ${({ theme }) => theme.screens.medium}px) {
		padding: 0;
	}
`;

export const TabsHeader = styled.div`
	padding-right: 3rem;
`;

export const CloseButton = styled.button`
	${({ theme: { colors, metrics } }) => css`
		border: none;
		border-top-right-radius: ${metrics.baseRadius}rem;
		outline: none;

		background: ${colors.red};
		padding: 0 0.4rem;

		position: absolute;
		right: 0;
		top: 0;
		width: 3rem;
		height: 3.3rem;

		> svg {
			width: 100%;
			height: 100%;
			color: ${colors.white};
		}
	`}
`;

export const ReviewWrapper = styled.div`
	padding: 0 4.2rem;
`;

export const ReviewTitle = styled.div`
	${({ theme: { colors } }) => css`
		display: flex;
		align-items: baseline;

		> h3 {
			font-weight: 500;
			margin-right: 0.5rem;
		}

		> span {
			color: ${colors.lightGray2};
			font-size: 1.4rem;
			font-weight: 500;
		}
	`}
`;

export const ReviewInput = styled.textarea`
	${({ theme: { colors, metrics } }) => css`
		resize: none;
		width: 100%;
		border: none;
		border-radius: ${metrics.baseRadius}rem;
		background-color: ${colors.lightGray4};
		margin-top: 1.2rem;
		margin-bottom: 2.6rem;
		padding: 1.8rem 1.4rem;
	`}
`;

export const ReviewActions = styled.div`
	display: flex;
	justify-content: flex-end;
	flex-wrap: wrap;
	margin-bottom: 3.2rem;
`;

const buttonModifiers = {
	deny: (colors) => css`
		background: ${colors.white};
		border: 2px solid ${colors.red};
		color: ${colors.red};
	`,
	requestChanges: (colors) => css`
		background: ${colors.primary};
		border: 2px solid ${colors.primary};
		color: ${colors.white};
	`,
	approve: (colors) => css`
		background: ${colors.secondary};
		border: 2px solid ${colors.secondary};
		color: ${colors.white};
	`,
};

export const ReviewButton = styled.button.attrs({ type: 'submit ' })`
	${({ theme: { colors }, variant }) => css`
		border: none;
		background: none;
		font-size: 1.4rem;
		font-weight: bold;

		padding: 0.4rem 0.8rem;
		margin-top: 1rem;
		line-height: 2.4rem;
		text-transform: uppercase;

		&:disabled {
			opacity: 0.5;
			cursor: not-allowed;
		}

		&:not(:first-child) {
			margin-left: 1.6rem;
		}

		${buttonModifiers[variant](colors)}
	`}
`;

/** *
 * Shared between tabs
 ** */

export const Container = styled.div`
	${({ theme: { screens }, flexDirection }) => css`
		display: flex;
		flex-direction: ${flexDirection};
		padding: 3.2rem;
		max-width: 116.4rem;
		overflow: scroll;
		max-height: 50vh;

		@media screen and (max-width: ${screens.medium}px) {
			flex-direction: column;
		}
	`}
`;

export const ContentBox = styled.div`
	${({ theme: { colors, screens }, flexBasis }) => css`
		flex-basis: ${flexBasis || '50%'};

		:not(:first-child) {
			margin-left: 0.8rem;
			padding-left: 0.8rem;
			border-left: 1px solid ${colors.lightGray4};
		}

		> div:not(:first-child) {
			margin-top: 1.6rem;
		}

		@media screen and (max-width: ${screens.medium}px) {
			flex-basis: 100%;
		}
	`}
`;
