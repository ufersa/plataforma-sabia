import React from 'react';
import PropTypes from 'prop-types';
import Head from '../head';
import { Header } from '../LandingPage/Header';
import { Footer } from '../Footer';

const LayoutLandingPage = ({ children }) => (
	<>
		<Head title="Plataforma Sabiá" description="A Plataforma do Semi-Árido Brasileiro" />
		<Header />
		{children}
		<Footer isAbout />
	</>
);

LayoutLandingPage.propTypes = {
	children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)])
		.isRequired,
};

export default LayoutLandingPage;
