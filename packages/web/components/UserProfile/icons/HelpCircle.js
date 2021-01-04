/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import PropTypes from 'prop-types';

function SvgHelpCircle({ stroke, strokeWidth, ...props }) {
	return (
		<svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
			<path
				d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
				stroke={stroke}
				strokeWidth={strokeWidth}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3M12 17h.01"
				stroke={stroke}
				strokeWidth={strokeWidth}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

SvgHelpCircle.propTypes = {
	stroke: PropTypes.string.isRequired,
	strokeWidth: PropTypes.number.isRequired,
};

export default SvgHelpCircle;
