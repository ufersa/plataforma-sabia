import styled, { css } from 'styled-components';
import ScaleLoader from 'react-spinners/ScaleLoader';

const getLoaderVariantColor = (variant, colors) => {
	switch (variant) {
		case 'primary':
		default:
			return colors.primary;
		case 'secondary':
			return colors.lightGray;
		case 'white':
			return colors.white;
	}
};

export const Container = styled.div`
	${({ noPadding }) => css`
		display: flex;
		justify-content: center;
		align-items: center;

		& > div {
			padding: ${!noPadding && '1rem'};
		}
	`}
`;

export const Loader = styled(ScaleLoader).attrs(({ variant, theme: { colors } }) => ({
	height: 35,
	color: getLoaderVariantColor(variant, colors),
}))``;

export const HiddenWrapper = styled.div`
	all: inherit;
	display: ${({ active }) => (active ? 'none' : 'inherit')};
	width: 100%;
`;
