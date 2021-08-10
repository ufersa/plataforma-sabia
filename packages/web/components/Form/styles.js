import styled, { css } from 'styled-components';

const inputLabelColors = {
	lightRounded: 'black',
};

export const InputLabel = styled.label`
	${({ theme: { colors }, variant }) => css`
		color: ${colors[inputLabelColors[variant]] || colors.lightGray};
		font-size: 1.4rem;
		font-weight: 500;
	`}
`;

export const InputError = styled.span`
	color: ${({ theme }) => theme.colors.red};
	margin: 0 0 1rem 0;
	display: inline-block;
`;

export const Row = styled.div`
	${({ flexDirection, alignItems }) => css`
		display: flex;
		flex-direction: ${flexDirection};
		align-items: ${alignItems || 'flex-end'};
	`}
`;

export const inputModifiers = {
	default: ({ colors }) => css`
		background: ${colors.white};
		border: 1px solid ${colors.mediumGray};
		border-radius: 0.2rem;
		color: ${colors.lightGray};
	`,
	gray: ({ colors, metrics }) => css`
		border: 1px solid ${colors.lightGray4};
		border-radius: ${metrics.baseRadius}rem;
		background: ${colors.lightGray4};
	`,
	rounded: ({ colors, metrics }) => css`
		background: ${colors.white};
		border: 1px solid ${colors.mediumGray};
		border-radius: ${metrics.baseRadius}rem;
		color: ${colors.lightGray};
	`,
	lightRounded: ({ colors, metrics, hasError }) => css`
		background: ${colors.white};
		border: 1px solid ${colors.lightGray4};
		border-radius: ${metrics.baseRadius}rem;
		color: ${colors.darkGray};

		&::placeholder {
			color: ${colors.lightGray3};
			font-style: normal;
		}

		${!!hasError &&
			css`
				border: 1px solid ${colors.red};
			`}
	`,
};

export const StyledInput = styled.input`
	${({ theme: { colors, metrics }, disabled, variant, hasError }) => css`
		width: 100%;
		height: 4.4rem;
		font-size: 1.4rem;
		margin: 0.5rem 0;
		padding: 1.2rem;
		opacity: ${disabled ? 0.5 : 1};

		&::placeholder {
			color: ${colors.lightGray2};
			font-weight: 300;
			font-style: italic;
		}

		${!!variant && inputModifiers[variant]({ colors, metrics, hasError })}
	`}
`;

const inputWrapperModifiers = {
	labelTop: css`
		display: flex;
		flex-direction: column;
	`,
	labelRight: css`
		display: flex;
		align-items: center;

		${StyledInput} {
			width: auto;
		}
		${InputLabel} {
			order: 2;
			margin-left: 1rem;
		}
	`,
	labelLeft: css`
		display: flex;
		align-items: center;

		${InputLabel} {
			margin-right: 1rem;
		}
	`,
};

export const InputFieldWrapper = styled.div`
	${({ theme: { colors }, hasError, labelPlacement, customCss, isHidden }) => css`
		font-size: 1.4rem;
		line-height: 14px;

		> div.wrapper {
			display: flex;
		}

		${hasError &&
			css`
				> input {
					border: 1px solid ${colors.primary};
				}
				> .react-select-container .react-select__control {
					border-color: ${colors.primary};
				}
			`}

		${labelPlacement === 'top' && inputWrapperModifiers.labelTop}
		${labelPlacement === 'right' && inputWrapperModifiers.labelRight}
		${labelPlacement === 'left' && inputWrapperModifiers.labelLeft}
		${isHidden &&
			css`
				display: none;
			`}


		${customCss}
	`}
`;

export const VerificationCodeWrapper = styled.div`
	${({ theme: { colors, metrics } }) => css`
		display: grid;
		grid-template-columns: repeat(auto-fit, 40px);

		input::-webkit-outer-spin-button,
		input::-webkit-inner-spin-button {
			-webkit-appearance: none;
			margin: 0;
		}

		input {
			-moz-appearance: textfield;
			caret-color: ${colors.secondary};
			font-size: 1.6rem;
			line-height: 2.4rem;
			padding: 0.8rem 1.2rem;
			border: 1px solid ${colors.lightGray4};
			border-radius: ${metrics.baseRadius}rem;
			text-align: center;
		}

		input:focus {
			border: 1px solid ${colors.lightGray2};
		}
	`}
`;
