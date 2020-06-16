/* eslint-disable no-use-before-define */
import React from 'react';
import PropTypes from 'prop-types';
import { useFieldArray, useForm } from 'react-hook-form';

const Repeater = ({ childsComponent, endComponent, name, emptyValue, initialValue }) => {
	const { control } = useForm({
		defaultValues: {
			[name]: initialValue || [emptyValue],
		},
	});

	const { fields, append, remove } = useFieldArray({
		control,
		name,
	});

	return (
		<>
			{fields.map((item, index) =>
				childsComponent({ item, control, fields, append, remove, index }),
			)}
			{endComponent({ append, emptyValue })}
		</>
	);
};

Repeater.propTypes = {
	emptyValue: PropTypes.shape({}).isRequired,
	initialValue: PropTypes.arrayOf(PropTypes.shape({}).isRequired),
	name: PropTypes.string.isRequired,
	childsComponent: PropTypes.node.isRequired,
	endComponent: PropTypes.node,
};

Repeater.defaultProps = {
	endComponent: null,
	initialValue: null,
};

export default Repeater;
