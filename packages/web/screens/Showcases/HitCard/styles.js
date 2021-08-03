import styled, { css } from 'styled-components';

export const Info = styled.div`
	${({ theme: { colors, metrics } }) => css`
		display: flex;
		margin-right: 1rem;

		img {
			border: 1px solid ${colors.lightGray4};
			margin-right: 1.6rem;
			width: 4.8rem;
			height: 4.8rem;
			object-fit: cover;
			border-radius: ${metrics.baseRadius}rem;
		}
	`}
`;

export const Container = styled.a`
	${({ theme: { screens } }) => css`
		padding: 2.4rem;
		display: flex;
		justify-content: space-between;
		font-weight: 500;
		transition: all 0.3s;

		:hover {
			transform: translateY(-0.4rem);
		}
		@media screen and (max-width: ${screens.small}px) {
			flex-direction: column;

			${Info} {
				margin-bottom: 1.4rem;
			}
		}
	`}
`;

export const Name = styled.div`
	${({ theme: { colors } }) => css`
		p {
			margin-bottom: 0.4rem;
		}

		span {
			font-size: 1.2rem;
			color: ${colors.lightGray2};
		}
	`}
`;

export const SolutionsCount = styled.div`
	${({ theme: { colors } }) => css`
		div {
			display: flex;
			align-items: center;

			svg {
				color: ${colors.secondary};
			}

			span {
				color: ${colors.secondary};
				margin-left: 1rem;
				font-size: 1.2rem;
				white-space: nowrap;
			}

			&:not(:last-child) {
				margin-bottom: 1.4rem;
			}
		}
	`}
`;
