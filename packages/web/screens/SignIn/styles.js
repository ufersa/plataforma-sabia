import styled, { css } from 'styled-components';

export const Container = styled.div`
	${({ theme: { screens } }) => css`
		display: flex;
		height: 100%;

		@media screen and (max-width: ${screens.xmedium}px) {
			flex-direction: column;
		}
	`}
`;

export const Aside = styled.aside`
	${({ theme: { colors, screens } }) => css`
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		position: relative;
		flex-basis: 45%;
		max-width: 50rem;

		&:before {
			position: absolute;
			background-color: ${colors.lightGreen};
			content: '';
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			opacity: 0.72;
		}

		a {
			display: flex;
		}

		@media screen and (max-width: ${screens.xmedium}px) {
			max-width: 100%;
			flex-basis: unset;
			padding: 1.6rem 0;
		}
	`}
`;

export const LogoWrapper = styled.div`
	flex-grow: 1;
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const LogoImage = styled.a`
	${({ theme: { screens } }) => css`
		position: relative;
		max-width: 100%;
		width: 21.5rem;
		height: 6.4rem;

		@media screen and (max-width: ${screens.xmedium}px) {
			max-width: 14rem;
			height: 4.2rem;
		}
	`}
`;

export const BackgroundImageWrapper = styled.div`
	${({ theme: { screens } }) => css`
		position: relative;
		width: 100%;
		height: 50rem;

		@media screen and (max-width: ${screens.xmedium}px) {
			display: none;
		}
	`}
`;

export const FormWrapper = styled.form`
	${({ theme: { screens } }) => css`
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		flex-grow: 1;

		@media screen and (max-width: ${screens.xmedium}px) {
			align-items: center;
			justify-content: flex-start;
			padding-top: 3.2rem;
		}
	`}
`;

export const FormContent = styled.div`
	max-width: 100%;
	width: 33rem;
`;

export const Title = styled.h3`
	line-height: 2.8rem;
	margin-bottom: 3.2rem;
`;

export const InputsWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 2.4rem;
`;

export const Actions = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1.6rem;
	> a {
		margin-bottom: 0.8rem;
	}
`;

export const Register = styled.div`
	${({ theme: { colors, screens } }) => css`
		display: flex;
		align-items: center;
		line-height: 2.4rem;
		color: ${colors.silver};
		margin-top: 4.8rem;

		> a {
			font-size: 1.6rem;
			margin-left: 0.4rem;
		}

		@media screen and (max-width: ${screens.xmedium}px) {
			margin-top: 3.2rem;
			flex-direction: column;
			> a {
				margin-left: 0;
			}
		}
	`}
`;

export const Error = styled.div`
	${({ theme: { colors, metrics } }) => css`
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.4rem;
		margin-top: 1.6rem;
		margin-bottom: 0.8rem;
		color: ${colors.red};
		padding: 0.6rem 1.2rem;
		width: fit-content;
		position: relative;

		> svg {
			font-size: 2.1rem;
			margin-right: 0.4rem;
		}

		&:before {
			position: absolute;
			content: '';
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background-color: ${colors.red};
			opacity: 0.15;
			border-radius: ${metrics.baseRadius}rem;
		}

		&:after {
			position: absolute;
			left: 0;
			content: '';
			width: 0.2rem;
			height: 2.1rem;
			background-color: ${colors.red};
			border-top-right-radius: ${metrics.baseRadius}rem;
			border-bottom-right-radius: ${metrics.baseRadius}rem;
		}
	`}
`;
