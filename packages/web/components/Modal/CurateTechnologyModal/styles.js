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
	max-height: 100%;
	overflow: scroll;
	@media (max-width: ${({ theme }) => theme.screens.medium}px) {
		padding: 0;
	}
`;

export const TabsHeader = styled.div`
	${({ theme: { colors } }) => css`
		padding-right: 3rem;
		position: sticky;
		top: 0;
		background-color: ${colors.white};
		z-index: 1;
	`}
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

export const CommentTitle = styled.div`
	${({ theme: { colors } }) => css`
		display: flex;
		align-items: baseline;
		font-weight: 700;
		color: ${colors.black};

		> span {
			font-size: 1.4rem;
			font-weight: 500;
			margin-left: 0.5rem;
		}
	`}
`;

export const ReviewInput = styled.textarea`
	${({ theme: { colors, metrics } }) => css`
		resize: none;
		width: 100%;
		border: none;
		border-radius: ${metrics.baseRadius}rem;
		background-color: ${colors.white};
		margin-top: 0.8rem;
		padding: 1.2rem;
		height: 100%;
	`}
`;

export const ReviewActions = styled.div`
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
	margin-bottom: 3.2rem;
	padding: 0 3.2rem;

	> div:last-child {
		margin-top: 3.2rem;
		width: 100%;
		display: flex;
		justify-content: flex-end;
		flex-wrap: wrap;
	}
`;

export const CommentsWrapper = styled.div`
	${({ theme: { screens }, singleColumn }) => css`
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-gap: 1.6rem;
		@media screen and (max-width: ${screens.medium}px) {
			grid-template-columns: 1fr;
		}

		${singleColumn &&
			css`
				grid-template-columns: 1fr;
			`}
	`}
`;

export const Comment = styled.div`
	${({ theme: { colors, metrics } }) => css`
		background-color: ${colors.lightGray4};
		border-radius: ${metrics.baseRadius}rem;
		padding: 0.8rem;
		display: flex;
		flex-direction: column;
		flex-basis: 100%;
	`}
`;

export const CommentContent = styled.div`
	${({ theme: { colors, metrics } }) => css`
		background-color: ${colors.white};
		border-radius: ${metrics.baseRadius}rem;
		margin-top: 0.8rem;
		padding: 0.8rem;
		height: 100%;

		> span {
			color: ${colors.lightGray2};
			font-size: 1.2rem;
		}

		> p {
			color: ${colors.black};
			font-size: 1.4rem;
			line-height: 2.4rem;
			margin-top: 0.8rem;
		}
	`}
`;

const buttonModifiers = {
	deny: (colors) => css`
		background: none;
		border: 2px solid ${colors.red};
		color: ${colors.red};

		:hover:not(:disabled),
		:focus:not(:disabled) {
			background-color: ${colors.red};
			color: ${colors.white};
		}
	`,
	requestChanges: (colors) => css`
		background: ${colors.primary};
		border: 2px solid ${colors.primary};
		color: ${colors.white};

		:hover:not(:disabled),
		:focus:not(:disabled) {
			background-color: ${colors.darkOrange};
			border: 2px solid ${colors.darkOrange};
		}
	`,
	approve: (colors) => css`
		background: ${colors.secondary};
		border: 2px solid ${colors.secondary};
		color: ${colors.white};

		:hover,
		:focus {
			background-color: ${colors.darkGreen};
			border: 2px solid ${colors.darkGreen};
		}
	`,
};

export const ReviewButton = styled.button.attrs({ type: 'submit ' })`
	${({ theme: { colors, screens }, variant }) => css`
		border: none;
		background: none;
		font-size: 1.4rem;
		font-weight: bold;
		width: 100%;

		padding: 0.4rem 0.8rem;
		margin-top: 1rem;
		line-height: 2.4rem;
		text-transform: uppercase;

		&:disabled {
			opacity: 0.5;
			cursor: not-allowed;
		}

		@media screen and (min-width: ${screens.medium}px) {
			width: auto;
			&:not(:first-child) {
				margin-left: 1.6rem;
			}
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

		@media screen and (max-width: ${screens.medium}px) {
			flex-direction: column;
		}
	`}
`;

export const ContentBox = styled.div`
	${({ theme: { colors, screens }, flexBasis }) => css`
		flex-basis: ${flexBasis || '50%'};

		> div:not(:first-child) {
			margin-top: 1.6rem;
		}

		@media screen and (max-width: ${screens.medium}px) {
			flex-basis: 100%;

			:last-child > div:first-child {
				margin-top: 1.6rem;
			}
		}

		@media screen and (min-width: ${screens.medium}px) {
			:not(:first-child) {
				margin-left: 0.8rem;
				padding-left: 0.8rem;
				border-left: 1px solid ${colors.lightGray4};
			}
		}
	`}
`;
