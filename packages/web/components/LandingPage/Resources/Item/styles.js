import styled, { css } from 'styled-components';
import { Link as NextLink } from '../../../Link';

export const Wrapper = styled.div`
	width: 100%;
`;

export const Container = styled.div`
	${({ theme: { colors } }) => css`
		background-color: ${colors.white};
		box-shadow: -0.8rem -0.8rem 0 0 ${colors.darkGray4};
		padding: 3.2rem;
		min-height: 55.4rem;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
	`}
`;

export const Image = styled.img`
	margin: 0 auto 2.4rem auto;
	max-width: 100%;
`;

export const Title = styled.h2`
	${({ theme: { colors } }) => css`
		color: ${colors.white};
		font-size: 3.6rem;
		line-height: 4.3rem;
		font-weight: 500;
		text-align: center;
		width: 70%;
		margin: 0 auto 1.6rem auto;
	`}
`;

export const Body = styled.div``;

export const Description = styled.p`
	${({ theme: { colors } }) => css`
		color: ${colors.black};
		font-size: 1.6rem;
		line-height: 2.4rem;
		font-weight: 500;
		margin-bottom: 2.4rem;
	`}
`;

export const Link = styled(NextLink)`
	${({ theme: { colors } }) => css`
		background-color: ${colors.secondary};
		color: ${colors.white};
		border: none;
		font-size: 1.4rem;
		font-weight: bold;
		line-height: 2.4rem;
		text-transform: uppercase;
		padding: 0.8rem;
		text-align: center;
		text-decoration: none;
		display: inline-block;
		width: 100%;
		box-shadow: 0 0.6rem 1.6rem 0 rgba(0, 0, 0, 0.15);

		:hover {
			opacity: 0.8;
		}
	`}
`;
