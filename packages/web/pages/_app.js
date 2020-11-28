/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import App from 'next/app';
import cookies from 'next-cookies';
import Router from 'next/router';
import NProgress from 'nprogress'; // nprogress module
import GoogleFonts from 'next-google-fonts';
import { ThemeProvider, GlobalStyle } from '../styles';
import Layout from '../components/layout';
import { ModalProvider } from '../components/Modal';
import { UserProvider } from '../components/User';
import { ToastContainer } from '../components/Toast';
import { getMe, setGlobalToken } from '../services';
import { appWithTranslation } from '../utils/i18n';
import config from '../config';
import Head from '../components/head';

import 'react-toastify/dist/ReactToastify.min.css';

// Binding events to NProgress.
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

export class SabiaApp extends App {
	static async getInitialProps(appContext) {
		const { token } = cookies(appContext.ctx);
		let user = {};
		if (token) {
			setGlobalToken(token);
			user = await getMe(token, {
				bookmarks: true,
			});
		}

		// eslint-disable-next-line no-param-reassign
		appContext.ctx.user = user;

		const appProps = await App.getInitialProps(appContext);

		return {
			...appProps,
			user,
		};
	}

	render() {
		const { Component, pageProps, user } = this.props;
		const loadEnvConfig = `
			window.env = ${JSON.stringify(config)};
		`;

		return (
			<>
				<GoogleFonts href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;700&display=swap" />
				<GoogleFonts href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;500&display=swap" />
				<Head>
					<script
						src={`https://maps.googleapis.com/maps/api/js?key=${config.GOOGLE_MAPS_KEY}&libraries=places`}
					/>
				</Head>
				<ThemeProvider>
					<script
						key="script/pre-init"
						type="application/javascript"
						// eslint-disable-next-line react/no-danger
						dangerouslySetInnerHTML={{ __html: loadEnvConfig }}
					/>
					<GlobalStyle />
					<ToastContainer />
					<UserProvider user={user || {}}>
						<ModalProvider>
							<Layout>
								<Component {...pageProps} />
							</Layout>
						</ModalProvider>
					</UserProvider>
				</ThemeProvider>
			</>
		);
	}
}

export default appWithTranslation(SabiaApp);
