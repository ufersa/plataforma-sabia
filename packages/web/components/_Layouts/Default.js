import React from 'react';
import PropTypes from 'prop-types';
import Head from '../head';
import { Header } from '../Header';
import { Footer } from '../Footer';

const LayoutDefault = ({ children }) => (
	<>
		<Head title="Plataforma Sabiá" description="A Plataforma do Semi-Árido Brasileiro" />
		<Header />
		{children}
		<Footer />
	</>
);

LayoutDefault.propTypes = {
	children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)])
		.isRequired,
};

export default LayoutDefault;
