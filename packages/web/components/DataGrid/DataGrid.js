import React from 'react';
import PropTypes from 'prop-types';
import { Title } from '../Common';
import { Link } from '../Link';
import * as S from './styles';

const DataGrid = ({ data, title }) => {
	const headings = data.length > 0 ? Object.keys(data[0]) : [];

	return (
		<S.Container>
			{title && (
				<Title align="left" noPadding noMargin>
					{title}
				</Title>
			)}
			{data.length > 0 ? (
				<S.Grid>
					<S.Row header columns={headings.length}>
						{headings.map((heading) => (
							<S.Item key={heading} data-name={heading}>
								{heading}
							</S.Item>
						))}
					</S.Row>
					{data.map((row, index) => {
						const cells = Object.entries(row);
						return (
							<S.Row columns={cells.length} even={(index + 1) % 2 === 0}>
								{cells.map(([key, value]) => (
									<Link key={row.id} href={`/technology/${row.id}/edit`}>
										<S.Item key={key} data-name={key}>
											{value}
										</S.Item>
									</Link>
								))}
							</S.Row>
						);
					})}
				</S.Grid>
			) : (
				<S.NoDataContainer>Nao há dados para exibir no momento.</S.NoDataContainer>
			)}
		</S.Container>
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
