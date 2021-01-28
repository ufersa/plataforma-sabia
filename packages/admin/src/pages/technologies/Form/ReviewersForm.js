import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import {
	SimpleShowLayout,
	SimpleForm,
	SelectInput,
	useNotify,
	useRedirect,
	useDataProvider,
	SaveButton,
	Toolbar,
	ReferenceInput,
	useQuery,
	ArrayField,
	Datagrid,
	TextField,
	Loading,
	DateField,
	ReferenceField,
} from 'react-admin';

const useStyles = makeStyles((theme) => ({
	deleteButton: {
		margin: theme.spacing(1),
		backgroundColor: 'red',
	},
}));

const ReviewersForm = ({ record, resource, basePath }) => {
	const historic = useQuery({
		type: 'getList',
		resource: `technologies/${record.id}/reviewer-history`,
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

	const [reviewer, setReviewer] = useState();
	const [loading, setLoading] = useState(true);
	const classes = useStyles();
	const CustomToolbar = () => {
		const notify = useNotify();
		const redirect = useRedirect();
		const dataProvider = useDataProvider();
		const handleSubmit = () => {
			setLoading(true);
			dataProvider
				.update(`${resource}/${record.id}/reviewer`, { id: '', data: { reviewer } })
				.then(() => {
					notify('ra.notification.updated', 'info', { smart_count: 1 });
					redirect(basePath);
				})
				.catch(() => {
					notify('ra.notification.http_error', 'warning');
					setLoading(false);
				});
		};
		const deleteAction = () => {
			setLoading(true);
			dataProvider
				.update(`${resource}/${record.id}/disassociate-reviewer`, { id: '', data: {} })
				.then(() => {
					notify('ra.notification.updated', 'info', { smart_count: 1 });
					redirect(basePath);
				})
				.catch(() => {
					notify('ra.notification.http_error', 'warning');
					setLoading(false);
				});
		};
		const DeleteButton = () => {
			return (
				<Button
					variant="contained"
					color="secondary"
					className={classes.deleteButton}
					startIcon={<DeleteIcon />}
					disabled={!record.reviewer}
					onClick={deleteAction}
				>
					Remover
				</Button>
			);
		};
		return (
			<Toolbar>
				<SaveButton handleSubmitWithRedirect={handleSubmit} disabled={loading} />
				<DeleteButton />
			</Toolbar>
		);
	};
	if (historic.loading) return <Loading />;
	record.reviewer = record.reviewers[0]?.id;
	record.historic = historic?.data;

	return (
		<SimpleShowLayout record={record} resource={resource}>
			<SimpleForm toolbar={<CustomToolbar />}>
				<ReferenceInput label="Reviewer" source="reviewer" reference="reviewers" fullWidth>
					<SelectInput
						optionValue="id"
						optionText="user.email"
						resettable
						validate={(reviewer_id) => {
							setReviewer(reviewer_id);
							setLoading(reviewer_id === record.reviewer);
						}}
					/>
				</ReferenceInput>
			</SimpleForm>
			<ArrayField source="historic">
				<Datagrid>
					<TextField source="status" />
					<ReferenceField
						basePath="/reviewers"
						label="Reviewer"
						source="reviewer_id"
						reference="reviewers"
					>
						<ReferenceField
							basePath="/users"
							source="user_id"
							reference="users"
							link={false}
						>
							<TextField source="full_name" />
						</ReferenceField>
					</ReferenceField>
					<DateField label="Created" showTime source="created_at" />
					<DateField label="Updated" showTime source="updated_at" />
				</Datagrid>
			</ArrayField>
		</SimpleShowLayout>
	);
};

ReviewersForm.propTypes = {
	record: PropTypes.shape({
		id: PropTypes.number,
		reviewers: PropTypes.arrayOf(
			PropTypes.shape({
				id: PropTypes.number,
			}),
		),
		historic: PropTypes.arrayOf(
			PropTypes.shape({
				id: PropTypes.number,
			}),
		),
		reviewer: PropTypes.number,
	}),
	resource: PropTypes.string,
	basePath: PropTypes.string,
};

ReviewersForm.defaultProps = {
	record: { id: 0, reviewers: [], historic: [], reviewer: 0 },
	resource: '',
	basePath: '',
};

export default ReviewersForm;
