import React from 'react';
import PropTypes from 'prop-types';
import CardComponent from './SolutionCard';
import SolutionsWrapper from './SolutionsWrapper';

const SolutionsSection = ({ header, data, type, bgColor }) => {
	return (
		<SolutionsWrapper header={header} bgColor={bgColor}>
			{data.map((solution) => (
				<CardComponent key={solution.id} type={type} data={solution} />
			))}
		</SolutionsWrapper>
	);
};

SolutionsSection.propTypes = {
	header: PropTypes.string,
	data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
	bgColor: PropTypes.string,
	type: PropTypes.string.isRequired,
};

SolutionsSection.defaultProps = {
	header: null,
	bgColor: '',
};

export default SolutionsSection;
