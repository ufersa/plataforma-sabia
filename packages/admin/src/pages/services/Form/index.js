import React from 'react';
import PropTypes from 'prop-types';
import {
	SimpleForm,
	TextInput,
	NumberInput,
	BooleanInput,
	SelectInput,
	AutocompleteArrayInput,
	AutocompleteInput,
	useQuery,
} from 'react-admin';
import statuses from '../../../components/StatusForm/statuses';

const ServicesForm = ({ record, resource, save }) => {
	let newRecord;

	if (record.id) {
		const keywords = record?.keywords.map((keyword) => keyword.slug);

		newRecord = {
			...record,
			keywords,
		};
	} else {
		newRecord = { ...record, keywords: [] };
	}

	const { data: taxonomies } = useQuery({
		type: 'getList',
		resource: `terms`,
		payload: {
			pagination: {
				page: 1,
				perPage: 100,
			},
			sort: {
				field: 'id',
				order: 'asc',
			},
			filter: { taxonomy: 2 },
		},
	});

	const keywords = taxonomies?.map((taxonomy) => ({ id: taxonomy.slug, name: taxonomy.term }));

	const usersResult = useQuery({
		type: 'getList',
		resource: `users`,
		payload: {
			pagination: {
				page: 1,
				perPage: 100,
			},
			sort: {
				field: 'id',
				order: 'asc',
			},
		},
	});

	const users = usersResult?.data?.map((user) => ({ id: user.id, name: user.full_name }));

	return (
		<SimpleForm record={newRecord} save={save} resource={resource}>
			<TextInput source="name" fullWidth resettable />
			<TextInput source="description" fullWidth resettable />
			<AutocompleteInput source="user_id" choices={users} />
			<SelectInput source="type" fullWidth choices={statuses.servicesTypes} />
			<NumberInput source="price" fullWidth />
			<SelectInput source="measure_unit" fullWidth choices={statuses.servicesMeasureUnit} />
			<NumberInput source="likes" fullWidth />
			<TextInput source="payment_message" fullWidth resettable />
			<BooleanInput source="active" />
			<AutocompleteArrayInput source="keywords" choices={keywords} />
		</SimpleForm>
	);
};

ServicesForm.propTypes = {
	record: PropTypes.shape({ id: PropTypes.number, keywords: [] }),
	resource: PropTypes.string,
	save: PropTypes.func,
};

ServicesForm.defaultProps = {
	record: { id: 0, keywords: [] },
	resource: 'service',
	save: () => {},
};

export default ServicesForm;
