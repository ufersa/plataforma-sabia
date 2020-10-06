import * as React from 'react';
import PropTypes from 'prop-types';
import { ReferenceArrayField as RAReferenceArrayField, useQuery } from 'react-admin';

const ReferenceArrayField = ({
	record,
	basePath,
	children,
	label,
	source,
	reference,
	resource,
}) => {
	const getSource = useQuery({
		type: 'getList',
		resource: `${resource}/${record.id}/${source}`,
		payload: {
			pagination: {
				page: 1,
				perPage: 100,
			},
			sort: {
				field: 'id',
				order: 'asc',
			},
		},
	});

	if (!getSource.loading) {
		record[source] = getSource.data.map((i) => i.id || i);
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
	resource: PropTypes.string,
	label: PropTypes.string.isRequired,
	reference: PropTypes.string.isRequired,
	basePath: PropTypes.string,
};

ReferenceArrayField.defaultProps = {
	record: {},
	resource: '',
	basePath: '',
};
export default ReferenceArrayField;
