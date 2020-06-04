import React from 'react';
import PropTypes from 'prop-types';
import {
	List,
	Datagrid,
	TextField,
	EditButton,
	DeleteWithConfirmButton,
	ReferenceField,
} from 'react-admin';

const TermsList = ({ basePath, resource, hasCreate, hasEdit, hasList, hasShow }) => (
	<List
		basePath={basePath}
		resource={resource}
		hasCreate={hasCreate}
		hasEdit={hasEdit}
		hasList={hasList}
		hasShow={hasShow}
		perPage={100}
	>
		<Datagrid>
			<TextField source="id" />
			<TextField source="term" />
			<TextField source="slug" />
			<ReferenceField label="Parent" source="parent_id" reference="terms">
				<TextField source="term" />
			</ReferenceField>
			<ReferenceField label="Taxonomy" source="taxonomy_id" reference="taxonomies">
				<TextField source="taxonomy" />
			</ReferenceField>
			<EditButton />
			<DeleteWithConfirmButton />
		</Datagrid>
	</List>
);
TermsList.propTypes = {
	resource: PropTypes.string.isRequired,
	basePath: PropTypes.string.isRequired,
	hasCreate: PropTypes.bool.isRequired,
	hasEdit: PropTypes.bool.isRequired,
	hasList: PropTypes.bool.isRequired,
	hasShow: PropTypes.bool.isRequired,
};

export default TermsList;
