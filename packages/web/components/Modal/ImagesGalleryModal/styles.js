import styled, { css } from 'styled-components';

export const Container = styled.div`
	${({ theme: { colors } }) => css`
		width: 95%;

		.slick-dots {
			bottom: 10px;

			li {
				button {
					width: 20px;
					height: 20px;

					&:before {
						content: '';
						display: inline-block;
						background-color: ${colors.white};
						border: 4px solid ${colors.white};
						border-radius: 50%;
						margin: 0 4px;
						width: 14px;
						height: 14px;
						opacity: 1;
						transition: all 0.4s ease-in-out;
					}
				}
				&.slick-active {
					button:before {
						background-color: ${colors.primary};
					}
				}
			}
		}

		.slick-slide > div {
			cursor: pointer;
		}
	`}
`;

export const Close = styled.div`
	${({ theme }) => css`
		color: ${theme.colors.white};
		position: absolute;
		left: 0;
		top: 0;
		cursor: pointer;
		width: 100%;
		height: 100%;
		text-align: right;
	`}
`;

export const Content = styled.div`
	width: 100%;
	max-width: 120rem;
	max-height: 80rem;
	margin: 0 auto;
`;
