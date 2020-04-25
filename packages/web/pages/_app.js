/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import App from 'next/app';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from '../styles/global';
import Layout from '../components/layout';
import { theme } from '../styles';
import { ModalProvider } from '../components/Modal';

export default class MyApp extends App {
	render() {
		const { Component, pageProps } = this.props;
		return (
			<ThemeProvider theme={theme}>
				<GlobalStyle />
				<ModalProvider>
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</ModalProvider>
			</ThemeProvider>
		);
	}
}
