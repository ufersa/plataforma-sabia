/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import App from 'next/app';
import { ThemeProvider } from 'styled-components';
import cookies from 'next-cookies';
import GlobalStyle from '../styles/global';
import Layout from '../components/layout';
import { theme } from '../styles';
import { ModalProvider } from '../components/Modal';
import { UserProvider } from '../components/User';
import { getMe } from '../services/auth';

export default class MyApp extends App {
	static async getInitialProps(appContext) {
		const appProps = await App.getInitialProps(appContext);
		const { token } = cookies(appContext.ctx);
		let user = {};
		if (token) {
			user = await getMe(token);
		}

		return { ...appProps, user };
	}

	render() {
		const { Component, pageProps, user } = this.props;

		return (
			<ThemeProvider theme={theme}>
				<GlobalStyle />
				<UserProvider user={user || {}}>
					<ModalProvider>
						<Layout>
							<Component {...pageProps} />
						</Layout>
					</ModalProvider>
				</UserProvider>
			</ThemeProvider>
		);
	}
}
