import styled, { css } from 'styled-components';
import { MdClose } from 'react-icons/md';

import { Loader } from '../../Loading/styles';

const modalAspectRatios = {
	default: (colors, screens) => css`
		display: flex;
		align-items: center;
		justify-content: center;

		width: 80%;
		height: 80%;
		background: ${colors.whiteSmoke};
		position: relative;

		iframe {
			width: 100%;
			height: 100%;
			z-index: 2;
		}
		@media screen and (max-width: ${screens.small}px) {
			width: 100%;
			height: 50%;
		}
	`,
	widescreen: (colors) => css`
		display: flex;
		justify-content: center;
		align-items: center;

		width: 70%;
		height: 0;
		padding-bottom: 39.4%;
		background: ${colors.whiteSmoke};
		position: relative;

		iframe {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			z-index: 2;
		}

		> div {
			top: 45%;
			left: 46%;
		}
	`,
};

export const Container = styled.div`
	${({ theme: { colors, screens }, aspectRatio }) => css`
		${!!aspectRatio && modalAspectRatios[aspectRatio](colors, screens)}
	`}
`;

export const SpinnerContainer = styled.div`
	position: absolute;
	z-index: 1;
`;

export const Spinner = styled(Loader)``;

export const CloseIcon = styled(MdClose)`
	${({ theme: { colors } }) => css`
		cursor: pointer;
		position: absolute;
		top: -2.4rem;
		right: 0;
		width: 2.4rem;
		height: 2.4rem;

		color: ${colors.white};
	`}
`;
