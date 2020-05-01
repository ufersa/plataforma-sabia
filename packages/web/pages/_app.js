/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import App from 'next/app';
import cookies from 'next-cookies';
import { ThemeProvider, GlobalStyle } from '../styles';
import Layout from '../components/layout';
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
			<ThemeProvider>
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
