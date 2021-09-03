import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
	${({ theme: { screens } }) => css`
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		flex-grow: 1;

		@media screen and (max-width: ${screens.xmedium}px) {
			padding-top: 3.2rem;
			justify-content: flex-start;
		}
	`}
`;

export const Form = styled.form`
	max-width: 33rem;
`;

export const StepTitle = styled.h3`
	line-height: 2.8rem;
	margin-bottom: 0.8rem;
`;

export const StepSubtitle = styled.p`
	${({ theme: { colors }, smallFontSize }) => css`
		color: ${colors.silver};
		margin-bottom: 4rem;
		font-size: ${smallFontSize ? '1.4rem' : '1.6rem'};
		line-height: 2.4rem;
	`}
`;

export const InputsWrapper = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 3.2rem;
	gap: 1.6rem;
`;

export const Actions = styled.div`
	display: flex;
	flex-direction: column;
	gap: 3.2rem;
`;

export const VerificationCodeWrapper = styled.div`
	${({ theme: { screens } }) => css`
		margin: 0 auto 0;
		width: fit-content;
		align-self: center;
		> div > div {
			gap: 0.8rem;
			justify-content: center;
		}

		@media screen and (min-width: ${screens.medium + 1}px) {
			margin: 0;
			> div > div {
				gap: 1.6rem;
			}
		}
	`}
`;

export const ResendEmailLink = styled.div`
	margin-top: 0.4rem;

	button {
		width: fit-content;
		margin-left: auto;
		font-size: 1.2rem;
		font-weight: 500;
	}
`;

export const PasswordWrapper = styled.div`
	position: relative;
`;
