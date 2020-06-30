import React from 'react';
import PropTypes from 'prop-types';
import {
	List,
	Datagrid,
	TextField,
	ImageField,
	ReferenceArrayField,
	SingleFieldList,
	ChipField,
	EditButton,
	DeleteWithConfirmButton,
} from 'react-admin';

const TechnologiesList = ({ basePath, resource, hasCreate, hasEdit, hasList, hasShow }) => (
	<List
		basePath={basePath}
		resource={resource}
		hasCreate={hasCreate}
		hasEdit={hasEdit}
		hasList={hasList}
		hasShow={hasShow}
		perPage={25}
	>
		<Datagrid>
			<TextField source="id" />
			<TextField source="title" />
			<ImageField source="thumbnail" title="title" />
			<TextField source="description" />
			<TextField source="private" />
			<TextField source="patent" />
			<TextField source="likes" />
			<TextField source="patent_number" />
			<TextField source="primary_purpose" />
			<TextField source="secondary_purpose" />
			<TextField source="application_mode" />
			<TextField source="application_examples" />
			<TextField source="installation_time" />
			<TextField source="solves_problem" />
			<TextField source="entailes_problem" />
			<TextField source="requirements" />
			<TextField source="risks" />
			<TextField source="contribution" />
			<TextField source="status" />
			<ReferenceArrayField label="Terms" reference="terms" source="terms">
				<SingleFieldList>
					<ChipField source="term" />
				</SingleFieldList>
			</ReferenceArrayField>
			<EditButton />
			<DeleteWithConfirmButton />
		</Datagrid>
	</List>
);
TechnologiesList.propTypes = {
	resource: PropTypes.string.isRequired,
	basePath: PropTypes.string.isRequired,
	hasCreate: PropTypes.bool.isRequired,
	hasEdit: PropTypes.bool.isRequired,
	hasList: PropTypes.bool.isRequired,
	hasShow: PropTypes.bool.isRequired,
};

export default TechnologiesList;
