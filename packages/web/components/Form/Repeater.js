/* eslint-disable no-use-before-define */
import React, { Fragment } from 'react';
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
			{fields.map((item, index) => (
				<Fragment key={item.id}>
					{childsComponent({ item, control, fields, append, remove, index })}
				</Fragment>
			))}
			{endComponent({ append, emptyValue })}
		</>
	);
};

Repeater.propTypes = {
	emptyValue: PropTypes.shape({}).isRequired,
	initialValue: PropTypes.arrayOf(PropTypes.shape({}).isRequired),
	name: PropTypes.string.isRequired,
	childsComponent: PropTypes.func.isRequired,
	endComponent: PropTypes.func,
};

Repeater.defaultProps = {
	endComponent: null,
	initialValue: null,
};

export default Repeater;
