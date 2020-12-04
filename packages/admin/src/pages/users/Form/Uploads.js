import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardHeader, CardContent } from '@material-ui/core';
import {
	SimpleShowLayout,
	ChipField,
	ImageField,
	ArrayField,
	Datagrid,
	UrlField,
	DateField,
	ReferenceField,
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
		maxWidth: 250,
		margin: '0.2em',
		display: 'inline-block',
		verticalAlign: 'top',
	},
});

const Uploads = ({ record, resource, basePath }) => {
	const classes = useStyles();

	// eslint-disable-next-line no-shadow
	const Cards = ({ record, source }) => {
		return record[source].map(({ id, url, object_id }) => {
			return (
				<Card key={id} className={classes.cardStyle}>
					<CardHeader
						subheader={
							<ReferenceField
								basePath="/technologies"
								record={{ id: object_id }}
								source="id"
								reference="technologies"
							>
								<ChipField source="title" />
							</ReferenceField>
						}
					/>
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
		images: [...record.uploads].filter(({ filename }) => !filename.match(/.pdf/g)),
		pdfs: [...record.uploads].filter(({ filename }) => filename.match(/.pdf/g)),
	};

	return (
		<SimpleShowLayout resource={resource} record={newRecord} basePath={basePath}>
			<Cards addLabel source="images" />
			<ArrayField source="pdfs">
				<Datagrid>
					<ReferenceField
						basePath="/technologies"
						source="object_id"
						reference="technologies"
					>
						<ChipField source="title" />
					</ReferenceField>
					<UrlField source="url" target="_blank" />
					<DateField label="Created" showTime source="created_at" />
					<DateField label="Updated" showTime source="updated_at" />
				</Datagrid>
			</ArrayField>
		</SimpleShowLayout>
	);
};
Uploads.propTypes = {
	record: PropTypes.shape({
		uploads: PropTypes.arrayOf(
			PropTypes.shape({
				filename: PropTypes.string,
				url: PropTypes.string,
			}),
		),
	}),
	resource: PropTypes.string,
	basePath: PropTypes.string,
};

Uploads.defaultProps = {
	record: { id: null },
	resource: '',
	basePath: '',
};

export default Uploads;
