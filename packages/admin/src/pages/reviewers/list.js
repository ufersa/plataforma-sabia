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
} from 'react-admin';
import ChipField from '../../components/ChipField';
import ReferenceArrayField from '../../components/ReferenceArrayField';
import UrlLattes from '../../components/UrlLattes';

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
			<TextField source="status" />
			<ReferenceField label="User" source="user_id" reference="users">
				<TextField source="full_name" />
			</ReferenceField>
			<ReferenceField label="Lattes" source="user_id" reference="users" link={false}>
				<UrlLattes source="lattes_id" />
			</ReferenceField>
			<ReferenceArrayField label="Terms" reference="terms" source="categories">
				<SingleFieldList>
					<ChipField source="term" />
				</SingleFieldList>
			</ReferenceArrayField>
			<DateField label="Requested" showTime source="created_at" />
			<DateField label="Updated" showTime source="updated_at" />
			<EditButton />
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
