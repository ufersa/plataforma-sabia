import * as React from 'react';
import PropTypes from 'prop-types';
import { ChipField as RAChipField } from 'react-admin';

const ChipField = ({ record, source }) => {
	if (record && record[source] !== undefined) {
		return <RAChipField record={record} source={source} />;
	}
	return null;
};
ChipField.propTypes = {
	record: PropTypes.shape({}),
	source: PropTypes.string,
};

ChipField.defaultProps = {
	record: {},
	source: '',
};
export default ChipField;
