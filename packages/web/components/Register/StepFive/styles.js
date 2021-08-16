import styled, { css } from 'styled-components';

export const FinishContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-evenly;
	height: 100%;
	text-align: center;
`;

export const FinishTitle = styled.h3`
	${({ theme: { colors } }) => css`
		color: ${colors.secondary};
		max-width: 27.5rem;
		line-height: 3rem;
	`}
`;

export const FinishSubtitle = styled.p`
	${({ theme: { colors } }) => css`
		color: ${colors.silver};
		font-size: 1.6rem;
		line-height: 2.4rem;
	`}
`;
