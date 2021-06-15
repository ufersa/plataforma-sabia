import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import { useDataProvider, useNotify, useTranslate, useRefresh } from 'react-admin';

const ButtonDeleteUpload = ({ record }) => {
	const notify = useNotify();
	const dataProvider = useDataProvider();
	const translate = useTranslate();
	const refresh = useRefresh();
	const handleSubmit = () =>
		dataProvider
			.delete('uploads', { id: record.id })
			.then(() => {
				notify('sabia.notification.delete_sucess');
				refresh();
			})
			.catch(() => {
				notify('ra.notification.http_error', 'warning');
				refresh();
			});
	return (
		<Button
			title={translate('ra.action.delete')}
			onClick={handleSubmit}
			startIcon={<DeleteIcon />}
			style={{ color: 'red' }}
		/>
	);
};

ButtonDeleteUpload.propTypes = {
	record: PropTypes.shape({ id: PropTypes.number }),
};

ButtonDeleteUpload.defaultProps = {
	record: { id: null },
};

export default ButtonDeleteUpload;
