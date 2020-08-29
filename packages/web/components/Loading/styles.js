import styled from 'styled-components';
import BeatLoader from 'react-spinners/BeatLoader';

export const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	transition: 1s height;
`;

export const Loader = styled(BeatLoader).attrs(({ theme: { colors } }) => ({
	size: 35,
	color: colors.primary,
}))``;
