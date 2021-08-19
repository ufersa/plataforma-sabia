import React from 'react';
import PropTypes from 'prop-types';

/**
 * Output render function with the property watched as parameter
 *
 * @param {object} props Component Props
 * @param {object} props.form react-hook-form
 * @param {string} props.property property to be watched from the form
 * @param {number} props.index index of the element to be watched if the property is an array
 * @param {string} props.render function to be rendered when the watched element changes
 * @returns {React.Component} render function from props
 */
const Watcher = ({ form, property, index, render }) => {
	const element = form.watch(index === null ? property : `${property}.${index}`);
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

Watcher.defaultProps = {
	index: null,
};

export default Watcher;
