import React from 'react';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';
import dompurify from 'isomorphic-dompurify';

/**
 * Output SafeHtml component
 *
 * @param {object} props Component Props
 * @param {string} props.html HTML to be parsed
 * @param {string[]} props.allowedTags Allowed tags
 * @param {string[]} props.allowedAttrs Allowed attributes
 * @returns {React.Component|string} Sanitized and Parsed HTML
 */
const SafeHtml = ({ html, as, allowedTags, allowedAttrs }) => {
	const config = {
		ALLOWED_TAGS: allowedTags,
		ALLOWED_ATTR: allowedAttrs,
	};

	let cleanedHTML = dompurify.sanitize(html, config);

	cleanedHTML = cleanedHTML && cleanedHTML.length ? cleanedHTML : '&nbsp;';

	if (as) {
		cleanedHTML = `<${as}>${cleanedHTML}</${as}>`;
	}

	return parse(cleanedHTML);
};

SafeHtml.defaultProps = {
	as: '',
	allowedTags: [],
	allowedAttrs: [],
};

SafeHtml.propTypes = {
	html: PropTypes.string.isRequired,
	as: PropTypes.string,
	allowedTags: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
	allowedAttrs: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
};

export default SafeHtml;
