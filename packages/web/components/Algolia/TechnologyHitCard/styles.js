import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
	${({ theme: { colors, metrics } }) => css`
		border-radius: ${metrics.baseRadius}rem;
		background-color: ${colors.white};
		font-weight: initial;
		transition: all 0.3s ease 0s;

		&:hover {
			transform: translateY(-0.7rem);
		}
	`}
`;

export const UpperContent = styled.div`
	padding: 1.6rem 1.6rem 1.6rem;
`;

export const ItemDetails = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;

	button {
		width: fit-content;
		align-self: flex-start;
	}

	> div:first-child {
		display: flex;
		align-items: center;
		flex-grow: 1;
		max-width: 80%;
	}
`;

export const ThumbnailWrapper = styled.div`
	${({ theme: { metrics } }) => css`
		max-width: 10.5rem;
		width: 100%;
		> div {
			border-radius: ${metrics.baseRadius}rem;
		}
	`}
`;

export const Infos = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1;
	margin: 0 1.6rem;
`;

export const Title = styled.p`
	${({ theme: { colors } }) => css`
		font-size: 2.4rem;
		line-height: 3rem;
		color: ${colors.black};
		margin-bottom: 0.8rem;
	`}
`;

export const Description = styled.p`
	${({ theme: { colors } }) => css`
		color: ${colors.lightGray2};
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	`}
`;

export const Institution = styled.span`
	${({ theme: { colors } }) => css`
		font-size: 1.2rem;
		color: ${colors.lightGray2};
		line-height: 1.6rem;
		margin-bottom: 0.8rem;
	`}
`;

export const LikesWrapper = styled.div``;
