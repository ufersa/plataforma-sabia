import styled, { css } from 'styled-components';

export const VerificationCodeWrapper = styled.div`
	${({ theme: { screens } }) => css`
		margin: 5.6rem auto 0;
		width: fit-content;
		> div {
			gap: 0.8rem;
			justify-content: center;
		}

		@media screen and (min-width: ${screens.medium + 1}px) {
			margin: 5.6rem 0 0;
			> div {
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
