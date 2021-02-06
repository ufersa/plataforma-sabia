import styled, { css } from 'styled-components';
import { Title } from '../../Common';

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
`;

export const StyledTitle = styled(Title)`
	margin-bottom: 3.2rem;
`;

export const inputWrapperCss = css`
	margin-top: 1.6rem;
`;
