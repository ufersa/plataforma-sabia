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
	${({ theme: { colors, screens } }) => css`
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		padding-bottom: 1.8rem;
		border-bottom: 2px solid ${colors.lightGray2};

		@media screen and (max-width: ${screens.large}px) {
			flex-direction: column;
			align-items: flex-start;
		}
	`}
`;

export const Title = styled.h2`
	${({ theme: { colors, screens } }) => css`
		font-size: 3.6rem;
		color: ${colors.silver};

		@media screen and (max-width: ${screens.medium}px) {
			font-size: 3rem;
		}
	`}
`;

export const SortWrapper = styled.div`
	${({ theme: { colors } }) => css`
		display: flex;
		align-items: center;
		color: ${colors.silver};

		> span {
			text-transform: uppercase;
			font-weight: bold;
			font-size: 1.4rem;
			line-height: 2.4rem;
			margin-right: 0.8rem;
		}

		> svg {
			margin-right: 1rem;
		}
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
