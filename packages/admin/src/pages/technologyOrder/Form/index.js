import React from 'react';
import PropTypes from 'prop-types';
import { StatusForm } from '../../../components';

const TechnologyOrdersForm = ({ record, save, resource }) => (
	<StatusForm record={record} save={save} resource={resource} />
);

TechnologyOrdersForm.propTypes = {
	record: PropTypes.shape({ id: PropTypes.number }),
	resource: PropTypes.string,
	save: PropTypes.func,
};

TechnologyOrdersForm.defaultProps = {
	record: { id: 0 },
	resource: '',
	save: () => {},
};

export default TechnologyOrdersForm;
