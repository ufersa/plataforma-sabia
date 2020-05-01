import React from 'react';
import { Route } from 'react-router-dom';
import { ForgotPassword, ResetPassword } from './components/Auth';

export default [
	<Route exact path="/auth/forgot-password" component={ForgotPassword} noLayout />,
	<Route exact path="/auth/reset-password" component={ResetPassword} noLayout />,
];
