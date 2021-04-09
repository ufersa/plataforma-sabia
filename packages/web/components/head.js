import React from 'react';
import NextHead from 'next/head';
import PropTypes from 'prop-types';

const images = {
	square: 'https://plataformasabia.com/static/seo-300x300.png',
	large: 'https://plataformasabia.com/static/seo-1200x628.png',
};

const Head = ({ title, description, keywords, url, ogImage, noIndex, children }) => {
	const metaTitle = title || 'Plataforma Sabiá';
	const metaDescription =
		description || 'Encontre tecnologias e serviços voltados para o semiárido brasileiro';
	const metaKeywords = Array.isArray(keywords) ? keywords.join(', ') : keywords;
	const metaImage = {
		square: ogImage || images.square,
		large: ogImage || images.large,
	};

	return (
		<NextHead>
			<meta charSet="UTF-8" />
			<title>{metaTitle}</title>
			<meta name="title" content={metaTitle} />
			<meta name="description" content={metaDescription} />
			<meta name="keywords" content={metaKeywords} />
			<meta name="viewport" content="width=device-width, initial-scale=1" key="viewport" />

			<meta property="og:type" content="website" />
			<meta property="og:url" content={url} key="og:url" />
			<meta property="og:title" content={metaTitle} />
			<meta property="og:description" content={metaDescription} key="og:description" />
			<meta property="og:image" content={images.large} key="og:image" />
			<meta property="og:image:width" content="1200" key="og:image:width" />
			<meta property="og:image:height" content="628" key="og:image:height" />
			<meta property="og:image" content={images.square} key="og:image" />
			<meta property="og:image:width" content="300" key="og:image:width" />
			<meta property="og:image:height" content="300" key="og:image:height" />

			<meta property="twitter:card" content="summary_large_image" />
			<meta property="twitter:url" content={url} />
			<meta property="twitter:title" content={metaTitle} />
			<meta property="twitter:description" content={metaDescription} />
			<meta property="twitter:image" content={metaImage.large} />

			{!!noIndex && <meta name="robots" content="noindex" />}

			<link rel="icon" sizes="192x192" href="/static/touch-icon.png" key="touch-icon" />
			<link
				rel="apple-touch-icon"
				href="/static/apple-touch-icon.png"
				key="apple-touch-icon"
			/>
			<link rel="mask-icon" href="/static/favicon-mask.svg" color="#49B882" key="mask-icon" />
			<link rel="icon" href="/static/favicon.ico" key="favicon.ico" />

			{children}
		</NextHead>
	);
};

Head.propTypes = {
	title: PropTypes.string,
	description: PropTypes.string,
	keywords: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
	url: PropTypes.string,
	ogImage: PropTypes.string,
	noIndex: PropTypes.bool,
	children: PropTypes.node,
};

Head.defaultProps = {
	title: '',
	description: '',
	keywords: [],
	url: '',
	ogImage: null,
	noIndex: false,
	children: null,
};

export default Head;
