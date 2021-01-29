import styled, { css } from 'styled-components';

export const CommentTitle = styled.div`
	${({ theme: { colors } }) => css`
		display: flex;
		align-items: baseline;
		font-weight: 700;
		color: ${colors.black};

		> span {
			font-size: 1.4rem;
			font-weight: 500;
			margin-left: 0.5rem;
		}
	`}
`;

export const Comment = styled.div`
	${({ theme: { colors, metrics } }) => css`
		background-color: ${colors.lightGray4};
		border-radius: ${metrics.baseRadius}rem;
		padding: 0.8rem;
		display: flex;
		flex-direction: column;
		flex-basis: 100%;
	`}
`;

export const CommentContent = styled.div`
	${({ theme: { colors, metrics } }) => css`
		background-color: ${colors.white};
		border-radius: ${metrics.baseRadius}rem;
		margin-top: 0.8rem;
		padding: 0.8rem;
		height: 100%;

		> span {
			color: ${colors.lightGray2};
			font-size: 1.2rem;
		}
	`}
`;

export const CommentText = styled.div`
	${({ theme: { colors } }) => css`
		color: ${colors.black};
		font-size: 1.4rem;
		line-height: 2.4rem;
		margin-top: 0.8rem;

		ol,
		ul {
			padding-left: 1.4rem;
		}
	`}
`;
