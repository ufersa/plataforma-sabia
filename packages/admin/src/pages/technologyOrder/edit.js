import React from 'react';
import PropTypes from 'prop-types';
import { Edit } from 'react-admin';
import { StatusForm } from '../../components';

const TechnologyOrdersEdit = ({ basePath, id, resource }) => (
	<Edit id={id} basePath={basePath} resource={resource}>
		<StatusForm
			choices={[
				{ id: 'open', name: 'Open' },
				{ id: 'finish', name: 'Finish' },
				{ id: 'canceled', name: 'Canceled' },
			]}
		/>
	</Edit>
);

TechnologyOrdersEdit.propTypes = {
	id: PropTypes.string.isRequired,
	basePath: PropTypes.string.isRequired,
	resource: PropTypes.string.isRequired,
};

export default TechnologyOrdersEdit;
