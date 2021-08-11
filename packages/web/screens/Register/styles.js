import styled, { css } from 'styled-components';

export const Container = styled.div`
	${({ theme: { screens }, backgroundImage }) => css`
		height: 100%;
		width: 100%;
		position: relative;
		display: flex;
		flex-direction: column;

		@media screen and (min-width: ${screens.medium + 1}px) {
			flex-direction: row;
			background-image: url(${backgroundImage});
			background-repeat: no-repeat;
			background-position: bottom right;
		}
	`}
`;

export const Sidebar = styled.aside`
	${({ theme: { colors, screens } }) => css`
		display: flex;
		flex-direction: column;
		background-color: ${colors.lightGray6};
		padding: 1.6rem;
		position: relative;

		> button:first-child {
			position: absolute;
			left: 1.8rem;
			top: 50%;
			transform: translateY(-50%);
			width: fit-content;
		}

		@media screen and (min-width: ${screens.medium + 1}px) {
			max-width: 33.5rem;
			padding: 8rem 3.2rem;
			> button:first-child {
				display: none;
			}
		}
	`}
`;

export const LogoWrapper = styled.div`
	${({ theme: { screens } }) => css`
		width: 100%;
		margin: 0 auto;
		max-width: 14rem;

		@media screen and (min-width: ${screens.medium + 1}px) {
			margin: 0 auto 4rem;
			max-width: 21.5rem;
		}
	`}
`;

export const StepsWrapper = styled.div`
	${({ theme: { screens } }) => css`
		display: none;

		@media screen and (min-width: ${screens.medium + 1}px) {
			display: block;
		}
	`}
`;

export const StepsTitle = styled.h3`
	margin-bottom: 4rem;
	font-weight: 500;
`;

export const Steps = styled.ul``;

export const Step = styled.li`
	${({ theme: { colors }, active, completed }) => css`
		margin-bottom: 1rem;
		display: flex;
		align-items: center;
		color: ${colors.lightGray2};

		> svg {
			margin-right: 0.8rem;
		}

		${!!active &&
			css`
				color: ${colors.black};
			`}

		${!!completed &&
			css`
				color: ${colors.secondary};
			`}
	`}
`;

export const Content = styled.div`
	${({ theme: { screens } }) => css`
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		padding: 3.2rem;

		@media screen and (min-width: ${screens.medium + 1}px) {
			padding: 8rem 5.4rem;
		}
	`}
`;

export const ProgressIndicator = styled.div`
	${({ theme: { colors, screens }, stepsLength, activeStepIndex }) => css`
		background-color: ${colors.lightGray4};
		height: 0.4rem;
		border-radius: 0.2rem;
		position: relative;
		width: 100%;
		margin-bottom: 2.4rem;

		&::after {
			display: block;
			content: '';
			width: calc((100% / ${stepsLength}) * ${activeStepIndex + 1});
			height: 100%;
			border-radius: 0.2rem;
			background-color: ${colors.secondary};
			transition: width 0.5s ease-out;
		}

		@media screen and (min-width: ${screens.medium + 1}px) {
			max-width: 20rem;
		}
	`}
`;

export const PageTitle = styled.h3`
	${({ theme: { colors, screens } }) => css`
		color: ${colors.black};
		font-weight: 500;
		margin-bottom: 1.2rem;

		@media screen and (min-width: ${screens.medium + 1}px) {
			display: none;
		}
	`}
`;

export const StepTitle = styled.h3`
	${({ theme: { colors } }) => css`
		color: ${colors.black};
		font-weight: 500;
		margin-bottom: 0.8rem;
	`}
`;

export const StepSubtitle = styled.p`
	${({ theme: { colors } }) => css`
		color: ${colors.lightGray2};
		margin-bottom: 4rem;
	`}
`;

export const RegisterTypeTitle = styled.h3`
	${({ theme: { colors } }) => css`
		color: ${colors.lightGray2};
		font-size: 2.8rem;
		font-weight: 500;
		line-height: 3.3rem;
		margin-bottom: 4rem;

		> p {
			font-size: 1.6rem;
			line-height: 3.3rem;
		}
	`}
`;

export const Actions = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

export const InputsWrapper = styled.div`
	> div:not(:last-child) {
		margin-bottom: 2.4rem;
	}
`;

export const CheckboxLabel = styled.p`
	${({ theme: { colors } }) => css`
		color: ${colors.black};
		font-weight: 500;
		font-size: 1.2rem;
	`}
`;

export const CheckboxWrapper = styled.div`
	margin-bottom: 4rem;
	> div:first-child {
		margin-bottom: 0.8rem;
	}
`;

export const FloatingAction = styled.div`
	${({ theme: { screens, metrics }, justifyContent }) => css`
		display: flex;
		justify-content: space-between;
		flex-direction: row-reverse;
		margin: auto -3.2rem -3.2rem -3.2rem;

		> button,
		a {
			border-radius: 00;
		}

		> button + #back-button {
			display: none;
		}

		@media screen and (min-width: ${screens.medium - 1}px) {
			margin: 0;
			margin-top: 17.6rem;
			display: flex;
			justify-content: ${justifyContent || 'space-between'};

			> button,
			a {
				padding: 0.2rem 0.8rem;
				border-radius: ${metrics.baseRadius}rem;
			}

			> button + #back-button {
				display: inherit;
			}
		}
	`}
`;

export const Form = styled.form`
	display: flex;
	flex-direction: column;
	height: 100%;
`;

export const StepInfo = styled.p`
	${({ theme: { colors } }) => css`
		color: ${colors.silver};
		margin-bottom: 2.4rem;
	`}
`;

export const VerificationCodeWrapper = styled.div`
	margin-top: 5.6rem;
	> div {
		gap: 0.8rem;
		justify-content: center;
	}
`;

export const ResendEmailLink = styled.div`
	text-align: right;
	margin-top: 0.4rem;

	button {
		width: fit-content;
		margin-left: auto;
		font-size: 1.2rem;
		font-weight: 500;
	}
`;

export const FinishContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-evenly;
	height: 100%;
	text-align: center;
`;

export const FinishTitle = styled.h3`
	${({ theme: { colors } }) => css`
		color: ${colors.secondary};
		max-width: 27.5rem;
		line-height: 3rem;
	`}
`;

export const FinishSubtitle = styled.p`
	${({ theme: { colors } }) => css`
		color: ${colors.silver};
		font-size: 1.6rem;
		line-height: 2.4rem;
	`}
`;
