import styled, { css } from 'styled-components';
import { MdClose } from 'react-icons/md';
import { CarouselContainer } from '../../Technology/Details/ImagesCarousel/styles';

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	${CarouselContainer} {
		width: 120rem;
	}
`;

export const Close = styled(MdClose)`
	${({ theme }) => css`
		color: ${theme.colors.white};
		cursor: pointer;
		margin-left: auto;
		width: 2.4rem;
		height: 2.4rem;
	`}
`;

export const Content = styled.div`
	width: 100%;
	max-width: 120rem;
	max-height: 80rem;
	margin: 0 auto;
`;
