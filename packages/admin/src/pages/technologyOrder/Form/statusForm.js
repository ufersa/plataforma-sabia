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
} from 'react-admin';

const StatusForm = ({ record, resource, basePath }) => {
	const [status, setStatus] = useState(record.status);
	const [loading, setLoading] = useState(true);

	const CustomToolbar = () => {
		const notify = useNotify();
		const redirect = useRedirect();
		const dataProvider = useDataProvider();
		const handleSubmit = () => {
			setLoading(true);
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
		};
		return (
			<Toolbar>
				<SaveButton handleSubmitWithRedirect={handleSubmit} disabled={loading} />
			</Toolbar>
		);
	};

	return (
		<SimpleForm record={record} toolbar={<CustomToolbar />}>
			<SelectInput
				label="Status"
				source="status"
				fullWidth
				choices={[
					{ id: 'open', name: 'Open' },
					{ id: 'finish', name: 'Finish' },
					{ id: 'canceled', name: 'Canceled' },
				]}
				parse={(value) => {
					setStatus(value);
					setLoading(value === record.status);
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
	record: { id: 0, status: '' },
	resource: '',
	basePath: '',
};

export default StatusForm;
