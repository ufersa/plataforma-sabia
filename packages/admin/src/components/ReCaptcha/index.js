import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const siteKey = process.env.REACT_APP_GOOGLE_RECAPTCHA_V3_PUBLIC_KEY;
const recaptcha = document.getElementById('script_recaptcha');
if (!recaptcha) {
	const script = document.createElement('script');
	script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
	script.async = true;
	script.id = 'script_recaptcha';
	document.body.appendChild(script);
}

const ReCaptcha = ({ sucess }) => {
	const [token, setToken] = useState(false);
	useEffect(() => {
		if (window.grecaptcha && !token) {
			window.grecaptcha.execute(siteKey).then((newtoken) => {
				setToken(true);
				sucess(newtoken);
			});
		}
	}, [sucess, token]);
	return null;
};

ReCaptcha.propTypes = {
	sucess: PropTypes.func.isRequired,
};
export default ReCaptcha;
