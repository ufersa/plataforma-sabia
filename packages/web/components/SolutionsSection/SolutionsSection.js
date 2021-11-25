import React from 'react';
import PropTypes from 'prop-types';
import CardComponent from './SolutionCard';
import SolutionsWrapper from './SolutionsWrapper';

const SolutionsSection = ({ header, footer, redirectTo, data, type, bgColor, mobileSlider }) => {
	return (
		<SolutionsWrapper
			header={header}
			footer={footer}
			redirectTo={redirectTo}
			bgColor={bgColor}
			mobileSlider={mobileSlider}
		>
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
	footer: PropTypes.string,
	redirectTo: PropTypes.string,
	mobileSlider: PropTypes.bool,
	type: PropTypes.string.isRequired,
};

SolutionsSection.defaultProps = {
	header: null,
	footer: null,
	redirectTo: 'home',
	bgColor: '',
	mobileSlider: false,
};

export default SolutionsSection;
