import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, TextField } from '@material-ui/core';
import useStyles from './styles';

const Form = ({ submit, buttonLabel, fields }) => {
	const classes = useStyles();
	const [fieldsValues, setFieldValues] = useState({});
	const submitForm = (e) => {
		e.preventDefault();
		submit(fieldsValues);
	};
	return (
		<form className={classes.form} onSubmit={submitForm}>
			{fields.includes('email') && (
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
					onChange={(e) =>
						setFieldValues({
							...fieldsValues,
							email: e.target.value,
						})
					}
				/>
			)}
			{fields.includes('password') && (
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
					onChange={(e) =>
						setFieldValues({
							...fieldsValues,
							password: e.target.value,
						})
					}
				/>
			)}
			{fields.includes('password2') && (
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
					onChange={(e) =>
						setFieldValues({
							...fieldsValues,
							password2: e.target.value,
						})
					}
				/>
			)}
			<Button
				type="submit"
				fullWidth
				variant="contained"
				color="primary"
				className={classes.submit}>
				{buttonLabel}
			</Button>
		</form>
	);
};
Form.defaultProps = {
	// submit: () => {},
};
Form.propTypes = {
	submit: PropTypes.func.isRequired,
	buttonLabel: PropTypes.string.isRequired,
	fields: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Form;
