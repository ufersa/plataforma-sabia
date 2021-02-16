import React from 'react';
import PropTypes from 'prop-types';
import { TabbedShowLayout, Tab, Error, Loading, useQuery } from 'react-admin';
import { StatusForm } from '../../../components';
import CostForm from './CostForm';
import AttachmentsForm from './AttachmentsForm';
import MapForm from './MapForm';
import ResponsibleForm from './ResponsibleForm';
import AboutForm from './AboutForm';
import Revisions from './Revisions';

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
			<Tab label="labels.about" path="">
				<AboutForm save={save} />
			</Tab>
			<Tab label="labels.status" path="status">
				<StatusForm />
			</Tab>
			<Tab label="labels.funding" path="funding">
				<CostForm save={save} />
			</Tab>
			<Tab label="labels.responsibles" path="responsibles">
				<ResponsibleForm save={save} />
			</Tab>
			<Tab label="labels.attachments" path="attachments">
				<AttachmentsForm />
			</Tab>
			<Tab label="labels.maps" path="maps">
				<MapForm />
			</Tab>
			<Tab label="labels.revisions" path="review">
				<Revisions />
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
