import styled, { css } from 'styled-components';
import Slider from 'react-slick';

export const CarouselContainer = styled(Slider)`
	${({ theme: { screens, colors } }) => css`
		width: 450px;
		max-width: 100%;
		margin: 1rem 1rem 1rem 0;

		@media (max-width: ${screens.medium}px) {
			width: 100%;
		}

		.slick-prev,
		.slick-next {
			width: 34px;
			height: 34px;
			position: absolute;
			z-index: 10000;
			border-radius: 50%;
			background-color: ${colors.lightWhite2};
			color: ${colors.white};
			stroke-width: 1.2;
			transition: all 0.4s ease-in-out;

			&:hover {
				background-color: ${colors.darkGray2};
			}
		}

		.slick-prev {
			left: 6px;
		}

		.slick-next {
			right: 6px;
		}

		.slick-prev:before,
		.slick-next:before {
			color: ${colors.lightGray};
			font-size: 34px;
		}

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
						background-color: ${colors.red};
					}
				}
			}
		}
	`}
`;

export const ImageContainer = styled.img`
	${({ theme: { metrics } }) => css`
		margin: 0 auto;
		width: 100%;
		max-width: 100%;
		height: auto;
		border-radius: ${metrics.smallRadius}rem;
	`}
`;
