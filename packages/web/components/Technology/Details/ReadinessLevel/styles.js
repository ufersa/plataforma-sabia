import styled, { css } from 'styled-components';

export const Container = styled.div`
	${({ theme: { screens } }) => css`
		display: flex;
		position: relative;

		@media screen and (max-width: ${screens.medium}px) {
			> img {
				max-width: 100%;
			}
		}
	`}
`;

export const Marker = styled.div`
	position: absolute;
	right: 0;
	bottom: 0;
	width: 0;
	height: 0;
`;

export const MarkerBox = styled.div`
	${({ theme: { colors }, levelHeight, markerSize, currentLevel }) => css`
		min-width: 2rem;
		${Marker} {
			border-top: ${markerSize}px solid transparent;
			border-bottom: ${markerSize}px solid transparent;
			border-left: ${markerSize}px solid ${colors.primary};

			bottom: ${(currentLevel === 1 ? 0 : currentLevel - 1) * levelHeight}px;
			margin-right: calc(100% - ${markerSize}px);
		}
	`}
`;
