import styled, { css } from 'styled-components';

export const Form = styled.form`
	${({ theme: { screens } }) => css`
		display: flex;
		align-items: center;

		> div {
			width: 640px;
			max-width: 60%;
		}

		@media (max-width: ${screens.medium}px) {
			max-width: 100%;
			flex-direction: column;
			align-items: flex-start;

			> div {
				width: 100%;
				max-width: 100%;
			}
		}
	`}
`;

export const SubmitButton = styled.button`
	${({ theme: { colors, screens } }) => css`
		border: 0;
		text-transform: uppercase;
		padding: 0.6rem;
		background: ${colors.secondary};
		color: ${colors.white};
		font-size: 1.6rem;
		font-weight: 500;
		border-radius: 0;
		margin-left: 1.6rem;
		margin-top: 1rem;
		display: flex;
		align-items: center;
		justify-content: center;

		svg {
			margin-top: 0.3rem;
			margin-right: 0.5rem;
			width: 1.2rem;
		}

		&:hover {
			opacity: 0.8;
		}

		@media (max-width: ${screens.medium}px) {
			width: 100%;
			margin-left: 0;
		}
	`}
`;

export const LoadMoreButton = styled.button`
	${({ theme: { colors } }) => css`
		border: 0;
		text-transform: uppercase;
		background: transparent;
		color: ${colors.secondary};
		font-size: 1.4rem;
		font-weight: bold;
		line-height: 171%;
		margin-top: 3.2rem;

		&:hover {
			opacity: 0.8;
		}
	`}
`;

export const LastQuestionsTitle = styled.h2`
	${({ theme: { colors } }) => css`
		font-weight: 500;
		font-size: 2.4rem;
		line-height: 2.9rem;
		color: ${colors.black};
		margin-bottom: 2.8rem;
	`}
`;

export const LastQuestions = styled.div`
	margin-top: 3.2rem;
`;

export const NoQuestions = styled.p`
	margin-top: 3.2rem;
`;
