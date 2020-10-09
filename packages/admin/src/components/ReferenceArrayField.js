import * as React from 'react';
import PropTypes from 'prop-types';
import { ReferenceArrayField as RAReferenceArrayField } from 'react-admin';

const ReferenceArrayField = ({ record, basePath, children, label, source, reference }) => {
	if (record && record[source]) {
		const newRecord = { ...record, [source]: record[source].map((i) => i.id || i) }
		return (
			<RAReferenceArrayField
				record={record}
				label={label}
				reference={reference}
				source={source}
				basePath={basePath}
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
	basePath: PropTypes.string,
};

ReferenceArrayField.defaultProps = {
	record: {},
	basePath: '',
};
export default ReferenceArrayField;
