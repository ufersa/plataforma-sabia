/* eslint-disable react/jsx-props-no-spreading */
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
	containerPadding,
	header,
	headerProps,
	headerComponent,
	bgColor,
	algoliaCustomCss,
	overwriteAlgoliaStyles,
}) => {
	const HeaderComponent = headerComponents[headerComponent];

	return (
		<ContentContainer bgColor={bgColor} padding={containerPadding}>
			{!!header && (
				<HeaderComponent {...headerProps} noPadding>
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
	headerProps: PropTypes.shape({}),
	algoliaCustomCss: PropTypes.arrayOf(PropTypes.string),
	headerComponent: PropTypes.string,
	containerPadding: PropTypes.string,
};

SolutionsWrapper.defaultProps = {
	header: null,
	bgColor: '',
	overwriteAlgoliaStyles: false,
	headerProps: {},
	algoliaCustomCss: [''],
	headerComponent: 'sectionTitle',
	containerPadding: '3.2rem 5%',
};

export default SolutionsWrapper;
