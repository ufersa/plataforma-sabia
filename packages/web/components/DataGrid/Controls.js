import React, { useState, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import useTranslation from 'next-translate/useTranslation';
import { useTheme } from 'styled-components';
import {
	GridControls,
	ArrowLeftIcon,
	ArrowRightIcon,
	DoubleArrowLeftIcon,
	DoubleArrowRightIcon,
	AscOrderIcon,
	DescOrderIcon,
} from './styles';
import { ORDERING as orderEnum } from '../../utils/enums/api.enum';

const Controls = ({
	data,
	sortOptions,
	handleSortBy,
	currentOrder,
	handlePagination,
	currentPage,
	totalPages,
	totalItems,
	itemsPerPage,
}) => {
	const [sortOption, setSortOption] = useState('');
	const isSelectFocusedRef = useRef(false);
	const { t } = useTranslation(['datagrid']);
	const {
		colors: { lightGray },
	} = useTheme();

	/**
	 * Formats page items count based on current page
	 *
	 * @returns {string} Formatted pagination data, e.g. `1-10 of 20`
	 */
	const getFirstAndLastItem = () => {
		if (currentPage === 1) {
			return {
				firstItem: 1,
				lastItem: data.length,
			};
		}

		if (currentPage === totalPages) {
			return {
				firstItem: totalItems - data.length + 1,
				lastItem: totalItems,
			};
		}

		return {
			firstItem: (currentPage - 1) * itemsPerPage + 1,
			lastItem: data.length + (currentPage - 1) * itemsPerPage,
		};
	};

	const getItemsCountByPage = () => {
		const { firstItem, lastItem } = getFirstAndLastItem();

		return `${firstItem} - ${lastItem} ${t('paginationLabel')} ${totalItems}`;
	};

	const sortByI18 = t('sortByOption');
	const customSelectStyles = useMemo(
		() => ({
			container: (base, state) => {
				isSelectFocusedRef.current = state.isFocused;
				return {
					...base,
					display: 'inline-block',
				};
			},
			placeholder: (base, state) => {
				return {
					...base,
					...(isSelectFocusedRef.current && state.value
						? {}
						: {
								position: 'static',
								top: 'auto',
								transform: 'none',
						  }),
				};
			},
			input: (base, state) => {
				return {
					...base,
					...(isSelectFocusedRef.current && state.value
						? {}
						: {
								position: 'absolute',
						  }),
				};
			},
			singleValue: (base, state) => {
				return {
					...base,
					maxWidth: 'none',
					...(isSelectFocusedRef.current && state.value
						? {}
						: {
								position: 'static',
								top: 'auto',
								transform: 'none',
						  }),
				};
			},
			valueContainer: (base) => ({
				...base,
				alignItems: 'center',
				display: 'flex',

				':before': {
					content: `"${sortByI18}"`,
					color: lightGray,
				},
			}),
		}),
		[sortByI18, lightGray],
	);

	return (
		<GridControls>
			{handleSortBy && (
				<div className="sort-by">
					<Select
						instanceId="bookmarks-ordering-select"
						options={sortOptions}
						styles={customSelectStyles}
						value={sortOption}
						placeholder={t('sortByPlaceholder')}
						onChange={(option) => {
							setSortOption(option);
							handleSortBy(option.value);
						}}
						isSearchable={false}
					/>

					{sortOption && (
						<div className="sort-order">
							<button
								type="button"
								aria-label="Ascending Order"
								onClick={() => handleSortBy(sortOption.value, orderEnum.ASC)}
							>
								<AscOrderIcon
									className={
										currentOrder === orderEnum.ASC ? 'active' : undefined
									}
								/>
							</button>
							<button
								type="button"
								aria-label="Descending Order"
								onClick={() => handleSortBy(sortOption.value, orderEnum.DESC)}
							>
								<DescOrderIcon
									className={
										currentOrder === orderEnum.DESC ? 'active' : undefined
									}
								/>
							</button>
						</div>
					)}
				</div>
			)}

			{handlePagination && (
				<div className="pagination">
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
				</div>
			)}
		</GridControls>
	);
};

Controls.propTypes = {
	data: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number,
		}),
	).isRequired,
	sortOptions: PropTypes.arrayOf(
		PropTypes.shape({
			value: PropTypes.string,
			label: PropTypes.string,
		}),
	),
	handleSortBy: PropTypes.func,
	currentOrder: PropTypes.string,
	handlePagination: PropTypes.func,
	currentPage: PropTypes.number,
	totalPages: PropTypes.number,
	totalItems: PropTypes.number,
	itemsPerPage: PropTypes.number,
};

Controls.defaultProps = {
	sortOptions: [],
	handleSortBy: null,
	currentOrder: '',
	handlePagination: null,
	currentPage: 1,
	totalPages: 1,
	totalItems: 1,
	itemsPerPage: 1,
};

export default Controls;
