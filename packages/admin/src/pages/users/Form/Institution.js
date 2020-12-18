import React from 'react';
import PropTypes from 'prop-types';
import { SimpleShowLayout, TextField, ReferenceField } from 'react-admin';

const Institution = ({ record, resource, basePath }) => {
	if (!record.institution) return null;
	return (
		<SimpleShowLayout record={record} resource={resource} basePath={basePath}>
			<ReferenceField
				label="Name"
				basePath="/institutions"
				source="institution.id"
				reference="institutions"
			>
				<TextField source="name" />
			</ReferenceField>
			<TextField label="Initials" source="institution.initials" />
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
	basePath: PropTypes.string,
};

Institution.defaultProps = {
	record: { institution: { id: 0 } },
	resource: '',
	basePath: '',
};

export default Institution;
