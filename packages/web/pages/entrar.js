/* eslint-disable react/jsx-props-no-spreading */
import SignInPage from '../screens/SignIn';

const SignIn = (props) => {
	return <SignInPage {...props} />;
};

SignIn.getInitialProps = ({ query }) => {
	return {
		redirect: query.redirect,
	};
};

export default SignIn;
