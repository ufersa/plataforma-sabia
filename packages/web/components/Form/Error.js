import PropTypes from 'prop-types';
import { RiErrorWarningLine } from 'react-icons/ri';
import { Error } from './styles';

const ErrorComponent = ({ message }) => {
	return (
		<Error>
			<RiErrorWarningLine />
			{message}
		</Error>
	);
};

ErrorComponent.propTypes = {
	message: PropTypes.string.isRequired,
};

export default ErrorComponent;
