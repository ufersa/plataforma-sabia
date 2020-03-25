/* eslint-disable react/jsx-props-no-spreading */
import App from 'next/app';
import React from 'react';
import GlobalStyle from '../styles/global';

export default class MyApp extends App {
	render() {
		const { Component, pageProps } = this.props;
		return (
			<>
				<Component {...pageProps} />;
				<GlobalStyle />
			</>
		);
	}
}
