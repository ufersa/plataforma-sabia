import React from 'react';
import PropTypes from 'prop-types';
import { BooleanField } from 'react-admin';

const BooleanNumField = ({ record = {}, source }) => {
	const theRecord = { ...record };

	theRecord[`${source}Num`] = !!record[source];

	return <BooleanField record={theRecord} source={`${source}Num`} />;
};

BooleanNumField.propTypes = {
	record: PropTypes.shape({}),
	source: PropTypes.string,
};

BooleanNumField.defaultProps = {
	record: {},
	source: '',
};

export default BooleanNumField;
