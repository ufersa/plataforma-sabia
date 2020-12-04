import React from 'react';
import PropTypes from 'prop-types';
import { SimpleShowLayout, TextField } from 'react-admin';

const Institution = ({ record, resource }) => {
	if (!record.institution) return null;
	return (
		<SimpleShowLayout record={record} resource={resource}>
			<TextField label="Initials" source="institution.initials" />
			<TextField label="Name" source="institution.name" />
			<TextField label="State" source="institution.state" />
			<TextField label="City" source="institution.city" />
			<TextField label="Address" source="institution.address" />
			<TextField label="District" source="institution.district" />
			<TextField label="Zipcode" source="institution.zipcode" />
			<TextField label="CNPJ" source="institution.cnpj" />
		</SimpleShowLayout>
	);
};

Institution.propTypes = {
	record: PropTypes.shape({ institution: PropTypes.shape({ id: PropTypes.number }) }),
	resource: PropTypes.string,
};

Institution.defaultProps = {
	record: { institution: { id: 0 } },
	resource: '',
};

export default Institution;
