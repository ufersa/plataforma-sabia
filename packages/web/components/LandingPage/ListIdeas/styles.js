import styled, { css } from 'styled-components';

export const Wrapper = styled.section`
	${({ theme: { colors } }) => css`
		background-color: ${colors.lightGray4};
	`}
`;

export const Container = styled.div`
	${({ theme: { screens } }) => css`
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		width: ${`${screens.large}px`};
		padding: 3.2rem 2.2rem;
		max-width: 100%;
		margin: 0 auto;

		@media (max-width: ${screens.large}px) {
			width: ${`${screens.medium}px`};
		}
	`}
`;

export const Top = styled.div`
	${({ theme: { colors } }) => css`
		display: flex;
		width: 100%;
		padding-bottom: 1.8rem;
		border-bottom: 2px solid ${colors.lightGray2};
	`}
`;

export const Title = styled.h2`
	${({ theme: { colors } }) => css`
		font-size: 3.6rem;
		color: ${colors.silver};
	`}
`;

export const Content = styled.div`
	margin-top: 3rem;
	display: grid;
	grid-template-columns: 1fr 1fr;
	column-gap: 3rem;
	row-gap: 3rem;
	align-items: start;
`;

export const Button = styled.button.attrs({
	type: 'button',
})`
	${({ theme: { colors } }) => css`
		color: ${colors.secondary};
		border: 0;
		margin-top: 6rem;
		font-size: 1.4rem;
		text-transform: uppercase;
		line-height: 171%;
		background: transparent;

		&:hover {
			color: ${colors.darkGreen};
		}
	`}
`;
