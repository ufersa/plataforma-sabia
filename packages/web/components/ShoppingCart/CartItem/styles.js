import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
	${({ theme: { colors, metrics } }) => css`
		border-radius: ${metrics.baseRadius}rem;
		background-color: ${colors.white};
	`}
`;

export const UpperContent = styled.div`
	padding: 1.6rem 1.6rem 1.6rem;
`;

export const ItemDetails = styled.div`
	display: flex;
	flex-wrap: wrap;

	button {
		width: fit-content;
		align-self: flex-start;
	}

	> div:first-child {
		display: flex;
		flex-grow: 1;
		margin-bottom: 1.6rem;
	}
`;

export const ThumbnailWrapper = styled.div`
	${({ theme: { metrics } }) => css`
		max-width: 8rem;
		width: 100%;
		> div {
			border-radius: ${metrics.baseRadius}rem;
		}
	`}
`;

export const Infos = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	flex: 1;
	margin: 0 1.6rem;
`;

export const Title = styled.p`
	${({ theme: { colors } }) => css`
		font-size: 1.6rem;
		color: ${colors.black};
		line-height: 2.4rem;
		margin-bottom: 0.8rem;
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

export const Price = styled(Title)`
	font-size: 1.4rem;
	margin-bottom: 0;
`;

export const LowerContent = styled.div`
	${({ theme: { colors } }) => css`
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		border-top: 1px solid ${colors.lightGray4};
		padding: 1.2rem 1.6rem;

		> span {
			color: ${colors.silver};
			font-size: 1.6rem;
			line-height: 2.4rem;
		}
	`}
`;
