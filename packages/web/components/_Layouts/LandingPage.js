import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import Head from '../head';
import { Header } from '../Header';
import { Footer } from '../Footer';

const LayoutLandingPage = ({ children }) => {
	const router = useRouter();

	return (
		<>
			<Head title="Plataforma Sabiá" description="A Plataforma do Semi-Árido Brasileiro" />
			<Header isAbout={router.pathname === '/about'} />
			{children}
			<Footer isAbout />
		</>
	);
};

LayoutLandingPage.propTypes = {
	children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)])
		.isRequired,
};

export default LayoutLandingPage;
