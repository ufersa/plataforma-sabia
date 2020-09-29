import styled, { css } from 'styled-components';

export const Marker = styled.div`
	position: absolute;
	left: 0;
	bottom: 0;
	width: 0;
	height: 0;
`;

export const Container = styled.div`
	${({ theme: { colors, screens }, levelHeight, markerSize, currentLevel }) => css`
		display: flex;
		position: relative;
		padding-left: ${markerSize + 8}px;

		${Marker} {
			border-top: ${markerSize}px solid transparent;
			border-bottom: ${markerSize}px solid transparent;
			border-left: ${markerSize}px solid ${colors.primary};

			bottom: ${(currentLevel === 1 ? 0 : currentLevel - 1) * levelHeight}px;
		}

		@media screen and (max-width: ${screens.medium}px) {
			> img {
				max-width: 100%;
			}
		}
	`}
`;
