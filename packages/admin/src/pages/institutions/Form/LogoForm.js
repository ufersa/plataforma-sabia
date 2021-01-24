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
} from 'react-admin';

const LogoForm = ({ record, save, resource, basePath }) => {
	const [logo, setLogo] = useState();
	const [loading, setLoading] = useState(true);

	const CustomToolbar = () => {
		const notify = useNotify();
		const redirect = useRedirect();
		const dataProvider = useDataProvider();
		const handleSubmit = () => {
			setLoading(true);
			dataProvider
				.create('uploads', {
					data: {
						files: [logo],
						meta: {
							object: resource,
							object_id: record.id,
						},
						// files[0]: (binary) meta: { "object": "technologies", "object_id": 2 }
					},
				})
				.then(() => {
					redirect(basePath);
				})
				.catch(() => {
					notify('ra.notification.http_error', 'warning');
					setLoading(false);
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
				source="logo"
				accept="image/*"
				parse={(value) => {
					setLogo(value);
					setLoading(!!logo);
					return value;
				}}
			>
				<ImageField source="src" title="title" />
			</ImageInput>
		</SimpleForm>
	);
};

LogoForm.propTypes = {
	record: PropTypes.shape({ id: PropTypes.number }),
	resource: PropTypes.string,
	basePath: PropTypes.string,
	save: PropTypes.func,
};

LogoForm.defaultProps = {
	record: { id: null },
	resource: '',
	basePath: '',
	save: () => {},
};

export default LogoForm;
