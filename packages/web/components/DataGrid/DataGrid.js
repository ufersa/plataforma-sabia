import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Title } from '../Common';
import { Link } from '../Link';
import {
	Container,
	Grid,
	Row,
	Item,
	NoDataContainer,
	ArrowUpIcon,
	ArrowDownIcon,
	PaginationContainer,
	ArrowLeftIcon,
	ArrowRightIcon,
	DoubleArrowLeftIcon,
	DoubleArrowRightIcon,
} from './styles';

const DataGrid = ({
	data,
	title,
	currentPage,
	totalPages,
	totalItems,
	itemsPerPage,
	currentOrder,
	handlePagination,
	handleOrder,
	rowLink,
	enablePagination,
}) => {
	const lastClickedHeader = useRef(null);
	const headings = data.length > 0 ? Object.keys(data[0]) : [];
	const { t } = useTranslation(['datagrid']);

	const handleHeaderClick = (e) => {
		const heading = e.currentTarget.dataset.name;
		lastClickedHeader.current = heading;
		handleOrder(heading);
	};

	const getItemsCountByPage = () => {
		let firstItem;
		let lastItem;

		if (currentPage === 1) {
			firstItem = 1;
			lastItem = data.length;
		} else if (currentPage === totalPages) {
			firstItem = totalItems - data.length + 1;
			lastItem = totalItems;
		} else {
			firstItem = (currentPage - 1) * itemsPerPage + 1;
			lastItem = data.length + (currentPage - 1) * itemsPerPage;
		}

		return `${firstItem} - ${lastItem} ${t('paginationLabel')} ${totalItems}`;
	};

	return (
		<Container>
			{title && (
				<Title align="left" noPadding noMargin>
					{title}
				</Title>
			)}
			{data.length > 0 ? (
				<Grid>
					{enablePagination && (
						<PaginationContainer>
							<button
								type="button"
								onClick={() => handlePagination(1)}
								disabled={currentPage === 1}
								aria-label="First Page"
							>
								<DoubleArrowLeftIcon />
							</button>
							<button
								type="button"
								onClick={() => handlePagination(currentPage - 1)}
								disabled={currentPage === 1}
								aria-label="Previous Page"
							>
								<ArrowLeftIcon />
							</button>
							<span>{getItemsCountByPage()}</span>
							<button
								type="button"
								onClick={() => handlePagination(currentPage + 1)}
								disabled={currentPage === totalPages}
								aria-label="Next Page"
							>
								<ArrowRightIcon />
							</button>
							<button
								type="button"
								onClick={() => handlePagination(totalPages)}
								disabled={currentPage === totalPages}
								aria-label="Last Page"
							>
								<DoubleArrowRightIcon />
							</button>
						</PaginationContainer>
					)}
					<Row header columns={headings.length}>
						{headings.map((heading) => (
							<Item
								data-name={heading}
								key={heading}
								onClick={handleHeaderClick}
								clickAble
							>
								{heading}
								{lastClickedHeader.current === heading &&
									currentOrder === 'ASC' && <ArrowUpIcon />}
								{lastClickedHeader.current === heading &&
									currentOrder === 'DESC' && <ArrowDownIcon />}
							</Item>
						))}
					</Row>
					{data.map((row, index) => {
						const cells = Object.entries(row);
						return (
							<Row key={row.id} columns={cells.length} even={(index + 1) % 2 === 0}>
								{cells.map(([key, value]) => (
									<Link
										key={`${row.id}_${key}`}
										href={rowLink.replace(':id', row.id)}
									>
										<Item data-name={key}>{value}</Item>
									</Link>
								))}
							</Row>
						);
					})}
				</Grid>
			) : (
				<NoDataContainer>{t('noDataToShow')}</NoDataContainer>
			)}
		</Container>
	);
};

DataGrid.propTypes = {
	title: PropTypes.string,
	data: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number,
		}),
	).isRequired,
	currentPage: PropTypes.number,
	totalPages: PropTypes.number,
	totalItems: PropTypes.number,
	itemsPerPage: PropTypes.number,
	currentOrder: PropTypes.string,
	handlePagination: PropTypes.func,
	handleOrder: PropTypes.func,
	rowLink: PropTypes.string,
	enablePagination: PropTypes.bool,
};

DataGrid.defaultProps = {
	title: null,
	currentPage: 1,
	totalPages: 1,
	totalItems: 1,
	itemsPerPage: 1,
	currentOrder: '',
	handlePagination: () => {},
	handleOrder: () => {},
	rowLink: '',
	enablePagination: false,
};

export default DataGrid;
