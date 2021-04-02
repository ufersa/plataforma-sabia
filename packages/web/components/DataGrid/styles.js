import styled, { css } from 'styled-components';
import {
	AiOutlineLeft,
	AiOutlineRight,
	AiOutlineDoubleLeft,
	AiOutlineDoubleRight,
	AiOutlineSortAscending,
	AiOutlineSortDescending,
} from 'react-icons/ai';

export const Container = styled.section`
	width: 100%;
`;

export const Grid = styled.ol`
	margin: 0;
	padding: 0;

	@media screen and (max-width: ${({ theme }) => theme.screens.large}px) {
		display: grid;
		grid-template-columns: 1fr;
		grid-gap: 2rem;
	}
`;

export const Row = styled.li`
	list-style: none;
	border-radius: 0.2rem;
	text-align: center;
	background-color: ${({ theme }) => theme.colors.white};
	font-size: 1.4rem;
	align-items: center;

	a {
		font-weight: 400;
		font-size: 1.4rem;
	}

	${(props) =>
		props.header &&
		css`
			border-top: 0.1rem solid ${({ theme }) => theme.colors.border};
			border-bottom: 0.1rem solid ${({ theme }) => theme.colors.border};
			color: ${({ theme }) => theme.colors.secondary};
			font-weight: bold;
			font-size: 1.6rem;

			@media screen and (max-width: ${({ theme }) => theme.screens.large}px) {
				/* Don't display the first line, since it is used to display the header for tabular layouts */
				display: none;
			}
		`}

	${(props) =>
		!props.header &&
		css`
			background-color: ${({ theme, even }) =>
				even ? theme.colors.gray98 : theme.colors.white};
		`}

	@media screen and (min-width: ${({ theme }) => theme.screens.large}px) {
		display: grid;
		grid-template-columns: repeat(${(props) => props.columns}, minmax(0, 1fr));
	}

	@media screen and (max-width: ${({ theme }) => theme.screens.large}px) {

		border: 0.1rem solid ${({ theme }) => theme.colors.border};
		padding: 1rem;
	}
`;

export const Item = styled.div`
	padding: 2rem 1rem;

	@media screen and (max-width: ${({ theme }) => theme.screens.large}px) {
		::before {
			content: attr(data-name);
			color: ${({ theme }) => theme.colors.secondary};
			font-weight: bold;
		}

		display: grid;
		grid-template-columns: minmax(9rem, 40%) 1fr;
		text-align: left;
		align-items: center;
	}
`;

const arrowIconSize = css`
	width: 2.2rem;
	height: 2.2rem;
`;

export const NoDataContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const ArrowLeftIcon = styled(AiOutlineLeft)`
	margin-right: 0.5rem;
	${arrowIconSize}
`;

export const ArrowRightIcon = styled(AiOutlineRight)`
	margin-left: 0.5rem;
	${arrowIconSize}
`;

export const DoubleArrowLeftIcon = styled(AiOutlineDoubleLeft)`
	${arrowIconSize}
`;

export const DoubleArrowRightIcon = styled(AiOutlineDoubleRight)`
	${arrowIconSize}
`;

export const AscOrderIcon = styled(AiOutlineSortAscending)`
	${({ theme }) => css`
		color: ${theme.colors.lightGray};
		width: 2.8rem;
		height: 2.8rem;

		&.active {
			color: ${theme.colors.secondary};
		}
	`}
`;

export const DescOrderIcon = styled(AiOutlineSortDescending)`
	${({ theme }) => css`
		width: 2.8rem;
		height: 2.8rem;

		&.active {
			color: ${theme.colors.secondary};
		}
	`}
`;

export const GridControls = styled.div`
	${({ theme }) => css`
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;

		button {
			color: ${theme.colors.lightGray};
			background: none;
			border: none;

			&:disabled {
				cursor: not-allowed;
				opacity: 0.5;
			}
		}

		.sort-by {
			display: flex;
			flex-wrap: wrap;

			.sort-order {
				display: flex;
				align-items: center;
			}

			> div {
				margin-right: 1.2rem;
			}

			> div > button:last-of-type {
				margin-left: 1.2rem;
			}
		}

		.pagination {
			display: flex;
			align-items: center;
			margin-left: auto;
			> span {
				font-size: 1.4rem;
			}
		}

		.sort-by > div,
		.pagination {
			margin-bottom: 1.4rem;
		}
	`}
`;
