import styled, { css } from 'styled-components';

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
