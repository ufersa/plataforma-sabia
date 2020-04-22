import styled from 'styled-components';
import { SearchBox, Hits, Stats } from 'react-instantsearch-dom';

export const StyledSearchBox = styled(SearchBox)`
	box-shadow: 0 0 9rem -1.5rem ${({ theme }) => theme.colors.darkWhite};
	border: none;
	border-radius: ${({ theme }) => theme.metrics.baseRadius}rem;
	background-color: ${({ theme }) => theme.colors.white};
	width: 100%;

	.ais-SearchBox {
		&-form {
			padding: 3rem;
			display: flex;
			align-items: center;
			justify-content: space-between;
			position: relative;
		}

		&-input {
			flex-grow: 1;
			padding: 1.8rem 2rem;
			margin-right: 3rem;
			border: 0.1rem solid ${({ theme }) => theme.colors.gray98};
			border-radius: ${({ theme }) => theme.metrics.baseRadius}rem;
			background-color: ${({ theme }) => theme.colors.gray98};
			font-size: 2rem;
			line-height: 1.9rem;
			color: ${({ theme }) => theme.colors.black};
		}

		&-submit {
			background-color: ${({ theme }) => theme.colors.primary};
			border-radius: ${({ theme }) => theme.metrics.baseRadius}rem;
			border: none;
			font-size: 2.2rem;
			padding: 1.8rem 4rem;
			display: inline-block;

			:hover {
				opacity: 0.8;
			}
		}

		&-submitIcon {
			fill: ${({ theme }) => theme.colors.white};
			stroke: ${({ theme }) => theme.colors.white};
			width: ${({ theme }) => theme.sizes.smallIcon}rem;
			height: ${({ theme }) => theme.sizes.smallIcon}rem;
		}

		&-reset {
			display: none;
		}

		@media (max-width: ${({ theme }) => theme.screens.medium}px) {
			&-form {
				flex-direction: column;
				justify-content: space-between;
				align-items: stretch;
				padding: 2rem;
			}

			&-input {
				margin-right: 0;
				margin-bottom: 1rem;
			}
		}
	}
`;

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
