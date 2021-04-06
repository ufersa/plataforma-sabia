import React from 'react';
import PropTypes from 'prop-types';
import { ContentContainer, SectionTitle, Title } from '../Common';
import { CardsWrapper } from './styles';

const headerComponents = {
	title: Title,
	sectionTitle: SectionTitle,
};

const SolutionsWrapper = ({
	children,
	header,
	headerComponent,
	headerAlign,
	headerColor,
	bgColor,
	algoliaCustomCss,
	overwriteAlgoliaStyles,
}) => {
	const HeaderComponent = headerComponents[headerComponent];

	return (
		<ContentContainer bgColor={bgColor} padding="3.2rem 5%">
			{!!header && (
				<HeaderComponent align={headerAlign} color={headerColor} noPadding>
					{header}
				</HeaderComponent>
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
	headerComponent: PropTypes.string,
};

SolutionsWrapper.defaultProps = {
	header: null,
	bgColor: '',
	overwriteAlgoliaStyles: false,
	headerAlign: '',
	headerColor: '',
	algoliaCustomCss: [''],
	headerComponent: 'sectionTitle',
};

export default SolutionsWrapper;
