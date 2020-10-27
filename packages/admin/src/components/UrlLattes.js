import React from 'react';
import PropTypes from 'prop-types';
import { UrlField } from 'react-admin';

const UrlLattes = ({ record, source }) => {
	const newRecord = { url: `http://lattes.cnpq.br/${record[source]}` };
	return <UrlField record={newRecord} source="url" />;
};

UrlLattes.propTypes = {
	record: PropTypes.shape(),
	source: PropTypes.string,
};

UrlLattes.defaultProps = {
	record: {},
	source: '',
};
export default UrlLattes;
