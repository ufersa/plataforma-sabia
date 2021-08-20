import styled, { css } from 'styled-components';

export const InputsWrapper = styled.div`
	${({ theme: { screens } }) => css`
		display: flex;
		flex-direction: column;
		gap: 1.6rem;
		margin-top: 5.6rem;
		max-width: 28rem;

		@media screen and (min-width: ${screens.medium + 1}px) {
			max-width: 32rem;
		}
	`}
`;

export const VerificationCodeWrapper = styled.div`
	${({ theme: { screens } }) => css`
		margin: 0 auto 0;
		width: fit-content;
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
