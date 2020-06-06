/* eslint-disable jsdoc/check-examples */
import React from 'react';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';
import createDOMPurify from 'dompurify';

/**
 * Output SafeHtml component
 *
 * @typedef Props
 * @property {string} html
 * @property {string} as
 * @property {string[]} allowedTags
 * @property {string[]} allowedAtts
 *
 * @param {Props} props Component Props
 * @returns {React.Component} Sanitized and Parsed HTML
 */
const SafeHtml = ({ html, as, allowedTags, allowedAtts }) => {
	let dirtyHTML = html;

	const config = {
		ALLOWED_TAGS: allowedTags,
		ALLOWED_ATTR: allowedAtts,
	};

	if (as) {
		dirtyHTML = `<${as}>${html}</${as}>`;
	}

	const dompurify = createDOMPurify();

	const cleanedHTML = dompurify.sanitize(dirtyHTML, config);

	return parse(cleanedHTML && cleanedHTML.length ? cleanedHTML : '&nbsp;');
};

SafeHtml.defaultProps = {
	as: null,
	allowedTags: [],
	allowedAtts: [],
};

SafeHtml.propTypes = {
	html: PropTypes.string.isRequired,
	as: PropTypes.element,
	allowedTags: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
	allowedAtts: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
};

export default SafeHtml;
