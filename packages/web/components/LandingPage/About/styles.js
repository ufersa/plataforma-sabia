import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
	${({ theme: { colors } }) => css`
		position: relative;
		background-color: ${colors.secondary};
	`}
`;

export const TopImage = styled.img`
	position: absolute;
	top: 0;
	right: 0;
`;

export const Container = styled.section`
	${({ theme: { screens } }) => css`
		display: flex;
		align-items: center;
		width: ${`${screens.large}px`};
		max-width: 100%;
		margin: 0 auto;
		padding: 6.4rem 2.2rem 4.8rem 2.2rem;

		@media (max-width: ${screens.large}px) {
			padding: 6.4rem 2.2rem 4.6rem 2.2rem;
			width: ${`${screens.medium}px`};
		}
	`}
`;

export const TextContainer = styled.div`
	${({ theme: { screens } }) => css`
		margin-right: 3rem;

		@media (max-width: ${screens.large}px) {
			margin-right: 0;
		}
	`}
`;

export const Title = styled.h2`
	${({ theme: { colors } }) => css`
		color: ${colors.white};
		font-size: 3.6rem;
		line-height: 100%;
		margin-bottom: 2.4rem;
	`}
`;

export const TextContent = styled.p`
	${({ theme: { colors } }) => css`
		color: ${colors.white};
		font-size: 1.6rem;
		line-height: 150%;
		margin-bottom: 1.8rem;
		font-weight: 500;
	`}
`;

export const LogosContainer = styled.div`
	${({ theme: { screens } }) => css`
		img {
			display: block;
			width: 37rem;

			& + img {
				margin-top: 8rem;
			}
		}

		@media (max-width: ${screens.large}px) {
			padding: 21.7rem 2.2rem;
			width: ${`${screens.medium}px`};

			display: none;
		}
	`}
`;
