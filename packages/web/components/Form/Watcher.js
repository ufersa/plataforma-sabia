import PropTypes from 'prop-types';

const Watcher = ({ form, property, index, render }) => {
	const element = form.watch(typeof index === 'undefined' ? property : `${property}[${index}]`);
	return render(element);
};

Watcher.propTypes = {
	render: PropTypes.func.isRequired,
	index: PropTypes.number,
	property: PropTypes.string.isRequired,
	form: PropTypes.shape({
		control: PropTypes.shape({}).isRequired,
	}).isRequired,
};

Watcher.defaultProps = {};

export default Watcher;
