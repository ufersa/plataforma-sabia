import styled, { css } from 'styled-components';

export const Container = styled.section`
	display: flex;
	flex-flow: column wrap;
	align-items: center;
	justify-content: center;
	height: 100%;
`;

export const ImageWrapper = styled.div`
	> img {
		max-width: 100%;
	}
`;

export const Message = styled.p`
	${({ theme: { colors } }) => css`
		font-size: 1.6rem;
		font-weight: 500;
		line-height: 2.4rem;
		color: ${colors.lightGray2};
		text-align: center;
	`}
`;
