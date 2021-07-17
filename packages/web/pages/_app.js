/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-danger */
import React from 'react';
import App from 'next/app';
import cookies from 'next-cookies';
import Router, { withRouter } from 'next/router';
import NProgress from 'nprogress';
import { ThemeProvider, GlobalStyle } from '../styles';
import LayoutDefault from '../components/_Layouts/Default';
import LayoutLandingPage from '../components/_Layouts/LandingPage';
import { ModalProvider } from '../components/Modal';
import { UserProvider } from '../components/User';
import { ShoppingCartProvider } from '../components/ShoppingCart';
import { ToastContainer } from '../components/Toast';
import { getMe, setGlobalToken } from '../services';
import config from '../config';
import { pageview } from '../utils/googleAnalytics';
import Head from '../components/head';
import { internal as internalPages, landingPage } from '../utils/consts/pages';
import { isAppEnvProduction } from '../utils/helper';

import 'react-toastify/dist/ReactToastify.min.css';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', (url) => {
	NProgress.done();
	if (isAppEnvProduction()) {
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
					<>
						{config.LOAD_ANALYTICS && (
							<>
								<script
									async
									src="https://www.googletagmanager.com/gtag/js?id=G-QZWK6JMHSY"
								/>
								<script
									dangerouslySetInnerHTML={{
										__html: `window.dataLayer = window.dataLayer || [];
								function gtag(){dataLayer.push(arguments);}
								gtag('js', new Date());

								gtag('config', 'G-QZWK6JMHSY', {
									page_path: window.location.pathname,
								});`,
									}}
								/>
							</>
						)}

						{config.LOAD_HOTJAR && (
							<script
								dangerouslySetInnerHTML={{
									__html: `
									(function(h,o,t,j,a,r){
										h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
										h._hjSettings={hjid:2331648,hjsv:6};
										a=o.getElementsByTagName('head')[0];
										r=o.createElement('script');r.async=1;
										r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
										a.appendChild(r);
									})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
								`,
								}}
							/>
						)}

						{config.LOAD_SMARTSUP && (
							<script
								type="text/javascript"
								dangerouslySetInnerHTML={{
									__html: `var _smartsupp = _smartsupp || {};
									_smartsupp.key = '${config.SMARTSUP_KEY}';
									window.smartsupp||(function(d) {
										var s,c,o=smartsupp=function(){ o._.push(arguments)};o._=[];
										s=d.getElementsByTagName('script')[0];c=d.createElement('script');
										c.type='text/javascript';c.charset='utf-8';c.async=true;
										c.src='https://www.smartsuppchat.com/loader.js?';s.parentNode.insertBefore(c,s);
									})(document);`,
								}}
							/>
						)}

						<script
							key="script/pre-init"
							type="application/javascript"
							dangerouslySetInnerHTML={{ __html: loadEnvConfig }}
						/>
						<GlobalStyle />
						<ToastContainer />
						<UserProvider user={user || {}}>
							<ModalProvider>
								<ShoppingCartProvider>
									{[internalPages.ideas, landingPage.about].includes(
										router.pathname,
									) ? (
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
					</>
				</ThemeProvider>
			</>
		);
	}
}

export default withRouter(SabiaApp);
