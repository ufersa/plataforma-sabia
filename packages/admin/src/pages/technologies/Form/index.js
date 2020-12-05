import React from 'react';
import PropTypes from 'prop-types';
import { TabbedShowLayout, Tab, Error, Loading, useQuery } from 'react-admin';
import { StatusForm } from '../../../components';
import CostForm from './CostForm';
import AttachmentsForm from './AttachmentsForm';
import MapForm from './MapForm';
import ResponsibleForm from './ResponsibleForm';
import AboutForm from './AboutForm';
import Review from './Review';

const TechnologiesForm = ({ record, resource, save }) => {
	const { loading, error, data: newRecord } = useQuery({
		type: 'getOne',
		resource: `technologies`,
		payload: {
			id: record.id,
			query: { embed: '' },
		},
	});

	if (!record.id) return <AboutForm save={save} />;

	if (error) return <Error />;
	if (loading) return <Loading />;
	return (
		<TabbedShowLayout record={newRecord} resource={resource}>
			<Tab label="About" path="">
				<AboutForm save={save} />
			</Tab>
			<Tab label="Status" path="status">
				<StatusForm />
			</Tab>
			<Tab label="Funding" path="funding">
				<CostForm />
			</Tab>
			<Tab label="Responsible" path="responsible">
				<ResponsibleForm />
			</Tab>
			<Tab label="Attachments" path="attachments">
				<AttachmentsForm />
			</Tab>
			<Tab label="Maps" path="maps">
				<MapForm />
			</Tab>
			<Tab label="Review" path="review">
				<Review />
			</Tab>
		</TabbedShowLayout>
	);
};

TechnologiesForm.propTypes = {
	record: PropTypes.shape({ id: PropTypes.number }),
	resource: PropTypes.string,
	save: PropTypes.func,
};

TechnologiesForm.defaultProps = {
	record: { id: 0 },
	resource: '',
	save: () => {},
};

export default TechnologiesForm;
