import React from 'react';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';
import dompurify from 'isomorphic-dompurify';

/**
 * Output SafeHtml component
 *
 * @param {object} props Component Props
 * @param {string} props.html HTML to be parsed
 * @param {string} props.as Component wrapping
 * @param {boolean} props.shouldParse Parse HTML to react elements
 * @param {string[]} props.allowedTags Allowed tags
 * @param {string[]} props.allowedAttrs Allowed attributes
 * @returns {React.Component|string} Sanitized and Parsed HTML
 */
const SafeHtml = ({ html, as, allowedTags, allowedAttrs, shouldParse }) => {
	const config = {};

	if (allowedTags) {
		config.ALLOWED_TAGS = allowedTags;
	}

	if (allowedAttrs) {
		config.ALLOWED_ATTR = allowedAttrs;
	}

	let cleanedHTML = dompurify.sanitize(html, Object.keys(config).length ? config : null);

	cleanedHTML = cleanedHTML && cleanedHTML.length ? cleanedHTML : '&nbsp;';

	if (as) {
		cleanedHTML = `<${as}>${cleanedHTML}</${as}>`;
	}

	if (shouldParse) {
		cleanedHTML = parse(cleanedHTML);
	}

	return cleanedHTML;
};

SafeHtml.defaultProps = {
	as: '',
	allowedTags: null,
	allowedAttrs: null,
	shouldParse: true,
};

SafeHtml.propTypes = {
	html: PropTypes.string.isRequired,
	as: PropTypes.string,
	allowedTags: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
	allowedAttrs: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
	shouldParse: PropTypes.bool,
};

export default SafeHtml;
