import React from 'react';
import { useLogin, useNotify, Notification } from 'react-admin';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {
	Avatar,
	CssBaseline,
	Link,
	Grid,
	Box,
	makeStyles,
	Container,
	Typography,
} from '@material-ui/core';
import Form from './AuthForm';

const Copyright = () => {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{'Copyright © '}
			<Link color="inherit" href="https://material-ui.com/">
				Plataforma Sabia
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
};

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
}));

const LoginPage = () => {
	const classes = useStyles();
	const login = useLogin();
	const notify = useNotify();
	const submit = ({ email, password }) => {
		login({ email, password }).catch(() => notify('Invalid email or password'));
	};
	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Entrar na Plataforma
				</Typography>
				<Form fields={['email', 'password']} submit={submit} buttonLabel="Entar" />
				<Grid container>
					<Grid item xs>
						<Link href="/auth/forgot-password" variant="body2">
							Esqueceu a senha?
						</Link>
					</Grid>
				</Grid>
				<Notification />
			</div>
			<Box mt={8}>
				<Copyright />
			</Box>
		</Container>
	);
};
export default LoginPage;
