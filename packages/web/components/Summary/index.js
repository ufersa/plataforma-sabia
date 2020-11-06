import React from 'react';
import PropTypes from 'prop-types';
import { Box, Text } from './styles';
import Price from '../Price';
import { formatCurrencyToInt } from '../../utils/helper';

const Summary = ({
	form,
	collection,
	valueField = 'value',
	quantityField = 'quantity',
	fields,
}) => {
	const collectionData = form.watch(collection);

	const totalCalculator = (accumulator = 0, currentValue) => {
		if (currentValue[valueField] && currentValue[quantityField]) {
			return (
				accumulator +
				formatCurrencyToInt(currentValue[valueField]) *
					parseInt(currentValue[quantityField], 10)
			);
		}

		return accumulator;
	};

	const total =
		collectionData?.length && fields?.length ? collectionData.reduce(totalCalculator, 0) : 0;

	return (
		<Box>
			{total ? (
				<Text>
					<Price amount={total} />
				</Text>
			) : null}
		</Box>
	);
};

Summary.propTypes = {
	collection: PropTypes.string.isRequired,
	valueField: PropTypes.string,
	quantityField: PropTypes.string,
	form: PropTypes.shape({
		control: PropTypes.shape({}).isRequired,
		watch: PropTypes.func.isRequired,
	}).isRequired,
	fields: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Summary.defaultProps = {
	quantityField: 'quantity',
	valueField: 'value',
};

export default Summary;
