/* eslint-disable react/jsx-props-no-spreading */
import App from 'next/app';
import React from 'react';
import GlobalStyle from '../styles/global';
import Layout from '../components/layout';

export default class MyApp extends App {
	render() {
		const { Component, pageProps } = this.props;
		return (
			<>
				<GlobalStyle />
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</>
		);
	}
}
