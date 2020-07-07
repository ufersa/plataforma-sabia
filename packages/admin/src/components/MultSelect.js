import * as React from 'react';
import { useQuery, Loading, Error, SelectArrayInput } from 'react-admin';

const MultSelect = ({ record }) => {
	const taxonomies = useQuery({
		type: 'getList',
		resource: 'taxonomies',
		payload: {
			pagination: {
				page: 1,
				perPage: 999,
			},
			sort: {
				field: 'id',
				order: 'asc',
			},
		},
	});

	const terms = useQuery({
		type: 'getList',
		resource: 'terms',
		payload: {
			pagination: {
				page: 1,
				perPage: 999,
			},
			sort: {
				field: 'id',
				order: 'asc',
			},
		},
	});

	if (taxonomies.loading || terms.loading) return <Loading />;
	if (taxonomies.error || terms.error) return <Error />;
	if (!taxonomies.data || !terms.data) return null;
	const result = [];

	if (!terms.loading && !taxonomies.loading) {
		for (let i = 0; i < taxonomies.data.length; i += 1) {
			const choices = terms.data.filter((term) => term.taxonomy_id === taxonomies.data[i].id);

			if (record.id) {
				const ids = choices.map((term) => term.id);
				// eslint-disable-next-line no-param-reassign
				record[`terms_${i}`] = record.terms.filter((id) => {
					return id ? ids.includes(id) : '';
				});
			}

			result.push(
				<SelectArrayInput
					label={taxonomies.data[i].taxonomy}
					key={i}
					source={`terms_${i}`}
					optionText="term"
					fullWidth
					choices={choices}
				/>,
			);
		}
	}
	return result;
};
export default MultSelect;
