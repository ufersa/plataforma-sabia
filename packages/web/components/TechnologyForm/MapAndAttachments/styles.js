import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
	margin-bottom: 4rem;
`;

export const UploadBox = styled.div`
	flex-direction: row;
	display: flex;
	margin: 0;
	margin-bottom: 1rem;
	border: 1px solid ${({ theme }) => theme.colors.lightGray3};
	padding: 1rem;
	cursor: pointer;

	&:hover {
		background-color: ${({ theme }) => theme.colors.lightGray3};
	}
`;

export const IconLink = styled.a`
	color: ${({ theme }) => theme.colors.darkGray};
`;

export const Place = styled.div``;

export const Div = styled.div``;

export const IconBox = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;

	& > * {
		margin: 0.25rem;
	}
`;

export const IconTextBox = styled.div`
	font-size: 1.2rem;
	font-weight: 300;
	display: flex;
	justify-content: flex-start;
	align-items: flex-start;
	flex-direction: column;
`;

export const InputTextBox = styled.div`
	flex: 3;
	margin: auto 0;
`;

export const UploadedDocuments = styled.div`
	display: flex;
	flex-direction: column;
`;

export const UploadedImages = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, 30%);
	grid-gap: 1rem;

	@media (max-width: ${({ theme }) => theme.screens.small}px) {
		grid-template-columns: repeat(auto-fill, 100%);
	}
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

export const SvgBox = styled.div`
	text-align: center;
	flex: 1;
	margin: auto 0;
`;

export const Title = styled.h3``;

export const Media = styled.img`
	width: 100%;
	filter: opacity(0.7);
`;

export const IconRow = styled.div`
	${({ row, alignItems }) => css`
		display: flex;
		flex-direction: ${row ? 'row' : 'column'};

		& > * {
			margin-bottom: 1rem;
		}

		& > a {
			padding: 0;
			margin-right: 1rem;
			display: flex;
		}

		align-items: ${alignItems || 'center'};
	`}
`;

export const Button = styled.button.attrs(() => ({ type: 'button' }))`
	${({ theme: { colors } }) => css`
		border: none;
		outline: none;

		display: flex;
		align-items: center;

		padding: 0.2rem;
		padding-left: 0.6rem !important;
		padding-right: 0.6rem !important;
		line-height: 2.4rem;

		text-transform: uppercase;
		font-size: 1.4rem;
		font-weight: 700;
		color: ${colors.red};
		border: 2px solid ${colors.red};

		> svg {
			margin-right: 0.4rem;
		}

		:hover,
		:focus {
			color: ${colors.white};
			background: ${colors.red};
		}
	`}
`;

export const RadioWrapper = styled.div`
	${({ theme: { colors } }) => css`
		display: flex;
		align-items: center;
		white-space: nowrap;

		> input {
			appearance: none;
		}
		> input:checked + label {
			color: ${colors.white};
			background-color: ${colors.secondary};
			border: 2px solid ${colors.secondary};
		}
		> label {
			display: flex;
			align-items: center;
			color: ${colors.lightGray2};
			text-align: center;
			padding: 0.2rem 0.6rem;
			cursor: pointer;
			font-size: 1.4rem;
			font-weight: 700;
			line-height: 2.4rem;
			border: 2px solid ${colors.lightGray2};
			text-transform: uppercase;

			> svg {
				margin-right: 0.4rem;
			}
		}
		:focus-within > label {
			background-color: ${colors.secondary};
		}
	`}
`;
