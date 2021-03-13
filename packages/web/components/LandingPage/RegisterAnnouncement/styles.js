import styled, { css } from 'styled-components';
import { Title as CommonTitle } from '../../Common';

export const Wrapper = styled.section`
	${({ theme: { screens } }) => css`
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: ${`${screens.large}px`};
		padding: 3.2rem 2.2rem;
		max-width: 100%;
		margin: 0 auto;

		@media (max-width: ${screens.large}px) {
			width: ${`${screens.medium}px`};
		}

		> img {
			max-width: 100%;
			margin-right: 10rem;
		}

		@media screen and (max-width: ${screens.large}px) {
			> img {
				display: none;
			}
		}
	`}
`;

export const Container = styled.div`
	width: 100%;

	> form > button:last-child {
		margin-top: 1.9rem;
	}
`;

export const Title = styled(CommonTitle)`
	padding-left: 1rem;
`;

export const DateTitle = styled.p`
	${({ theme: { colors } }) => css`
		color: ${colors.black};
		font-size: 1.4rem;
		font-weight: 500;
		margin-bottom: 0.8rem;
	`}
`;

export const inputWrapperCss = css`
	margin-top: 1.1rem;
`;

export const Actions = styled.div`
	margin-top: 1.8rem;

	> button {
		width: 100%;
	}
`;
