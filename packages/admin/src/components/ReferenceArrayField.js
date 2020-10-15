import * as React from 'react';
import PropTypes from 'prop-types';
import { ReferenceArrayField as RAReferenceArrayField } from 'react-admin';

const ReferenceArrayField = ({ record, children, label, source, reference }) => {
	if (record && record[source]) {
		const newRecord = { ...record, [source]: record[source].map((i) => i.id || i) };
		return (
			<RAReferenceArrayField
				record={newRecord}
				label={label}
				reference={reference}
				source={source}
				basePath={reference}
			>
				{children}
			</RAReferenceArrayField>
		);
	}
	return null;
};
ReferenceArrayField.propTypes = {
	record: PropTypes.shape({ id: PropTypes.number }),
	children: PropTypes.shape({}).isRequired,
	source: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	reference: PropTypes.string.isRequired,
};

ReferenceArrayField.defaultProps = {
	record: {},
};
export default ReferenceArrayField;
