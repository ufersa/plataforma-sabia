import React from 'react';
import PropTypes from 'prop-types';
import { Box, Text } from './styles';

const Summary = ({ form, collection, valueField = 'value', quantityField = 'quantity' }) => {
	const collectionData = form.watch(collection);

	const totalCalculator = (accumulator = 0, currentValue) => {
		if (currentValue[valueField] && currentValue[quantityField]) {
			return (
				accumulator +
				parseFloat(currentValue[valueField]).toFixed(2) *
					parseInt(currentValue[quantityField], 10)
			);
		}

		return accumulator;
	};

	return (
		<Box>
			<Text>
				R${' '}
				{collectionData && collectionData.length
					? collectionData.reduce(totalCalculator, 0)
					: ''}
			</Text>
		</Box>
	);
};

Summary.propTypes = {
	collection: PropTypes.string.isRequired,
	valueField: PropTypes.string,
	quantityField: PropTypes.string,
	form: PropTypes.shape({
		control: PropTypes.shape({}).isRequired,
		watch: PropTypes.shape({}).isRequired,
	}).isRequired,
};

Summary.defaultProps = {
	quantityField: 'quantity',
	valueField: 'value',
};

export default Summary;
