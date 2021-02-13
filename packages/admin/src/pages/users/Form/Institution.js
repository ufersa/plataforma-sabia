import React from 'react';
import PropTypes from 'prop-types';
import { SimpleShowLayout, TextField, ReferenceField } from 'react-admin';

const Institution = ({ record, resource, basePath }) => {
	if (!record.institution) return null;
	return (
		<SimpleShowLayout record={record} resource={resource} basePath={basePath}>
			<ReferenceField
				label="labels.description"
				basePath="/institutions"
				source="institution.id"
				reference="institutions"
			>
				<TextField source="name" />
			</ReferenceField>
			<TextField source="institution.initials" />
			<TextField source="institution.state" />
			<TextField source="institution.city" />
			<TextField source="institution.address" />
			<TextField source="institution.district" />
			<TextField source="institution.zipcode" />
			<TextField source="institution.cnpj" />
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
