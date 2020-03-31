import React from 'react';
import PropTypes from 'prop-types';
import Head from './head';
import Nav from './Nav';
import Footer from './Footer';

const Layout = ({ children }) => (
	<>
		<Head title="Plataforma Sabiá" description="A Plataforma do Semi-Árido Brasileiro" />
		<Nav />
		{children}
		<Footer />
	</>
);

Layout.propTypes = {
	children: PropTypes.element.isRequired,
};

export default Layout;
