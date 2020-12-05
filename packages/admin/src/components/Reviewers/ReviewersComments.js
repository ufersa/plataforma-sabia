import React from 'react';
import PropTypes from 'prop-types';
import { ArrayField, Datagrid, TextField } from 'react-admin';

const ReviewersComments = ({ record, source, resource }) => {
	if (record && record[source]) {
		const comments = [...record[source]].map((text) => {
			return { text };
		});
		return (
			<ArrayField
				resource={resource}
				record={{ comments }}
				source="comments"
				addLabel={false}
			>
				<Datagrid>
					<TextField label="" source="text" />
				</Datagrid>
			</ArrayField>
		);
	}
	return null;
};

ReviewersComments.propTypes = {
	record: PropTypes.shape(),
	source: PropTypes.string,
	resource: PropTypes.string,
};

ReviewersComments.defaultProps = {
	record: {},
	source: '',
	resource: '',
};
export default ReviewersComments;
