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
	required,
} from 'react-admin';
import statuses from './statuses';

const StatusForm = ({ record, resource, basePath, choices = [] }) => {
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
				validate={[required()]}
				choices={choices.lenght ? choices : statuses[resource]}
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
	choices: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string,
			name: PropTypes.string,
		}),
	),
};

StatusForm.defaultProps = {
	record: { id: null, status: '' },
	resource: '',
	basePath: '',
	choices: [{ id: '', name: '' }],
};

export default StatusForm;
