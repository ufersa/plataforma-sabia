import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Title } from '../Common';
import { Link } from '../Link';
import { Container, Grid, Row, Item, NoDataContainer } from './styles';

const DataGrid = ({ data, title }) => {
	const headings = data.length > 0 ? Object.keys(data[0]) : [];
	const { t } = useTranslation(['datagrid']);

	return (
		<Container>
			{title && (
				<Title align="left" noPadding noMargin>
					{title}
				</Title>
			)}
			{data.length < 0 ? (
				<Grid>
					<Row header columns={headings.length}>
						{headings.map((heading) => (
							<Item key={heading} data-name={heading}>
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
										href={`/technology/${row.id}/edit`}
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
};

DataGrid.defaultProps = {
	title: null,
};

export default DataGrid;
