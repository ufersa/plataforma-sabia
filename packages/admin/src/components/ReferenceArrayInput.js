import * as React from 'react';
import PropTypes from 'prop-types';
import { ReferenceArrayInput as RAReferenceArrayInput } from 'react-admin';

const ReferenceArrayInput = ({
	record,
	resource,
	children,
	label,
	source,
	reference,
	sort,
	filter,
	validate,
}) => {
	record[source] = record[source]?.map((choice) => choice.id || choice);
	return (
		<RAReferenceArrayInput
			record={record}
			resource={resource}
			label={label}
			reference={reference}
			source={source}
			basePath={reference}
			fullWidth
			perPage={100}
			sort={sort}
			filter={filter}
			validate={validate}
			format={(values) => values?.map((value) => value.id || value)}
		>
			{children}
		</RAReferenceArrayInput>
	);
};
ReferenceArrayInput.propTypes = {
	record: PropTypes.shape({ id: PropTypes.number }),
	children: PropTypes.shape({}).isRequired,
	source: PropTypes.string.isRequired,
	resource: PropTypes.string,
	label: PropTypes.string,
	reference: PropTypes.string.isRequired,
	filter: PropTypes.shape({}),
	validate: PropTypes.oneOfType([PropTypes.func, PropTypes.arrayOf(PropTypes.func)]),
	sort: PropTypes.shape({
		field: PropTypes.string,
		order: PropTypes.oneOf(['ASC', 'DESC']),
	}),
};

ReferenceArrayInput.defaultProps = {
	record: {},
	label: undefined,
	resource: '',
	filter: {},
	validate: {},
	sort: { field: 'id', order: 'ASC' },
};
export default ReferenceArrayInput;
