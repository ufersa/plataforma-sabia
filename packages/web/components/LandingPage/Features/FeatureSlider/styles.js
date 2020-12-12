import styled, { css } from 'styled-components';

export const Container = styled.div`
	${({ theme: { colors }, reversed }) => css`
		position: relative;
		display: flex;
		flex-wrap: wrap;
		flex-direction: ${reversed ? 'row-reverse' : 'row'};

		.slick-slider {
			width: 50%;
		}

		.slick-slide {
			padding: 0.8rem;
		}

		.slick-dots {
			bottom: auto;
			top: 5rem;
			right: ${reversed ? 'auto' : 'calc(-100% - 3rem)'};
			left: ${reversed ? '-100%' : 'auto'};

			li {
				width: 100%;
				opacity: 0.5;
				margin-bottom: 2.4rem;

				> span {
					display: flex;
					align-items: center;

					img {
						width: 3.2rem;
						margin-right: 1.2rem;
					}

					span {
						color: ${colors.silver};
						font-size: 1.6rem;
						line-height: 150%;
					}
				}

				&.slick-active {
					opacity: 1;

					> span {
						span {
							font-weight: bold;
						}
					}
				}
			}
		}

		.slick-prev:before,
		.slick-next:before {
			content: '';
			display: none;
		}
	`}
`;

export const Title = styled.h2`
	${({ theme: { colors }, reversed }) => css`
		color: ${colors.black};
		font-size: 2.8rem;
		line-height: 3.3rem;
		margin-bottom: 2rem;
		position: absolute;
		top: 0;
		left: ${reversed ? 0 : 'calc(50% + 3rem)'};
	`}
`;

export const Arrow = styled.button.attrs({
	type: 'button',
})`
	border: 0;
	background: transparent;
	width: auto;
	height: auto;
	z-index: 1;
	left: 2.4rem;

	img {
		width: 3.6rem;
	}

	${({ next }) =>
		next &&
		css`
			transform: scaleX(-1);
			right: 2.4rem;
			left: auto;
			top: 40.8%;
		`}
`;
