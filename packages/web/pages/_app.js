/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import App from 'next/app';
import cookies from 'next-cookies';
import Router, { withRouter } from 'next/router';
import NextHead from 'next/head';
import NProgress from 'nprogress'; // nprogress module
import { ThemeProvider, GlobalStyle } from '../styles';
import LayoutDefault from '../components/_Layouts/Default';
import LayoutLandingPage from '../components/_Layouts/LandingPage';
import { ModalProvider } from '../components/Modal';
import { UserProvider } from '../components/User';
import { ToastContainer } from '../components/Toast';
import { getMe, setGlobalToken } from '../services';
import { appWithTranslation } from '../utils/i18n';
import config from '../config';

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
		const { Component, pageProps, user, router } = this.props;
		const loadEnvConfig = `
			window.env = ${JSON.stringify(config)};
		`;

		return (
			<>
				<NextHead>
					<script
						src={`https://maps.googleapis.com/maps/api/js?key=${config.GOOGLE_MAPS_KEY}&libraries=places`}
					/>
				</NextHead>
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
							{router.pathname === '/about' || router.pathname === '/ideas-bank' ? (
								<LayoutLandingPage>
									<Component {...pageProps} />
								</LayoutLandingPage>
							) : (
								<LayoutDefault>
									<Component {...pageProps} />
								</LayoutDefault>
							)}
						</ModalProvider>
					</UserProvider>
				</ThemeProvider>
			</>
		);
	}
}

export default appWithTranslation(withRouter(SabiaApp));
