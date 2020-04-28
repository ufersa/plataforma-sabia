/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import App from 'next/app';
import { ThemeProvider } from '../providers';
import GlobalStyle from '../styles/global';
import Layout from '../components/layout';

export default class MyApp extends App {
	render() {
		const { Component, pageProps } = this.props;
		return (
			<ThemeProvider>
				<GlobalStyle />
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</ThemeProvider>
		);
	}
}
