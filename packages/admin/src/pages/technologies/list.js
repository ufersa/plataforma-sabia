import React from 'react';
import PropTypes from 'prop-types';
import {
	List,
	Datagrid,
	TextField,
	SingleFieldList,
	DateField,
	EditButton,
	DeleteWithConfirmButton,
	FunctionField,
} from 'react-admin';

import { ChipField, ReferenceArrayField, TechnologyFilterBar } from '../../components';

const TechnologiesList = ({ basePath, resource, hasCreate, hasEdit, hasList, hasShow }) => (
	<List
		basePath={basePath}
		resource={resource}
		hasCreate={hasCreate}
		hasEdit={hasEdit}
		hasList={hasList}
		hasShow={hasShow}
		perPage={25}
		filters={<TechnologyFilterBar />}
	>
		<Datagrid>
			<TextField source="id" />
			<TextField source="title" />
			<ReferenceArrayField label="Responsibles" reference="users" source="users">
				<SingleFieldList>
					<ChipField source="full_name" />
				</SingleFieldList>
			</ReferenceArrayField>
			<FunctionField
				label="TRL"
				render={({ terms }) => {
					const trl = terms?.find(({ taxonomy_id }) => taxonomy_id === 4);
					return trl?.term;
				}}
			/>
			<TextField source="status" />
			<DateField source="created_at" />
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
