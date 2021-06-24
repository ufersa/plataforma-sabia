import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { useDataProvider, useNotify, useTranslate } from 'react-admin';

const ResendConfirmationEmail = ({ record }) => {
	const notify = useNotify();
	const dataProvider = useDataProvider();
	const translate = useTranslate();
	const handleSubmit = () => {
		dataProvider
			.create('auth/resend-confirmation-email', {
				data: {
					email: record.email,
					scope: 'web',
				},
			})
			.then(() => {
				notify('sabia.notification.send_email_sucess');
			})
			.catch(() => {
				notify('ra.notification.http_error', 'warning');
			});
	};

	if (record?.status === 'verified') return <span />;
	return (
		<Button variant="contained" color="default" onClick={handleSubmit}>
			{translate('labels.resend_token')}
		</Button>
	);
};

ResendConfirmationEmail.propTypes = {
	record: PropTypes.shape({ status: PropTypes.string, email: PropTypes.string }),
};

ResendConfirmationEmail.defaultProps = {
	record: { status: null, email: null },
};

export default ResendConfirmationEmail;
