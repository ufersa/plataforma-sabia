import styled, { css } from 'styled-components';
import {
	AiFillCaretDown,
	AiFillCaretUp,
	AiOutlineLeft,
	AiOutlineRight,
	AiOutlineDoubleLeft,
	AiOutlineDoubleRight,
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
		grid-template-columns: repeat(${(props) => props.columns}, 1fr);
	}

	@media screen and (max-width: ${({ theme }) => theme.screens.large}px) {

		border: 0.1rem solid ${({ theme }) => theme.colors.border};
		padding: 1rem;
	}
`;

export const Item = styled.div`
	${({ clickAble }) => css`
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
		}

		${clickAble &&
			css`
				cursor: pointer;
				display: flex;
				align-items: center;
				justify-content: center;
			`}
	`}
`;

export const NoDataContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`;

const iconCss = css`
	margin-left: 0.5rem;
`;

export const ArrowDownIcon = styled(AiFillCaretDown)`
	${iconCss}
`;
export const ArrowUpIcon = styled(AiFillCaretUp)`
	${iconCss}
`;

export const ArrowLeftIcon = styled(AiOutlineLeft)`
	margin-right: 0.5rem;
`;

export const ArrowRightIcon = styled(AiOutlineRight)`
	${iconCss}
`;

export const DoubleArrowLeftIcon = styled(AiOutlineDoubleLeft)``;

export const DoubleArrowRightIcon = styled(AiOutlineDoubleRight)``;

export const PaginationContainer = styled.div`
	margin-bottom: 1.2rem;

	> button {
		background: none;
		border: none;

		&:disabled {
			cursor: not-allowed;
		}
	}

	> span {
		font-size: 1.4rem;
	}
`;
