import styled from 'styled-components';
import BeatLoader from 'react-spinners/BeatLoader';

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
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const Loader = styled(BeatLoader).attrs(({ variant, theme: { colors } }) => ({
	size: 35,
	color: getLoaderVariantColor(variant, colors),
}))``;
