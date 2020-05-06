import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const Error = ({ statusCode }) => {
	const { t } = useTranslation(['error']);
	return <p>{statusCode ? t('error:serverError', { statusCode }) : t('error:clientError')}</p>;
};

Error.getInitialProps = async ({ res, err }) => {
	let statusCode;
	if (res) {
		statusCode = res.statusCode;
	} else if (err) {
		statusCode = err.statusCode;
	} else {
		statusCode = 404;
	}
	return { statusCode, namespacesRequired: ['error'] };
};

Error.propTypes = {
	statusCode: PropTypes.number.isRequired,
};

export default Error;
