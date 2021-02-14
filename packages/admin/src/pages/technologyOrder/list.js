import React from 'react';
import PropTypes from 'prop-types';
import {
	List,
	Datagrid,
	TextField,
	ReferenceField,
	EditButton,
	DateField,
	ArrayField,
	useTranslate,
	FunctionField,
} from 'react-admin';
import FilterBar from './FilterBar';

const TechnologyOrdersList = ({ basePath, resource, hasCreate, hasEdit, hasList, hasShow }) => {
	const translate = useTranslate();
	return (
		<List
			basePath={basePath}
			resource={resource}
			hasCreate={hasCreate}
			hasEdit={hasEdit}
			hasList={hasList}
			hasShow={hasShow}
			perPage={25}
			filters={<FilterBar />}
		>
			<Datagrid>
				<TextField source="id" />
				<ReferenceField
					basePath="/technologies"
					source="technology_id"
					reference="technologies"
				>
					<TextField source="title" />
				</ReferenceField>
				<ArrayField label="labels.responsibles" source="technology.users">
					<Datagrid>
						<ReferenceField
							label="labels.full_name"
							basePath="/users"
							source="id"
							reference="users"
						>
							<TextField source="full_name" />
						</ReferenceField>
						<TextField label="" source="pivot.role" />
					</Datagrid>
				</ArrayField>
				<FunctionField render={({ status }) => translate(`statuses.${status}`)} />
				<ReferenceField
					label="labels.buyer"
					basePath="/users"
					source="user_id"
					reference="users"
				>
					<TextField source="full_name" />
				</ReferenceField>
				<TextField source="quantity" />
				<TextField source="unit_value" />
				<DateField showTime source="created_at" />
				<DateField showTime source="updated_at" />
				<EditButton />
			</Datagrid>
		</List>
	);
};
TechnologyOrdersList.propTypes = {
	resource: PropTypes.string.isRequired,
	basePath: PropTypes.string.isRequired,
	hasCreate: PropTypes.bool.isRequired,
	hasEdit: PropTypes.bool.isRequired,
	hasList: PropTypes.bool.isRequired,
	hasShow: PropTypes.bool.isRequired,
};

export default TechnologyOrdersList;
