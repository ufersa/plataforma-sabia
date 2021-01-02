/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import PropTypes from 'prop-types';

function SvgClipboard({ stroke, strokeWidth, ...props }) {
	return (
		<svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
			<path
				d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"
				stroke={stroke}
				strokeWidth={strokeWidth}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M15 2H9a1 1 0 00-1 1v2a1 1 0 001 1h6a1 1 0 001-1V3a1 1 0 00-1-1z"
				stroke={stroke}
				strokeWidth={strokeWidth}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

SvgClipboard.propTypes = {
	stroke: PropTypes.string.isRequired,
	strokeWidth: PropTypes.number.isRequired,
};

export default SvgClipboard;
