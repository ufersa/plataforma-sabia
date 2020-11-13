import React from 'react';
import PropTypes from 'prop-types';
import { TabbedShowLayout, Tab } from 'react-admin';
import StatusForm from './statusForm';
import CostForm from './CostForm';
import AttachmentsForm from './AttachmentsForm';
import MapForm from './MapForm';
import ResponsibleForm from './ResponsibleForm';
import AboutForm from './AboutForm';

const TechnologiesForm = ({ record, resource, save }) => {
	if (!record.id) return <AboutForm record={record} save={save} resource={resource} />;
	return (
		<TabbedShowLayout record={record} resource={resource}>
			<Tab label="About" path="">
				<AboutForm record={record} save={save} resource={resource} />
			</Tab>
			<Tab label="Status" path="status">
				<StatusForm record={record} resource={resource} />
			</Tab>
			<Tab label="Funding" path="funding">
				<CostForm record={record} resource={resource} />
			</Tab>
			<Tab label="Responsible" path="responsible">
				<ResponsibleForm record={record} resource={resource} />
			</Tab>
			<Tab label="Attachments" path="attachments">
				<AttachmentsForm record={record} resource={resource} />
			</Tab>
			<Tab label="Maps" path="maps">
				<MapForm record={record} resource={resource} />
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
