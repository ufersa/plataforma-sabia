import React from 'react';
import PropTypes from 'prop-types';
import useTranslation from 'next-translate/useTranslation';
import { Title } from '../Common';
import { Link } from '../Link';
import { Container, Grid, Row, Item, NoDataContainer } from './styles';
import Controls from './Controls';

/**
 * Gets table headings deleting specified keys
 *
 * @param {Array} data Items to be filtered
 * @param {Array} keys Keys to delete
 * @returns {Array} Filtered keys of data
 */
const getHeadings = (data, keys = []) =>
	data.length > 0 ? Object.keys(data[0]).filter((item) => !keys.includes(item)) : [];

/**
 * Gets entries from row deleting specified keys
 *
 * @param {object} row Object to be filtered
 * @param {Array} keys Keys to delete
 * @returns {Array} Filtered entries of row
 */
const getCells = (row, keys = []) => {
	const internalRow = { ...row };
	keys.forEach((key) => !!internalRow[key] && delete internalRow[key]);
	return Object.entries(internalRow);
};

const DataGrid = ({
	data,
	hideItemsByKey,
	title,
	rowLink,
	currentPage,
	totalPages,
	totalItems,
	itemsPerPage,
	currentOrder,
	sortOptions,
	handlePagination,
	handleSortBy,
}) => {
	const headings = getHeadings(data, hideItemsByKey);
	const { t } = useTranslation(['datagrid']);
	return (
		<Container>
			{title && (
				<Title align="left" noPadding noMargin>
					{title}
				</Title>
			)}
			{data.length > 0 ? (
				<Grid>
					<Controls
						data={data}
						currentPage={currentPage}
						totalPages={totalPages}
						totalItems={totalItems}
						itemsPerPage={itemsPerPage}
						currentOrder={currentOrder}
						sortOptions={sortOptions}
						handlePagination={handlePagination}
						handleSortBy={handleSortBy}
					/>
					<Row header columns={headings.length}>
						{headings.map((heading) => (
							<Item data-name={heading} key={heading}>
								{heading}
							</Item>
						))}
					</Row>
					{data.map((row, index) => {
						const cells = getCells(row, hideItemsByKey);
						return (
							<Row key={row.id} columns={cells.length} even={(index + 1) % 2 === 0}>
								{cells.map(([key, value]) =>
									rowLink ? (
										<Link
											key={`${row.id}_${key}`}
											href={rowLink
												.replace(':id', row.id)
												.replace(':slug', row.slug)}
											target="_blank"
										>
											<Item data-name={key}>{value}</Item>
										</Link>
									) : (
										<Item key={`${row.id}_${key}`} data-name={key}>
											{value}
										</Item>
									),
								)}
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
	hideItemsByKey: PropTypes.arrayOf(PropTypes.string),
	currentPage: PropTypes.number,
	totalPages: PropTypes.number,
	totalItems: PropTypes.number,
	itemsPerPage: PropTypes.number,
	currentOrder: PropTypes.string,
	sortOptions: PropTypes.arrayOf(
		PropTypes.shape({
			value: PropTypes.string,
			label: PropTypes.string,
		}),
	),
	handlePagination: PropTypes.func,
	handleSortBy: PropTypes.func,
	rowLink: PropTypes.string,
};

DataGrid.defaultProps = {
	hideItemsByKey: [],
	title: null,
	currentPage: 1,
	totalPages: 1,
	totalItems: 1,
	itemsPerPage: 1,
	currentOrder: '',
	sortOptions: [],
	handlePagination: null,
	handleSortBy: null,
	rowLink: '',
};

export default DataGrid;
