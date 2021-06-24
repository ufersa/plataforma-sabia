import React from 'react';
import PropTypes from 'prop-types';
import {
	List,
	Datagrid,
	TextField,
	EditButton,
	ReferenceField,
	SingleFieldList,
	DateField,
	DeleteWithConfirmButton,
} from 'react-admin';
import { ChipField, ReferenceArrayField, UrlLattes, StatusField } from '../../components';

const ReviewersList = ({ basePath, resource, hasCreate, hasEdit, hasList, hasShow }) => (
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
			<StatusField source="status" />
			<ReferenceField source="user_id" reference="users">
				<TextField source="full_name" />
			</ReferenceField>
			<ReferenceField label="Lattes" source="user_id" reference="users" link={false}>
				<UrlLattes source="lattes_id" />
			</ReferenceField>
			<ReferenceArrayField label="labels.categories" reference="terms" source="categories">
				<SingleFieldList>
					<ChipField source="term" />
				</SingleFieldList>
			</ReferenceArrayField>
			<DateField showTime source="created_at" />
			<DateField showTime source="updated_at" />
			<EditButton label="" variant="contained" color="primary" />
			<DeleteWithConfirmButton label="" variant="contained" color="default" />
		</Datagrid>
	</List>
);
ReviewersList.propTypes = {
	resource: PropTypes.string.isRequired,
	basePath: PropTypes.string.isRequired,
	hasCreate: PropTypes.bool.isRequired,
	hasEdit: PropTypes.bool.isRequired,
	hasList: PropTypes.bool.isRequired,
	hasShow: PropTypes.bool.isRequired,
};

export default ReviewersList;
