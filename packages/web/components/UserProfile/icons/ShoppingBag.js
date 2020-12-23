/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import PropTypes from 'prop-types';

function SvgShoppingBag({ stroke, strokeWidth, ...props }) {
	return (
		<svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
			<path
				d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4H6zM3 6h18M16 10a4 4 0 11-8 0"
				stroke={stroke}
				strokeWidth={strokeWidth}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

SvgShoppingBag.propTypes = {
	stroke: PropTypes.string.isRequired,
	strokeWidth: PropTypes.number.isRequired,
};

export default SvgShoppingBag;
