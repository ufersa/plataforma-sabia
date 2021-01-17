import styled, { css } from 'styled-components';

export const Container = styled.section`
	${({ theme: { colors } }) => css`
		background-color: ${colors.white};
		border-radius: 5px;
		width: 100%;
		max-width: 51.2rem;

		label {
			font-size: 1.6rem;
		}

		button {
			margin-top: 2rem;
		}

		h3 {
			font-size: 28px;
			font-style: normal;
			font-weight: 500;
			line-height: 33px;
			text-align: center;
			color: ${colors.secondary};
			margin-top: 2.8rem;
		}
	`}
`;

const buttonModifiers = {
	outlined: (colors) => css`
		background: none;
		color: ${colors.red};
		border: 2px solid ${colors.red};
		padding: 0.2rem 0.6rem;

		:hover,
		:focus {
			color: ${colors.white};
			background-color: ${colors.red};
		}
	`,
	contained: (colors) => css`
		background: ${colors.secondary};
		color: ${colors.white};
		padding: 0.4rem 0.8rem;

		:hover,
		:focus {
			background: ${colors.darkGreen};
		}
	`,
};

export const Button = styled.button`
	${({ theme: { colors }, variant = 'contained' }) => css`
		display: flex;
		align-items: center;
		align-self: center;
		border: none;
		outline: none;

		text-transform: uppercase;
		font-weight: bold;
		font-size: 1.4rem;
		line-height: 2.4rem;

		> svg {
			margin-right: 0.4rem;
		}

		:disabled {
			pointer-events: none;
			opacity: 0.5;
		}

		${buttonModifiers[variant](colors)};
	`}
`;

export const Suggestion = styled.div`
	margin: 0.5rem 0;
	padding: 1rem;
	width: 100%;
	font-size: 1.4rem;
	cursor: pointer;
`;

export const GoogleAddressSugestions = styled.div`
	display: flex;
	flex-direction: column;
`;

export const DropzoneWrapper = styled.div`
	> label {
		font-weight: 500;
	}
`;

export const LogoDropzone = styled.div`
	${({ theme: { colors } }) => css`
		background-color: ${colors.lightGray4};
		border-radius: 0.4rem;
		margin-top: 0.5rem;
		padding: 1rem;
		margin-bottom: 1rem;
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		align-items: center;
		cursor: pointer;
		transition: all 0.4s ease-in-out;

		&:hover {
			background-color: ${colors.mediumGray};
		}
	`}
`;

export const LogoPreview = styled.img`
	${({ theme: { colors } }) => css`
		width: 10rem;
		height: 10rem;
		border-radius: 50%;
		margin-bottom: 1rem;
		border: 0.3rem solid ${colors.white};
	`}
`;

export const PreviewHelp = styled.p`
	${({ theme: { colors } }) => css`
		color: ${colors.silver};
		font-size: 1.4rem;
		padding: 0.5rem;
		margin: 0.5rem;
		border: 0.3rem dashed ${colors.white};
		border-radius: 0.4rem;
		text-align: center;
	`}
`;

export const UploadError = styled.span`
	${({ theme: { colors } }) => css`
		display: inline-block;
		color: ${colors.red};
		font-size: 1.2rem;
		margin: 0.5rem;
		text-align: center;
	`}
`;
