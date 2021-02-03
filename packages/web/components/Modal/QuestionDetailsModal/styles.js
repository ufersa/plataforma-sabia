import styled, { css } from 'styled-components';

export const QuestionWrapper = styled.div`
	${({ theme: { colors } }) => css`
		display: flex;
		flex-direction: column;
		border-left: 0.2rem solid ${colors.secondary};
		padding-left: 0.8rem;
		margin-bottom: 3.2rem;
	`}
`;

export const Info = styled.span`
	${({ theme: { colors }, color }) => css`
		color: ${colors[color] || colors.black};
		font-weight: 500;
		font-size: 1.2rem;
		line-height: 133%;
	`}
`;

export const QuestionText = styled.p`
	${({ theme: { colors } }) => css`
		color: ${colors.black};
		margin-top: 0.4rem;
		margin-bottom: 0.8rem;
		font-weight: 500;
		font-size: 1.6rem;
		line-height: 150%;
	`}
`;

export const Modal = styled.div`
	${({ theme: { colors, screens } }) => css`
		display: flex;
		flex-direction: column;
		width: 76rem;

		input {
			opacity: 1;

			:disabled {
				color: ${colors.silver};
			}
		}

		@media screen and (max-width: ${screens.large}px) {
			width: auto;
		}
	`}
`;

export const Actions = styled.div`
	${({ theme: { screens } }) => css`
		margin-top: 1rem;
		display: flex;
		justify-content: center;
		align-items: center;

		button {
			margin-top: 2.2rem;
			margin-left: 2.2rem;
		}

		@media screen and (max-width: ${screens.medium}px) {
			flex-direction: column;
		}
	`}
`;

export const Title = styled.h3`
	${({ theme: { colors } }) => css`
		color: ${colors.secondary};
		font-size: 2.8rem;
		font-weight: 500;
		margin-bottom: 2rem;
		line-height: 3.3rem;
		text-align: center;
	`}
`;
