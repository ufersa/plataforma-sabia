import styled, { css } from 'styled-components';
import StyledButton from '../../../Button/styles';
import { StyledTextArea } from '../../../Form/TextField';

export const Container = styled.div``;

export const TextArea = styled(StyledTextArea)`
	${({ theme: { colors } }) => css`
		resize: none;
		height: 8rem;
		background: ${colors.lightGray4};
		border: none;
		border-radius: 0.5rem;
		font-size: 1.4rem;
		color: ${colors.black};
	`}
`;

export const RatingContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin: 2rem 0;

	p {
		margin-bottom: 1rem;
	}
`;

export const ButtonsContainer = styled.div`
	${({ theme: { screens } }) => css`
		display: flex;
		align-items: center;
		justify-content: flex-end;

		@media (max-width: ${screens.medium}px) {
			justify-content: center;
		}

		button {
			:first-child {
				margin-right: 1rem;
			}

			@media (max-width: ${screens.medium}px) {
				width: 100%;
			}
		}
	`}
`;

export const SubmitButton = styled(StyledButton).attrs(() => ({
	type: 'submit',
}))`
	${({ theme: { colors } }) => css`
		text-transform: uppercase;
		border-radius: 0;
		padding: 0.5rem !important;
		font-size: 1.6rem;
		background: ${colors.secondary};
		color: ${colors.white};
		font-weight: 600;
		border: 0.3rem solid ${colors.secondary};
	`}
`;

export const CloseButton = styled(StyledButton).attrs(() => ({
	type: 'button',
}))`
	${({ theme: { colors } }) => css`
		text-transform: uppercase;
		border-radius: 0;
		padding: 0.5rem !important;
		font-size: 1.6rem;
		background: ${colors.white};
		color: ${colors.red};
		font-weight: 600;
		border: 0.3rem solid ${colors.red};
	`}
`;
