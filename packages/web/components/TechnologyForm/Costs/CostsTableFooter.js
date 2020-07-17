import React from 'react';
import PropTypes from 'prop-types';
import { FaPlus } from 'react-icons/fa';
import { Hr } from './styles';
import { CircularButton } from '../../Button';
import Summary from '../../Summary';

const CostsTable = ({ form, append, collection, emptyValue }) => {
	return (
		<>
			<Hr />
			<Summary form={form} collection={collection} />
			<CircularButton
				right
				size="medium"
				variant="info"
				color="white"
				name={`${collection}_add_button`}
				onClick={(event) => {
					event.preventDefault();
					append(emptyValue);
				}}
			>
				<FaPlus />
			</CircularButton>
		</>
	);
};

CostsTable.propTypes = {
	collection: PropTypes.string.isRequired,
	form: PropTypes.shape({}).isRequired,
	emptyValue: PropTypes.shape({
		id: PropTypes.string,
	}).isRequired,
	append: PropTypes.func,
};

CostsTable.defaultProps = {
	append: () => {},
};

export default CostsTable;
