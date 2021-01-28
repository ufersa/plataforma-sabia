import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
	SimpleForm,
	ImageInput,
	ImageField,
	useNotify,
	useRedirect,
	useDataProvider,
	Toolbar,
	SaveButton,
	Loading,
	useQuery,
} from 'react-admin';

const UploadInput = ({ record, save, resource, source }) => {
	const [files, setFiles] = useState([]);
	const [loading, setLoading] = useState(true);

	const current_file = useQuery({
		type: 'getList',
		resource: `uploads`,
		payload: {
			filter: { object_id: record.id },
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
	if (current_file.loading) return <Loading />;
	record[source] = current_file?.data?.slice(-1)[0]?.url;

	const CustomToolbar = () => {
		const notify = useNotify();
		const redirect = useRedirect();
		const dataProvider = useDataProvider();
		const handleSubmit = () => {
			setLoading(true);
			dataProvider
				.upload('uploads', {
					data: {
						meta: {
							object: resource,
							object_id: record.id,
						},
						files,
					},
				})
				.then(({ data: response }) => {
					dataProvider
						.update(resource, {
							data: { ...record, [source]: response[0].id },
							id: record.id,
						})
						.then(() => redirect(`/${resource}/${resource.id}`))
						.catch(() => redirect(`/${resource}`));
				})
				.catch(() => {
					notify('ra.notification.http_error', 'warning');
				});
		};
		return (
			<Toolbar>
				<SaveButton handleSubmitWithRedirect={handleSubmit} disabled={loading} />
			</Toolbar>
		);
	};
	return (
		<SimpleForm record={record} resource={resource} save={save} toolbar={<CustomToolbar />}>
			<ImageInput
				label=""
				source="uploadInput"
				accept="image/*"
				parse={(value) => {
					setFiles([value]);
					setLoading(!!files.lenght);
					return value;
				}}
			>
				<ImageField source="src" title="title" />
			</ImageInput>
			<ImageField source={source} />
		</SimpleForm>
	);
};

UploadInput.propTypes = {
	record: PropTypes.shape({ id: PropTypes.number }),
	resource: PropTypes.string,
	save: PropTypes.func,
	source: PropTypes.string,
};

UploadInput.defaultProps = {
	record: { id: null },
	resource: '',
	source: '',
	save: () => {},
};

export default UploadInput;
