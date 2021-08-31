import PropTypes from 'prop-types';

import RegisterPage from '../screens/Register';
import { internal as internalPages } from '../utils/enums/pages.enum';

const Register = ({ initialStepIndex }) => {
	return <RegisterPage initialStepIndex={initialStepIndex} />;
};

Register.propTypes = {
	initialStepIndex: PropTypes.number.isRequired,
};

const initialStepIndexes = {
	[internalPages.register]: 0,
	[internalPages.confirm_account]: 2,
};

Register.getInitialProps = ({ pathname }) => {
	const initialStepIndex = initialStepIndexes[pathname];

	return {
		initialStepIndex,
	};
};

export default Register;
