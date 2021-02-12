import React from 'react';
import PropTypes from 'prop-types';
import {
	List,
	Datagrid,
	TextField,
	SingleFieldList,
	EditButton,
	DeleteWithConfirmButton,
} from 'react-admin';

import { ChipField, ReferenceArrayField } from '../../components';

const RolesList = ({ basePath, resource, hasCreate, hasEdit, hasList, hasShow }) => (
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
			<TextField source="role" />
			<TextField source="description" />
			<ReferenceArrayField reference="permissions" source="permissions">
				<SingleFieldList>
					<ChipField source="permission" />
				</SingleFieldList>
			</ReferenceArrayField>
			<EditButton />
			<DeleteWithConfirmButton />
		</Datagrid>
	</List>
);
RolesList.propTypes = {
	resource: PropTypes.string.isRequired,
	basePath: PropTypes.string.isRequired,
	hasCreate: PropTypes.bool.isRequired,
	hasEdit: PropTypes.bool.isRequired,
	hasList: PropTypes.bool.isRequired,
	hasShow: PropTypes.bool.isRequired,
};

export default RolesList;
