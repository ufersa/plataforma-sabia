import React from 'react';
import PropTypes from 'prop-types';
import { FormDataConsumer, BooleanInput } from 'react-admin';

const BooleanNumInput = ({ format, parse, source, options }) => (
	<FormDataConsumer>
		{({ formData }) => (
			<BooleanInput
				options={{
					checked: format(formData[source]),
					...options,
				}}
				format={format}
				parse={parse}
				source={source}
			/>
		)}
	</FormDataConsumer>
);

BooleanNumInput.propTypes = {
	options: PropTypes.shape({}),
	source: PropTypes.string,
	parse: PropTypes.func,
	format: PropTypes.func,
};

BooleanNumInput.defaultProps = {
	options: {},
	source: '',
	parse: () => {},
	format: () => {},
};

export default BooleanNumInput;
