/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-danger */
import React from 'react';
import App from 'next/app';
import cookies from 'next-cookies';
import Router, { withRouter } from 'next/router';
import NProgress from 'nprogress'; // nprogress module
import { ThemeProvider, GlobalStyle } from '../styles';
import LayoutDefault from '../components/_Layouts/Default';
import LayoutLandingPage from '../components/_Layouts/LandingPage';
import { ModalProvider } from '../components/Modal';
import { UserProvider } from '../components/User';
import { ShoppingCartProvider } from '../components/ShoppingCart';
import { ToastContainer } from '../components/Toast';
import { getMe, setGlobalToken } from '../services';
import { appWithTranslation } from '../utils/i18n';
import config from '../config';
import { pageview } from '../utils/googleAnalytics';
import Head from '../components/head';

import 'react-toastify/dist/ReactToastify.min.css';

// Binding events to NProgress.
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', (url) => {
	NProgress.done();
	if (['staging', 'production'].includes(config.APP_ENV)) {
		pageview(url);
	}
});
Router.events.on('routeChangeError', () => NProgress.done());

export class SabiaApp extends App {
	static async getInitialProps(appContext) {
		const { token } = cookies(appContext.ctx);
		let user = {};
		if (token) {
			setGlobalToken(token);
			user = await getMe(token, {
				bookmarks: true,
				orders: true,
				areas: true,
				institution: true,
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
				<Head>
					<script
						src={`https://maps.googleapis.com/maps/api/js?key=${config.GOOGLE_MAPS_KEY}&libraries=places`}
					/>
				</Head>
				<ThemeProvider>
					<script async src="https://www.googletagmanager.com/gtag/js?id=G-QZWK6JMHSY" />
					<script
						dangerouslySetInnerHTML={{
							__html: `window.dataLayer = window.dataLayer || [];
						function gtag(){dataLayer.push(arguments);}
						gtag('js', new Date());

						gtag('config', 'G-QZWK6JMHSY', {
							page_path: window.location.pathname,
						});
					`,
						}}
					/>
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
							<ShoppingCartProvider>
								{['/about', '/ideas'].includes(router.pathname) ? (
									<LayoutLandingPage>
										<Component {...pageProps} />
									</LayoutLandingPage>
								) : (
									<LayoutDefault>
										<Component {...pageProps} />
									</LayoutDefault>
								)}
							</ShoppingCartProvider>
						</ModalProvider>
					</UserProvider>
				</ThemeProvider>
			</>
		);
	}
}

export default appWithTranslation(withRouter(SabiaApp));
