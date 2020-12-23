/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import PropTypes from 'prop-types';

function SvgHeart({ stroke, strokeWidth, ...props }) {
	return (
		<svg width={24} height={20} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
			<path
				d="M20.84 2.61a5.5 5.5 0 00-7.78 0L12 3.67l-1.06-1.06a5.501 5.501 0 00-7.78 7.78l1.06 1.06L12 19.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78v0z"
				stroke={stroke}
				strokeWidth={strokeWidth}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

SvgHeart.propTypes = {
	stroke: PropTypes.string.isRequired,
	strokeWidth: PropTypes.number.isRequired,
};

export default SvgHeart;
