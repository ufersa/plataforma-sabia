import styled from 'styled-components';
import { Hits, Stats } from 'react-instantsearch-dom';

export const StyledHits = styled(Hits)`
	background-color: ${({ theme }) => theme.colors.gray98};
	margin: 0 auto;
	position: absolute;

	.ais-Hits-item {
		margin: 3rem;
		border: solid 0.2rem ${({ theme }) => theme.colors.green};
	}

	.ais-Hits-item img {
		width: 10%;
		float: left;
		height: 10rem;
	}

	.ais-Hits-item .name_div {
		float: left;
		font-size: 2.8 rem;
		min-height: 10rem;
		width: 90%;
	}

	.ais-Highlight-highlighted {
		background-color: ${({ theme }) => theme.colors.grey};
	}
`;

export const StyledStats = styled(Stats)`
	background-color: ${({ theme }) => theme.colors.green};
	color: ${({ theme }) => theme.colors.white};
`;
