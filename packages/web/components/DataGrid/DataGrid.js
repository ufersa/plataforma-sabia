import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Title } from '../Common';
import { Link } from '../Link';
import { Container, Grid, Row, Item, NoDataContainer } from './styles';
import Controls from './Controls';

const DataGrid = ({
	data,
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
	const headings = data.length > 0 ? Object.keys(data[0]) : [];
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
