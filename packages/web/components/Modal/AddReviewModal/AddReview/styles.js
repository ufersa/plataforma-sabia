import styled, { css } from 'styled-components';
import StyledButton from '../../../Button/styles';

export const Container = styled.div``;

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

export const CloseButton = styled(StyledButton).attrs(() => ({
	type: 'button',
}))`
	${({ theme: { colors, screens } }) => css`
		text-transform: uppercase;
		border-radius: 0;
		padding: 0.5rem !important;
		font-size: 1.6rem;
		margin: 1rem;
		/* width: 100%; */
		background: ${colors.white};
		color: ${colors.red};
		font-weight: 600;
		border: 0.3rem solid ${colors.red};

		@media (max-width: ${screens.medium}px) {
			max-width: 50%;
		}
	`}
`;
