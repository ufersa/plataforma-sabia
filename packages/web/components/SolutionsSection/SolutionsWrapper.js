import React from 'react';
import PropTypes from 'prop-types';
import { ContentContainer, SectionTitle } from '../Common';
import { CardsWrapper } from './styles';

const SolutionsWrapper = ({
	children,
	header,
	headerAlign,
	headerColor,
	bgColor,
	algoliaCustomCss,
	overwriteAlgoliaStyles,
}) => {
	return (
		<ContentContainer bgColor={bgColor} padding="3.2rem 5%">
			{!!header && (
				<SectionTitle align={headerAlign} color={headerColor} noPadding>
					{header}
				</SectionTitle>
			)}
			<CardsWrapper
				algoliaCustomCss={algoliaCustomCss}
				overwriteAlgoliaStyles={overwriteAlgoliaStyles}
				data-testid="cards-wrapper"
			>
				{children}
			</CardsWrapper>
		</ContentContainer>
	);
};

SolutionsWrapper.propTypes = {
	children: PropTypes.node.isRequired,
	header: PropTypes.string,
	bgColor: PropTypes.string,
	overwriteAlgoliaStyles: PropTypes.bool,
	headerAlign: PropTypes.string,
	headerColor: PropTypes.string,
	algoliaCustomCss: PropTypes.arrayOf(PropTypes.string),
};

SolutionsWrapper.defaultProps = {
	header: null,
	bgColor: '',
	overwriteAlgoliaStyles: false,
	headerAlign: '',
	headerColor: '',
	algoliaCustomCss: [''],
};

export default SolutionsWrapper;
