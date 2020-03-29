import React from 'react';
import NextHead from 'next/head';
import PropTypes from 'prop-types';

const Head = ({ title, description, url, ogImage }) => (
	<NextHead>
		<meta charSet="UTF-8" />
		<title>{title}</title>
		<meta name="description" content={description} />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<link rel="icon" sizes="192x192" href="/static/touch-icon.png" />
		<link rel="apple-touch-icon" href="/static/touch-icon.png" />
		<link rel="mask-icon" href="/static/favicon-mask.svg" color="#49B882" />
		<link rel="icon" href="/static/favicon.ico" />
		<meta property="og:url" content={url} />
		<meta property="og:title" content={title || ''} />
		<meta property="og:description" content={description} />
		<meta name="twitter:site" content={url} />
		<meta name="twitter:card" content="summary_large_image" />
		<meta name="twitter:image" content={ogImage} />
		<meta property="og:image" content={ogImage} />
		<meta property="og:image:width" content="1200" />
		<meta property="og:image:height" content="630" />
		<link
			href="https://fonts.googleapis.com/css?family=Rubik:400,500,700&display=swap"
			rel="stylesheet"
		/>
	</NextHead>
);

Head.propTypes = {
	title: PropTypes.string,
	description: PropTypes.string,
	url: PropTypes.string,
	ogImage: PropTypes.string,
};

Head.defaultProps = {
	title: '',
	description: '',
	url: '',
	ogImage: '',
};

export default Head;
