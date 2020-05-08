import styled from 'styled-components';
import { Hits, Stats } from 'react-instantsearch-dom';

export const StyledHits = styled(Hits)`
	position: relative;

	.ais-Hits-list {
		z-index: 100;
		position: absolute;
		background-color: ${({ theme }) => theme.colors.white};
		top: 0;
		left: 0;
		width: 100%;
	}

	.ais-Hits-item {
		padding: 1rem;
		border-bottom: 2px solid ${({ theme }) => theme.colors.border};
	}

	.ais-Highlight-highlighted {
		background-color: ${({ theme }) => theme.colors.orange};
	}
`;

export const SearchItemContainer = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	min-height: 9rem;
`;

export const SearchItemImage = styled.div`
	width: 12rem;
	height: 100%;

	img {
		width: 100%;
		height: 100%;
	}
`;

export const SearchItemText = styled.div`
	min-height: 9rem;
	margin-left: 1rem;
	padding-top: 0.5rem;
	flex: 1;

	> span:first-child {
		display: block;
	}

	> span:last-child {
		font-weight: 400;
	}
`;

export const StyledStats = styled(Stats)`
	background-color: ${({ theme }) => theme.colors.orange};
	color: ${({ theme }) => theme.colors.white};
	text-align: center;
	margin-top: -0.5rem;
	font-size: 1.8rem;
`;
