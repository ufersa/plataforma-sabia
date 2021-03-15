import styled, { css } from 'styled-components';

export const Container = styled.div`
	${({ theme: { colors } }) => css`
		background-color: ${colors.white};
		border-radius: 0.4rem;
		box-shadow: 0px 19px 16px -16px rgba(0, 0, 0, 0.25);
		padding: 2.4rem;

		> button:last-child {
			margin-top: 2rem;
		}
	`}
`;

export const Title = styled.p`
	${({ theme: { colors } }) => css`
		font-size: 1.6rem;
		line-height: 2.4rem;
		font-weight: 500;
		color: ${colors.black};
	`}
`;

export const Institution = styled.p`
	${({ theme: { colors } }) => css`
		color: ${colors.secondary};
		font-size: 0.8rem;
		font-weight: 700;
		line-height: 1.2rem;
		margin-bottom: 1.6rem;
	`}
`;

export const Description = styled.p`
	${({ theme: { colors } }) => css`
		margin-bottom: 1rem;
		font-weight: 500;
		font-size: 1.4rem;
		line-height: 2.4rem;
		color: ${colors.lightGray2};
	`}
`;

export const InfoText = styled.p`
	${({ theme: { colors } }) => css`
		color: ${colors.silver};
		font-size: 1.4rem;
		line-height: 2.4rem;
		margin-bottom: 0.4rem;
	`}
`;

export const PillWrapper = styled.div`
	margin: 0 -0.8rem 1.8rem;
`;

export const Pill = styled.span`
	${({ theme: { colors } }) => css`
		display: inline-block;
		padding: 0.2rem 0.4rem;
		border-radius: 1rem;
		border: 1px solid ${colors.primary};
		background-color: ${colors.lightOrange};
		color: ${colors.primary};
		font-weight: 500;
		font-size: 1.2rem;
		line-height: 133%;
		margin: 0 0.4rem 0.4rem;
	`}
`;
