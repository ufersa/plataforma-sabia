import styled, { css } from 'styled-components';
import { Loader } from '../Loading/styles';

export const Container = styled.form`
	${({ theme: { colors, metrics, screens } }) => css`
		padding-top: 3rem;
		height: 80vh;
		width: 100%;
		display: flex;

		> div:first-child {
			display: flex;
			flex-direction: column;
			background-color: ${colors.white};
			border-radius: ${metrics.baseRadius}rem;
			box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.15);
			flex-grow: 1;
		}

		@media screen and (max-width: ${screens.medium}px) {
			flex-direction: column;
			height: auto;

			> div:first-child {
				order: 2;
			}
		}
	`}
`;

export const ChatHeader = styled.div`
	${({ theme: { colors } }) => css`
		display: flex;
		justify-content: space-between;
		padding: 0.8rem;
		border-bottom: 1px solid ${colors.lightGray4};
	`}
`;

export const Spinner = styled(Loader).attrs({ height: '100%' })``;

export const MessagesWrapper = styled.div`
	height: 100%;
	overflow-y: scroll;
	padding: 3.2rem;
	padding-top: 1.2rem;
`;

export const MessageBlock = styled.div`
	${({ theme: { colors } }) => css`
		display: flex;
		flex-direction: column;

		> span {
			color: ${colors.lightGray2};
			font-size: 1.2rem;
			font-weight: 500;
			line-height: 1.6rem;
			margin-bottom: 2rem;
			text-align: center;
		}
	`}
`;

export const MessageContent = styled.div`
	${({ theme: { colors, metrics } }) => css`
		display: flex;
		flex-direction: column;

		> p {
			border-radius: ${metrics.baseRadius * 2}rem;
			border-top-left-radius: 0;
			background-color: ${colors.lightGray4};
			font-size: 1.4rem;
			font-weight: 500;
			line-height: 2.4rem;
			color: ${colors.black};
			padding: 0.8rem;
			margin: 0 0.8rem 0.8rem;
		}

		> span {
			color: ${colors.lightGray2};
			font-weight: 500;
			font-size: 1.2rem;
			line-height: 1.6rem;
			align-self: flex-end;
			margin-right: 0.8rem;
		}
	`}
`;

export const SingleMessage = styled.div`
	${({ theme: { colors, metrics }, ownMessage }) => css`
		display: flex;
		align-items: center;
		margin: 1.6rem 0;

		> img {
			border-radius: 50%;
			max-width: 3.2rem;
			align-self: flex-start;
		}

		${!!ownMessage &&
			css`
				align-self: flex-end;

				> img {
					order: 2;
				}

				${MessageContent} {
					> p {
						color: ${colors.white};
						background-color: ${colors.blue};
						border-top-left-radius: ${metrics.baseRadius * 2}rem;
						border-top-right-radius: 0;
					}

					> span {
						margin-left: 0.8rem;
						align-self: flex-start;
					}
				}
			`}
	`}
`;

export const Button = styled.button`
	${({ theme: { colors }, variant, margin }) => css`
		border: none;
		outline: none;
		background: none;
		white-space: nowrap;

		display: flex;
		align-items: center;
		align-self: center;
		color: ${colors.secondary};
		padding: 0.4rem 0.8rem;
		max-width: max-content;

		text-transform: uppercase;
		font-weight: bold;
		font-size: 1.4rem;
		line-height: 2.4rem;

		margin: ${margin};

		:hover:not(:disabled) {
			color: ${colors.white};
			background: ${colors.secondary};
		}

		:disabled {
			cursor: not-allowed;
			opacity: 0.5;
		}

		:focus {
			box-shadow: 0px 0px 4px 2px ${colors.primary};
		}

		${variant === 'contained' &&
			css`
				background: ${colors.secondary};
				color: ${colors.white};
				margin-top: 0.6rem;
				align-self: flex-start;

				:hover:not(:disabled) {
					opacity: 0.8;
				}
			`}
	`}
`;

export const OrderDetails = styled.div`
	${({ theme: { screens } }) => css`
		padding: 2.4rem 3.2rem 1.4rem;

		@media screen and (max-width: ${screens.medium}px) {
			padding: 2.4rem 0 1.4rem;
		}
	`}
`;

export const UserDetails = styled.div`
	${({ theme: { colors } }) => css`
		display: flex;
		align-items: center;

		> img {
			border-radius: 50%;
			border: 2px solid ${colors.secondary};
			max-width: 4.8rem;
		}

		> div {
			font-size: 1.4rem;
			font-weight: 500;
			line-height: 2.4rem;
			margin-left: 1.6rem;

			p:first-child {
				color: ${colors.lightGray2};
			}

			p:last-child {
				color: ${colors.black};
			}
		}
	`}
`;

export const Solution = styled.div`
	${({ theme: { metrics, colors } }) => css`
		margin-top: 6.4rem;

		> p:first-child {
			color: ${colors.lightGray2};
			margin-bottom: 1.6rem;
			font-size: 1.4rem;
			line-height: 2.4rem;
			font-weight: 500;
		}

		> div {
			display: flex;
			flex-wrap: wrap;

			> img {
				max-width: 14rem;
				border-radius: ${metrics.baseRadius}rem;
				margin-right: 1.6rem;
				margin-bottom: 1rem;
			}
		}
	`}
`;

export const SolutionDetails = styled.div`
	${({ theme: { colors } }) => css`
		> p:first-child {
			color: ${colors.black};
			font-size: 1.6rem;
			font-weight: 500;
			line-height: 2.4rem;
			margin-bottom: 0.8rem;
		}

		> p:nth-of-type(2),
		> p:last-of-type {
			color: ${colors.lightGray2};
			font-size: 1.2rem;
			font-weight: 500;
			line-height: 1.6rem;
			margin-bottom: 0.4rem;
		}
	`}
`;

export const Actions = styled.div`
	display: flex;
	padding: 1.6rem;

	> div {
		width: 100%;
		margin-right: 1.6rem;
	}
`;
