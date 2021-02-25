import * as React from 'react';
import PropTypes from 'prop-types';
import { TextField, useTranslate } from 'react-admin';

const StatusField = ({ record }) => {
	const translate = useTranslate();
	if (record?.status) {
		return (
			<TextField
				source="status"
				record={{ status: translate(`statuses.${record.status}`) }}
			/>
		);
	}
	return null;
};
StatusField.propTypes = {
	record: PropTypes.shape({ status: PropTypes.string }),
};

StatusField.defaultProps = {
	record: { status: '' },
};
export default StatusField;
