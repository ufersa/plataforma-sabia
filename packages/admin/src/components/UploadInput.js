import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
	SimpleForm,
	ImageInput,
	ImageField,
	useNotify,
	useRefresh,
	useDataProvider,
	Toolbar,
	SaveButton,
	Loading,
	useQuery,
	FileInput,
} from 'react-admin';

const UploadInput = ({ record, save, resource, source, image, preview }) => {
	const [files, setFiles] = useState([]);
	const [loading, setLoading] = useState(true);

	const current_file = useQuery({
		type: 'getList',
		resource: `uploads`,
		payload: {
			filter: { object: resource, object_id: record.id },
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
	const CustomToolbar = () => {
		const notify = useNotify();
		const refresh = useRefresh();
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
					if (source) {
						dataProvider
							.update(resource, {
								data: { [source]: response[0].id },
								id: record.id,
							})
							.then(() => refresh())
							.catch(() => {
								notify('ra.notification.http_error', 'warning');
								refresh();
							});
					} else {
						refresh();
					}
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
	const parse = (value) => {
		setFiles([value]);
		setLoading(!!files.length);
		return value;
	};
	return (
		<SimpleForm record={record} resource={resource} save={save} toolbar={<CustomToolbar />}>
			{image ? (
				<ImageInput source="uploadInput" accept="image/*" parse={parse}>
					<ImageField source="src" title="title" />
				</ImageInput>
			) : (
				<FileInput source="files" parse={parse} accept="application/pdf">
					<ImageField source="src" title="title" />
				</FileInput>
			)}

			{image && preview && (
				<ImageField
					label="labels.current_image"
					source="preview"
					record={{ preview: current_file?.data?.slice(-1)[0]?.url }}
				/>
			)}
		</SimpleForm>
	);
};

UploadInput.propTypes = {
	record: PropTypes.shape({ id: PropTypes.number }),
	resource: PropTypes.string,
	save: PropTypes.func,
	source: PropTypes.string,
	image: PropTypes.bool,
	preview: PropTypes.bool,
};

UploadInput.defaultProps = {
	record: { id: null },
	resource: '',
	source: '',
	save: () => {},
	image: false,
	preview: false,
};

export default UploadInput;
