import styled, { css } from 'styled-components';

export const Form = styled.form`
	${({ theme: { screens } }) => css`
		display: flex;
		flex-direction: column;
		height: 100%;

		@media screen and (min-width: ${screens.medium + 1}px) {
			max-width: 41.5rem;
		}
	`}
`;

export const StepTitle = styled.h3`
	${({ theme: { colors } }) => css`
		color: ${colors.black};
		font-weight: 500;
		margin-bottom: 0.8rem;
	`}
`;

export const StepSubtitle = styled.p`
	${({ theme: { colors } }) => css`
		color: ${colors.lightGray2};
		margin-bottom: 4rem;
	`}
`;

export const InputsWrapper = styled.div`
	> div:not(:last-child) {
		margin-bottom: 1.6rem;
	}
`;

export const Actions = styled.div`
	${({ theme: { screens, metrics }, justifyContent }) => css`
		display: flex;
		justify-content: space-between;
		flex-direction: row-reverse;
		margin: 2.4rem -3.2rem -3.2rem -3.2rem;
		padding-top: 1.6rem;

		> button,
		a {
			border-radius: 00;
		}

		> button + #back-button {
			display: none;
		}

		@media screen and (min-width: ${screens.medium - 1}px) {
			margin: 2.4rem 0 0;
			display: flex;
			justify-content: ${justifyContent || 'space-between'};

			> button,
			a {
				padding: 0.2rem 0.8rem;
				border-radius: ${metrics.baseRadius}rem;
			}

			> button + #back-button {
				display: inherit;
			}
		}
	`}
`;

export const StepInfo = styled.p`
	${({ theme: { colors } }) => css`
		color: ${colors.silver};
		margin-bottom: 2.4rem;
	`}
`;
