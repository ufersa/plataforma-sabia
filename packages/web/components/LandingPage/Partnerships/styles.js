import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
	${({ theme: { colors } }) => css`
		background-color: ${colors.lightGray4};
	`}
`;

export const Container = styled.section`
	${({ theme: { screens } }) => css`
		display: flex;
		flex-direction: column;
		align-items: center;
		width: ${`${screens.large}px`};
		max-width: 100%;
		margin: 0 auto;
		padding: 3.2rem 2.2rem 6.4rem 2.2rem;

		@media (max-width: ${screens.large}px) {
			padding: 3.2rem 2.2rem 8rem 2.2rem;
			width: ${`${screens.medium}px`};
		}
	`}
`;

export const Title = styled.h2`
	${({ theme: { colors } }) => css`
		color: ${colors.silver};
		font-size: 3.6rem;
		line-height: 100%;
		margin-bottom: 3.2rem;
	`}
`;

export const ImagesWrapper = styled.div`
	${({ theme: { screens } }) => css`
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;

		img {
			width: 27rem;
			max-width: 100%;

			@media (max-width: ${screens.large}px) {
				width: 20rem;
			}

			@media (max-width: ${screens.medium}px) {
				width: 29.4rem;

				& + img {
					margin-top: 3.2rem;
				}
			}
		}

		@media (max-width: ${screens.medium}px) {
			flex-direction: column;
		}
	`}
`;
