import styled, { css } from 'styled-components';

export const Modal = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	max-width: 78rem;

	> button:last-child {
		margin-top: 5.6rem;
	}
`;

export const InfosContainer = styled.div`
	${({ theme: { screens } }) => css`
		display: flex;

		> img {
			margin-right: 6.8rem;
			align-self: center;
		}

		@media screen and (max-width: ${screens.small}px) {
			> img {
				display: none;
			}
		}
	`}
`;

export const Title = styled.div`
	${({ theme: { colors } }) => css`
		max-width: 41rem;
		> p {
			color: ${colors.secondary};
			font-size: 2.8rem;
			font-weight: 500;
			margin-bottom: 0.8rem;
			line-height: 3.3rem;
		}

		> span {
			font-size: 1.6rem;
			line-height: 2.4rem;

			> b:nth-of-type(2) {
				color: ${colors.secondary};
			}
		}
	`}
`;

export const InputsWrapper = styled.div`
	display: flex;
	margin-top: 5.6rem;
	width: 100%;

	> button {
		margin-left: 1.6rem;
		align-self: flex-end;
		margin-bottom: 0.3rem;
	}
`;

export const FieldLabel = styled.label`
	line-height: 2.4rem;
	margin-bottom: 0.8rem;
`;

export const FieldWrapper = styled.div`
	${({ isDisabled, required }) => css`
		width: 100%;

		&:first-child {
			margin-right: 1.6rem;
		}

		${isDisabled &&
			css`
				cursor: not-allowed;
				opacity: 0.74;
			`}

		${required &&
			css`
				${FieldLabel} {
					:after {
						content: ' *';
					}
				}
			`}
	`}
`;

export const SelectedValuesWrapper = styled.div`
	${({ theme: { colors } }) => css`
		align-self: flex-start;
		font-size: 1.4rem;
		color: ${colors.lightGray2};
		width: 100%;
		margin-top: 1.6rem;

		> div {
			display: flex;
			align-items: center;
			padding: 0.8rem 0;
			border-bottom: 1px solid ${colors.lightGray4};

			:first-child {
				border-top: 1px solid ${colors.lightGray4};
			}

			> span:last-of-type {
				margin-right: 0.8rem;
			}

			> button {
				margin-left: auto;
			}
		}
	`}
`;

export const buttonModifiers = {
	outlined: (colors) => css`
		background: none;
		color: ${colors.secondary};
		border: 2px solid ${colors.secondary};
		padding: 0.2rem 0.6rem;

		:hover,
		:focus {
			color: ${colors.white};
			background: ${colors.secondary};
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
	text: (colors) => css`
		background: none;
		color: ${colors.red};
		padding: 0.4rem 0.8rem;

		:hover,
		:focus {
			color: ${colors.white};
			background: ${colors.red};
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
