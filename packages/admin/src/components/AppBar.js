import * as React from 'react';
import { AppBar as AppBarRA } from 'react-admin';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';

import LocaleSwitcher from './LocaleSwitcher';

const useStyles = makeStyles({
	title: {
		flex: 1,
		textOverflow: 'ellipsis',
		whiteSpace: 'nowrap',
		overflow: 'hidden',
		color: '#00A688',
	},
	spacer: {
		flex: 1,
	},
	AppBarRA: {
		backgroundColor: '#F2F2F2',
	},
	logo: {
		marginRight: 20,
		borderRightColor: '#B1B1B1',
		borderRightStyle: 'solid',
		borderRightWidth: 1,
		paddingRight: 45,
	},
});

const AppBar = (props) => {
	const classes = useStyles();
	const isBigger = useMediaQuery((theme) => theme.breakpoints.up('sm'));
	return (
		// eslint-disable-next-line react/jsx-props-no-spreading
		<AppBarRA {...props} className={classes.AppBarRA}>
			{isBigger ? (
				<img
					src="/images/logo-sabia.png"
					title="Plataforma Sabiá - ADMIN"
					alt="Plataforma Sabiá - ADMIN"
					height="40"
					className={classes.logo}
				/>
			) : (
				<></>
			)}
			<Typography
				variant="h6"
				color="inherit"
				className={classes.title}
				id="react-admin-title"
			/>
			<span className={classes.spacer} />
			<LocaleSwitcher />
		</AppBarRA>
	);
};

export default AppBar;
