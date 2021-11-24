/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useTheme } from 'styled-components';
import { useMediaQuery } from '../../hooks';
import { ContentContainer, SectionTitle, Title } from '../Common';
import { CardsWrapper, SolutionFooter, CarouselContainer, Carousel } from './styles';
import { internal as internalPages, socialMedia } from '../../utils/enums/pages.enum';
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
	mobileSlider,
	algoliaCustomCss,
	overwriteAlgoliaStyles,
}) => {
	const HeaderComponent = headerComponents[headerComponent];
	const { screens } = useTheme();
	const settings = {
		dots: false,
		infinite: false,
		arrows: false,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		variableWidth: true,
		centerMode: true,
	};

	const isBreakpoint = useMediaQuery(screens.medium);

	return (
		<ContentContainer bgColor={bgColor} padding={containerPadding}>
			{!!header && (
				<HeaderComponent {...headerProps} noPadding>
					{header}
				</HeaderComponent>
			)}
			{isBreakpoint && mobileSlider ? (
				<CarouselContainer>
					<Carousel {...settings}>{children}</Carousel>
				</CarouselContainer>
			) : (
				<CardsWrapper
					algoliaCustomCss={algoliaCustomCss}
					overwriteAlgoliaStyles={overwriteAlgoliaStyles}
					data-testid="cards-wrapper"
				>
					{children}
				</CardsWrapper>
			)}
			{!!footer && !!redirectTo && (
				<SolutionFooter>
					<Link href={internalPages[redirectTo] || socialMedia[redirectTo]} passHref>
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
			)}
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
	mobileSlider: PropTypes.bool,
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
	mobileSlider: false,
};

export default SolutionsWrapper;
