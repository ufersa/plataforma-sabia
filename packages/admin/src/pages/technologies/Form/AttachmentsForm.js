import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardHeader, CardContent } from '@material-ui/core';
import {
	useQuery,
	Loading,
	Error,
	SimpleShowLayout,
	TextField,
	ImageField,
	ArrayField,
	Datagrid,
	UrlField,
	DateField,
} from 'react-admin';

const useStyles = makeStyles({
	img: {
		width: 200,
		height: 200,
		'& img': {
			margin: 0,
			width: '100%',
			height: '100%',
		},
	},
	cardStyle: {
		margin: '0.2em',
		display: 'inline-block',
		verticalAlign: 'top',
	},
});

const AttachmentsForm = ({ record, resource, basePath }) => {
	const classes = useStyles();
	const { loading, error, data } = useQuery({
		type: 'getList',
		resource: `uploads`,
		payload: {
			object_id: record.id,
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

	// eslint-disable-next-line no-shadow
	const Cards = ({ record, source }) => {
		return record[source].map(({ id, filename, url, updated_at }) => {
			return (
				<Card key={id} className={classes.cardStyle}>
					<CardHeader title={filename} subheader={updated_at} />
					<CardContent>
						<ImageField
							record={{ url }}
							source="url"
							title="url"
							className={classes.img}
						/>
					</CardContent>
				</Card>
			);
		});
	};

	const newRecord = {
		imagens: data.filter(({ filename }) => !filename.match(/.pdf/g)),
		pdfs: data.filter(({ filename }) => filename.match(/.pdf/g)),
	};

	return (
		<SimpleShowLayout resource={resource} record={newRecord} basePath={basePath}>
			<Cards addLabel source="imagens" />
			<ArrayField source="pdfs">
				<Datagrid>
					<TextField source="filename" />
					<UrlField source="url" target="_blank" />
					<DateField label="Created" showTime source="created_at" />
					<DateField label="Updated" showTime source="updated_at" />
				</Datagrid>
			</ArrayField>
		</SimpleShowLayout>
	);
};
AttachmentsForm.propTypes = {
	record: PropTypes.shape({ id: PropTypes.number }),
	resource: PropTypes.string,
	basePath: PropTypes.string,
};

AttachmentsForm.defaultProps = {
	record: { id: null },
	resource: '',
	basePath: '',
};

export default AttachmentsForm;
