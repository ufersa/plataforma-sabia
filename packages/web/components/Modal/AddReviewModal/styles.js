import styled, { css } from 'styled-components';
import StyledButton from '../../Button/styles';

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin: 2rem;
`;

export const Question = styled.h3`
	${({ theme: { colors } }) => css`
		font-size: 2.8rem;
		color: ${colors.black};
	`}
`;

export const ButtonsContainer = styled.div`
	${({ theme: { screens } }) => css`
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		margin-top: 1rem;

		@media (max-width: ${screens.medium}px) {
			flex-direction: column;
		}
	`}
`;

const switchType = (type, colors) => {
	switch (type) {
		case 'negative':
			return css`
				background: ${colors.white};
				color: ${colors.red};
				font-weight: 600;
				border: 0.3rem solid ${colors.red};
			`;
		case 'positive':
		default:
			return css`
				background: ${colors.secondary};
				color: ${colors.white};
				font-weight: 600;
				border: 0.3rem solid ${colors.secondary};
			`;
	}
};

export const Button = styled(StyledButton).attrs(() => ({
	type: 'button',
}))`
	${({ type, theme: { colors, screens } }) => css`
		text-transform: uppercase;
		border-radius: 0;
		padding: 0.5rem !important;
		font-size: 1.6rem;
		margin: 1rem;
		width: 100%;

		@media (max-width: ${screens.medium}px) {
			max-width: 50%;
		}

		${switchType(type, colors)}
	`}
`;
