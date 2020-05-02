import styled from 'styled-components';
import { Hits, Stats } from 'react-instantsearch-dom';

export const StyledHits = styled(Hits)`
	position: absolute;
	max-width: ${({ theme }) => theme.metrics.containerWidth - 2}rem;
	width: 100%;
	z-index: 1;
	margin-top: -4rem;
	background-color: ${({ theme }) => theme.colors.white};

	.ais-Hits-item {
		padding: 0.5rem;
		margin-top: 1rem;
		border-bottom: 2px solid ${({ theme }) => theme.colors.border};
	}
	.container {
		width: 100%;
		height: 9rem;
	}

	.ais-Hits-item .image {
		background-color: ${({ theme }) => theme.colors.orange};
		width: 12rem;
		height: 9rem;
		float: left;
	}
	.ais-Hits-item .image img {
		width: 100%;
		height: 100%;
	}
	.ais-Hits-item .text {
		height: 9rem;
		padding-left: 1rem;
		float: left;
	}
	.ais-Hits-item .category {
	}
	.ais-Hits-item .title {
		margin-top: 0.5rem;
	}
	.ais-Highlight-highlighted {
		background-color: ${({ theme }) => theme.colors.gray98};
	}
	@media (max-width: ${({ theme }) => theme.screens.medium}px) {
		margin-top: -3rem;
	}
`;

export const StyledStats = styled(Stats)`
	background-color: ${({ theme }) => theme.colors.orange};
	color: ${({ theme }) => theme.colors.white};
	text-align: center;
`;
