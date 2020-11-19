import styled, { css, keyframes } from 'styled-components';
import { AiOutlineShareAlt } from 'react-icons/ai';

const zoom = keyframes`
	0%, 100% {
		transform: scale(1);
	}
	50% {
		transform: scale(1.1);
	}
`;

export const Container = styled.button`
	${({ theme: { sizes } }) => css`
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.5rem;
		gap: 0.6rem;
		cursor: pointer;
		background: transparent;
		border: none;

		svg {
			width: ${sizes.defaultIcon}rem;
			height: ${sizes.defaultIcon}rem;

			&:hover {
				animation: ${zoom} 1.5s;
			}
		}
	`}
`;

export const Icon = styled(AiOutlineShareAlt).attrs(({ theme: { colors } }) => ({
	color: colors.lightGray2,
}))``;
