import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { useDataProvider, useNotify, useTranslate, useRefresh } from 'react-admin';

const ButtonSetThumbnail = ({ record, thumbnail_id }) => {
	const notify = useNotify();
	const dataProvider = useDataProvider();
	const translate = useTranslate();
	const refresh = useRefresh();
	const handleSubmit = () =>
		dataProvider
			.update(`technologies`, {
				id: record.id,
				data: { thumbnail_id },
			})
			.then(() => {
				notify('sabia.notification.thumbnail_defined');
				refresh();
			})
			.catch(() => {
				notify('ra.notification.http_error', 'warning');
				refresh();
			});
	return (
		<Button
			onClick={handleSubmit}
			style={{ backgrondColor: 'red' }}
			endIcon={<CheckCircleIcon />}
			color="secondary"
		>
			{translate('resources.technologies.buttons.thumbnail')}
		</Button>
	);
};

ButtonSetThumbnail.propTypes = {
	record: PropTypes.shape({ id: PropTypes.number, thumbnail_id: PropTypes.number }),
	thumbnail_id: PropTypes.number,
};

ButtonSetThumbnail.defaultProps = {
	record: { id: null },
	thumbnail_id: null,
};

export default ButtonSetThumbnail;
