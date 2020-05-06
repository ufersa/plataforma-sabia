import React from 'react';
import PropTypes from 'prop-types';
import { List, Datagrid, TextField, ImageField, UrlField, DateField } from 'react-admin';

const TechnologiesList = ({ basePath, resource, hasCreate, hasEdit, hasList, hasShow }) => (
	<List
		basePath={basePath}
		resource={resource}
		hasCreate={hasCreate}
		hasEdit={hasEdit}
		hasList={hasList}
		hasShow={hasShow}
		perPage={100}
	>
		<Datagrid rowClick="edit">
			<TextField source="id" />
			<TextField source="title" />
			<ImageField source="logo" title="title" />
			<TextField source="category" />
			<UrlField source="site_url" />
			{/* <TextField source="description" /> */}
			<TextField source="private" />
			<TextField source="price" />
			<TextField source="place" />
			<TextField source="likes" />
			<TextField source="weeks" />
			<TextField source="region" />
			<DateField source="created_at" />
			<DateField source="updated_at" />
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
