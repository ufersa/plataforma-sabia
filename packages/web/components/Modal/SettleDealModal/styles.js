import styled, { css } from 'styled-components';
import { InputFieldWrapper, InputError } from '../../Form/styles';

export const InfosContainer = styled.div`
	${({ theme: { colors } }) => css`
		display: flex;
		flex-direction: column;

		> h3 {
			color: ${colors.secondary};
			font-size: 2.8rem;
			font-weight: 500;
			margin-bottom: 2rem;
			line-height: 3.3rem;
		}

		> span {
			color: ${colors.silver};
			font-size: 1.6rem;
			line-height: 2.4rem;
		}

		${InputFieldWrapper} {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			align-items: center;
			justify-content: space-between;

			margin-bottom: 1.2rem;
		}

		${InputError} {
			width: 0;
			flex-basis: 100%;
		}
	`}
`;

export const Modal = styled.form`
	${({ theme: { screens } }) => css`
		display: flex;
		max-width: 77rem;

		> div:first-child {
			max-width: 26rem;
		}

		@media screen and (max-width: ${screens.medium}px) {
			flex-direction: column;

			> div:first-child {
				display: none;
			}

			${InfosContainer} {
				margin-left: 0;
				margin-right: 0;
			}
		}
	`}
`;

export const Summary = styled.div`
	${({ theme: { colors } }) => css`
		display: flex;
		justify-content: space-between;
		border-top: 1px solid ${colors.lightGray4};
		margin-bottom: 1.2rem;
		padding-top: 0.8rem;

		font-size: 1.6rem;
		font-weight: 500;
		line-height: 2.4rem;

		> span:first-child {
			text-transform: uppercase;
			color: ${colors.lightGray3};
			margin-right: 1.2rem;
		}

		> span:last-child {
			color: ${colors.secondary};
			word-break: break-word;
		}
	`}
`;
