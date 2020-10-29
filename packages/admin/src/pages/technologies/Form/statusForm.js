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

const StatusForm = ({ record, resource }) => {
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
					redirect('list');
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
		<SimpleForm record={record} toolbar={<CustomToolbar />}>
			<SelectInput
				label="Status"
				source="status"
				fullWidth
				choices={[
					{ id: 'draft', name: 'Draft' },
					{ id: 'pending', name: 'Pending' },
					{ id: 'in_review', name: 'In review' },
					{ id: 'requested_changes', name: 'Requested changes' },
					{ id: 'changes_made', name: 'Changes made' },
					{ id: 'approved', name: 'Approved' },
					{ id: 'rejected', name: 'Rejected' },
					{ id: 'published', name: 'Published' },
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
};

StatusForm.defaultProps = {
	record: { id: '', status: '' },
	resource: '',
};

export default StatusForm;
