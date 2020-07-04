/* eslint-disable no-use-before-define */
import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useFieldArray } from 'react-hook-form';

const Repeater = ({ childsComponent, endComponent, name, emptyValue, form, title }) => {
	const { control } = form;

	const { fields, append, remove } = useFieldArray({
		control,
		name,
	});

	useEffect(() => {
		if (!fields.length) {
			append(emptyValue);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			{title ? <h3>{title}</h3> : null}
			{fields.map((item, index) => (
				<Fragment key={item.id}>
					{childsComponent({
						item,
						control,
						fields,
						append,
						remove,
						index,
					})}
				</Fragment>
			))}
			{endComponent ? endComponent({ append, emptyValue }) : null}
		</>
	);
};

Repeater.propTypes = {
	emptyValue: PropTypes.shape({}).isRequired,
	title: PropTypes.string,
	name: PropTypes.string.isRequired,
	childsComponent: PropTypes.func.isRequired,
	endComponent: PropTypes.func,
	form: PropTypes.shape({
		control: PropTypes.shape({}).isRequired,
	}).isRequired,
};

Repeater.defaultProps = {
	endComponent: null,
	title: null,
};

export default Repeater;
