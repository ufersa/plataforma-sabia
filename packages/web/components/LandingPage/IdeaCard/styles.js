import styled, { css } from 'styled-components';

export const Container = styled.div`
	${({ theme: { colors } }) => css`
		background-color: ${colors.white};
		border-radius: 0.4rem;
		box-shadow: 0px 19px 16px -16px rgba(0, 0, 0, 0.25);
		padding: 2.4rem;
	`}
`;

export const Title = styled.h3`
	${({ theme: { colors } }) => css`
		font-size: 2.8rem;
		line-height: 3.3rem;
		font-weight: 500;
		color: ${colors.black};
		margin-bottom: 1.6rem;
	`}
`;

export const Description = styled.p`
	${({ theme: { colors } }) => css`
		margin-bottom: 1rem;
		font-weight: 500;
		font-size: 1.4rem;
		line-height: 171%;
		color: ${colors.lightGray2};
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

export const IconsWrapper = styled.div`
	border: 1px solid red;
	width: 100%;
`;

export const Button = styled.button.attrs({
	type: 'button',
})`
	${({ theme: { colors } }) => css`
		border: 0;
		background: transparent;
		display: block;
		margin: 0 auto;
		color: ${colors.secondary};
		text-transform: uppercase;
		font-size: 1.4rem;
		font-weight: 171%;

		&:hover {
			color: ${colors.darkGreen};
		}

		&:disabled {
			color: ${colors.lightGray3};
			cursor: not-allowed;
		}
	`}
`;
