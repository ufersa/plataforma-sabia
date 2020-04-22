import React from 'react';
import PropTypes from 'prop-types';
import { Button, TextField } from '@material-ui/core';
import useStyles from './styles';

const Form = ({ mySubmit, setEmail, setPassword, setPassword2, textButSubmit }) => {
	const classes = useStyles();
	return (
		<form className={classes.form} onSubmit={mySubmit}>
			{setEmail && (
				<TextField
					variant="outlined"
					margin="normal"
					required
					fullWidth
					id="email"
					label="Email"
					name="email"
					autoComplete="email"
					autoFocus
					onChange={(e) => setEmail(e.target.value)}
				/>
			)}
			{setPassword && (
				<TextField
					variant="outlined"
					margin="normal"
					required
					fullWidth
					name="password"
					label="Senha"
					type="password"
					id="password"
					autoComplete="current-password"
					onChange={(e) => setPassword(e.target.value)}
				/>
			)}
			{setPassword2 && (
				<TextField
					variant="outlined"
					margin="normal"
					required
					fullWidth
					name="password2"
					label="Digite a senha novamente"
					type="password"
					id="password2"
					autoComplete="current-password"
					onChange={(e) => setPassword2(e.target.value)}
				/>
			)}
			<Button
				type="submit"
				fullWidth
				variant="contained"
				color="primary"
				className={classes.submit}>
				{textButSubmit}
			</Button>
		</form>
	);
};

Form.propTypes = {
	mySubmit: PropTypes.func.isRequired,
	setEmail: PropTypes.func,
	setPassword: PropTypes.func,
	setPassword2: PropTypes.func,
	textButSubmit: PropTypes.string.isRequired,
};
Form.defaultProps = {
	setEmail: undefined,
	setPassword: undefined,
	setPassword2: undefined,
};
export default Form;
