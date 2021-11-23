/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { ContentContainer, SectionTitle, Title } from '../Common';
import { CardsWrapper, SolutionFooter } from './styles';
import { internal as internalPages } from '../../utils/enums/pages.enum';
import { RectangularButton } from '../Button';

const headerComponents = {
	title: Title,
	sectionTitle: SectionTitle,
};

const SolutionsWrapper = ({
	children,
	containerPadding,
	header,
	footer,
	redirectTo,
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
			<SolutionFooter>
				<Link href={internalPages[redirectTo]} passHref>
					<RectangularButton
						as="a"
						variant="outlined"
						uppercase
						width="27.8rem"
						colorVariant="green"
					>
						{footer}
					</RectangularButton>
				</Link>
			</SolutionFooter>
		</ContentContainer>
	);
};

SolutionsWrapper.propTypes = {
	children: PropTypes.node.isRequired,
	header: PropTypes.string,
	footer: PropTypes.string,
	bgColor: PropTypes.string,
	redirectTo: PropTypes.string,
	overwriteAlgoliaStyles: PropTypes.bool,
	headerProps: PropTypes.shape({}),
	algoliaCustomCss: PropTypes.arrayOf(PropTypes.func),
	headerComponent: PropTypes.string,
	containerPadding: PropTypes.string,
};

SolutionsWrapper.defaultProps = {
	header: null,
	bgColor: '',
	overwriteAlgoliaStyles: false,
	headerProps: {},
	algoliaCustomCss: [() => {}],
	footer: null,
	redirectTo: 'home',
	headerComponent: 'sectionTitle',
	containerPadding: '3.2rem 5%',
};

export default SolutionsWrapper;
