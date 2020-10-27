import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
	SimpleForm,
	SelectInput,
	useNotify,
	useRedirect,
	useDataProvider,
	SaveButton,
	Toolbar,
	ReferenceField,
	TextField,
	required,
} from 'react-admin';

const StatusForm = ({ record, resource, basePath }) => {
	const [status, setStatus] = useState(record.status);
	const [loading, setLoading] = useState(true);

	const CustomToolbar = () => {
		const notify = useNotify();
		const redirect = useRedirect();
		const dataProvider = useDataProvider();
		const submit = () =>
			dataProvider
				.update(`${resource}/${record.id}/update-status`, { id: '', data: { status } })
				.then(() => {
					notify('ra.notification.updated', 'info', { smart_count: 1 });
					redirect('list', basePath);
				})
				.catch(() => {
					notify('ra.notification.http_error', 'warning');
					setLoading(false);
				});

		const handleSubmit = () => {
			setLoading(true);
			submit();
		};
		return (
			<Toolbar>
				<SaveButton handleSubmitWithRedirect={handleSubmit} disabled={loading} />
			</Toolbar>
		);
	};

	return (
		<SimpleForm basePath={basePath} record={record} toolbar={<CustomToolbar />}>
			<ReferenceField label="User" source="user_id" reference="users">
				<TextField source="full_name" />
			</ReferenceField>
			<SelectInput
				label="Status"
				source="status"
				fullWidth
				validate={[required()]}
				choices={[
					{ id: 'pending', name: 'Pending' },
					{ id: 'approved', name: 'Approved' },
					{ id: 'rejected', name: 'Rejected' },
				]}
				parse={(value) => {
					setStatus(value);
					setLoading(!loading);
					return value;
				}}
			/>
		</SimpleForm>
	);
};

StatusForm.propTypes = {
	record: PropTypes.shape({ id: PropTypes.number, status: PropTypes.string }),
	resource: PropTypes.string,
	basePath: PropTypes.string,
};

StatusForm.defaultProps = {
	record: { id: null, status: '' },
	resource: '',
	basePath: '',
};

export default StatusForm;
