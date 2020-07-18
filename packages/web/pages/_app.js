/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import App from 'next/app';
import cookies from 'next-cookies';
import Router from 'next/router';
import NProgress from 'nprogress'; // nprogress module
import { ThemeProvider, GlobalStyle } from '../styles';
import Layout from '../components/layout';
import { ModalProvider } from '../components/Modal';
import { UserProvider } from '../components/User';
import { getMe } from '../services/auth';
import { appWithTranslation } from '../utils/i18n';

// Binding events to NProgress.
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

export class SabiaApp extends App {
	static async getInitialProps(appContext) {
		const { token } = cookies(appContext.ctx);
		let user = {};
		if (token) {
			user = await getMe(token);
		}

		// eslint-disable-next-line no-param-reassign
		appContext.ctx.user = user;

		const appProps = await App.getInitialProps(appContext);
		const { defaultProps } = appContext.Component;

		return {
			...appProps,
			pageProps: {
				namespacesRequired: [
					...(appProps.pageProps.namespacesRequired || []),
					...(defaultProps?.i18nNamespaces || []),
				],
			},
			user,
		};
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

export default appWithTranslation(SabiaApp);
