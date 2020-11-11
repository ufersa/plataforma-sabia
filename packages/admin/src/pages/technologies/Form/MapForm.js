import React from 'react';
import PropTypes from 'prop-types';
import { GMapField } from '@fusionworks/ra-google-maps-input';
import {
	SimpleShowLayout,
	useQuery,
	Error,
	Loading,
	ArrayField,
	Datagrid,
	TextField,
} from 'react-admin';

const MapForm = ({ record, resource }) => {
	const { loading, error, data } = useQuery({
		type: 'getList',
		resource: `technologies/${record.id}/terms`,
		payload: {
			filter: { taxonomy: 'google_place' },
			embed: true,
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
	if (error) return <Error />;
	if (loading) return <Loading />;

	const coordinates = [];
	data.map(({ metas }) => {
		return metas.map(({ meta_key, meta_value }) => {
			if (meta_key === 'latitude') {
				coordinates.push({ lat: 0, lng: 0 });
				coordinates[coordinates.length - 1].lat = Number(meta_value);
			}
			if (meta_key === 'longitude') {
				coordinates[coordinates.length - 1].lng = Number(meta_value);
			}
			return null;
		});
	});

	const gmk = window.env.REACT_APP_GOOGLE_MAPS_KEY;

	return (
		<SimpleShowLayout resource={resource} record={{ detail: data, coordinates }}>
			<ArrayField source="detail" addLabel={false}>
				<Datagrid>
					<TextField source="term" />
					<ArrayField source="metas">
						<Datagrid>
							<TextField source="meta_key" />
							<TextField source="meta_value" />
						</Datagrid>
					</ArrayField>
				</Datagrid>
			</ArrayField>
			{coordinates.length && <GMapField source="coordinates" googleKey={gmk} />}
		</SimpleShowLayout>
	);
};
MapForm.propTypes = {
	record: PropTypes.shape({ id: PropTypes.number }),
	resource: PropTypes.string,
};

MapForm.defaultProps = {
	record: { id: null },
	resource: '',
};

export default MapForm;
