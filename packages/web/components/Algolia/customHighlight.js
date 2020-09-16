import React from 'react';
import PropTypes from 'prop-types';
import { connectHighlight } from 'react-instantsearch-dom';
import { truncateText } from '@sabia/core';

const CustomHightlight = ({ highlight, attribute, hit, maxTextSize }) => {
	const parsedHit = highlight({
		highlightProperty: '_highlightResult',
		attribute,
		hit,
	});

	return (
		<span className="ais-Hightlight">
			{parsedHit.map((part, index) => (
				<span
					// eslint-disable-next-line react/no-array-index-key
					key={index}
					className={
						part.isHighlighted
							? 'ais-Highlight-highlighted'
							: 'ais-Highlight-nonHighlighted'
					}
				>
					{maxTextSize ? truncateText(part.value, maxTextSize) : part.value}
				</span>
			))}
		</span>
	);
};

CustomHightlight.propTypes = {
	highlight: PropTypes.func.isRequired,
	attribute: PropTypes.string.isRequired,
	hit: PropTypes.shape({}).isRequired,
	maxTextSize: PropTypes.number,
};

CustomHightlight.defaultProps = {
	maxTextSize: null,
};

export default connectHighlight(CustomHightlight);
