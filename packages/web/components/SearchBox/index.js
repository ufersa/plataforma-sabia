import React from 'react';
import PropTypes from 'prop-types';

import StyledSearchBox from './styles';

const SearchBox = ({ placeholder, onChange, onSubmit }) => (
	<StyledSearchBox
		translations={{
			placeholder,
		}}
		onChange={onChange}
		onSubmit={onSubmit}
	/>
);

SearchBox.propTypes = {
	placeholder: PropTypes.string,
	onChange: PropTypes.func,
	onSubmit: PropTypes.func,
};

SearchBox.defaultProps = {
	placeholder: '',
	onChange: () => {},
	onSubmit: () => {},
};

export default SearchBox;
