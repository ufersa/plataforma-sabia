import styled, { css } from 'styled-components';
import Slider from 'react-slick';

const cardsGridStyles = css`
	display: grid;
	grid-template-columns: repeat(auto-fit, min(27rem, 100%));
	grid-gap: 5rem 3rem;
	justify-content: center;

	@media (max-width: ${({ theme }) => theme.screens.medium}px) {
		padding: 0 2rem;
	}

	.ais-Hits-item {
		display: flex;
	}
`;

// eslint-disable-next-line import/prefer-default-export
export const CardsWrapper = styled.div`
	${({ overwriteAlgoliaStyles, algoliaCustomCss }) => css`
		${!overwriteAlgoliaStyles
			? cardsGridStyles
			: css`
					.ais-Hits .ais-Hits-list {
						${cardsGridStyles};
					}
			  `};

		${!!algoliaCustomCss && algoliaCustomCss};
	`}
`;

// eslint-disable-next-line import/prefer-default-export
export const SolutionFooter = styled.div`
	display: flex;
	width: 100%;
	justify-content: center;
	align-items: center;
	padding: 3rem 0;
`;

export const CarouselContainer = styled.div`
	display: flex;
	width: 100%;
	justify-content: flex-end;
	align-items: center;
	padding: 3rem 0;
`;

export const Carousel = styled(Slider)`
    width: 100%;
    heigth: 100%;
    align-self: flex-end;

    .slick-slide {
        height: auto;
        margin 0 1rem;
        width: 27.8rem;

		&:first-child{
			margin-left: 0;
		}
    }
    .slick-slide > div {
        height: 100%;
    }
    .slick-track {
        display: flex;
		padding: 2rem 0;
        align-itens: stretch;
    }

    .slick-list,
    .slick-track {
        touch-action: pan-y;
    }
`;
