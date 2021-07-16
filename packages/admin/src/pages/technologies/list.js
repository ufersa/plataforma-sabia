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
	useQuery,
	Error,
	Loading,
} from 'react-admin';

import { ChipField, ReferenceArrayField, TechnologyFilterBar, StatusField } from '../../components';

const TechnologiesList = ({ basePath, resource, hasCreate, hasEdit, hasList, hasShow }) => {
	const { loading, error, data: stage } = useQuery({
		type: 'getOne',
		resource: 'taxonomies/stage',
		payload: {
			id: '',
			pagination: {
				page: 1,
				perPage: 1,
			},
			sort: {
				field: 'id',
				order: 'asc',
			},
		},
	});
	if (error) return <Error />;
	if (loading) return <Loading />;
	return (
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
				<ReferenceArrayField label="labels.responsibles" reference="users" source="users">
					<SingleFieldList>
						<ChipField source="full_name" />
					</SingleFieldList>
				</ReferenceArrayField>
				<FunctionField
					label="TRL"
					render={({ terms }) => {
						const trl = terms?.find(({ taxonomy_id }) => taxonomy_id === stage.id);
						return trl?.term;
					}}
				/>
				<StatusField source="status" />
				<DateField source="created_at" />
				<EditButton label="" variant="contained" color="primary" />
				<DeleteWithConfirmButton label="" variant="contained" color="default" />
			</Datagrid>
		</List>
	);
};
TechnologiesList.propTypes = {
	resource: PropTypes.string.isRequired,
	basePath: PropTypes.string.isRequired,
	hasCreate: PropTypes.bool.isRequired,
	hasEdit: PropTypes.bool.isRequired,
	hasList: PropTypes.bool.isRequired,
	hasShow: PropTypes.bool.isRequired,
};

export default TechnologiesList;
