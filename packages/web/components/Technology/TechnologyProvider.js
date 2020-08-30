import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import TechnologyContext from './TechnologyContext';
import { normalizeAttachments as normalizeAttachmentsHelper } from '../../utils/technology';

export const TechnologyProvider = ({ children, technology }) => {
	const normalizeAttachments = useCallback(
		(attachments) => normalizeAttachmentsHelper(attachments),
		[],
	);

	return (
		<TechnologyContext.Provider value={{ technology, normalizeAttachments }}>
			{children}
		</TechnologyContext.Provider>
	);
};

TechnologyProvider.propTypes = {
	children: PropTypes.node.isRequired,
	technology: PropTypes.shape({}),
};

TechnologyProvider.defaultProps = {
	technology: {},
};

export default TechnologyProvider;
