/* eslint-disable no-use-before-define */
import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useFieldArray } from 'react-hook-form';

const Repeater = ({ childsComponent, endComponent, name, emptyValue, form }) => {
	const { control } = form;

	const { fields, append, remove } = useFieldArray({
		control,
		name,
	});

	useEffect(() => {
		if (!fields.length) {
			append(emptyValue);
		}
	}, [append, emptyValue, fields]);

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
	name: PropTypes.string.isRequired,
	childsComponent: PropTypes.func.isRequired,
	endComponent: PropTypes.func,
	form: PropTypes.shape({
		control: PropTypes.shape({}).isRequired,
	}).isRequired,
};

Repeater.defaultProps = {
	endComponent: null,
};

export default Repeater;
