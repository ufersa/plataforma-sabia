import React from 'react';
import PropTypes from 'prop-types';

import { TabPanel } from '../Tab';

import { HeroSearch } from './HeroSearch';
import * as S from './styles';
import tabs from './tabs';

const Hero = ({ heroImage }) => {
	return (
		<S.HeroImage image={heroImage}>
			<S.TabsWrapper>
				<S.TabsHeader>
					<S.TabList>
						{tabs.map((tab) => (
							<S.Tab key={tab.slug} data-testid={tab.slug}>
								{tab.label}
							</S.Tab>
						))}
					</S.TabList>
				</S.TabsHeader>

				{tabs.map((tab) => (
					<TabPanel key={tab.slug}>
						<HeroSearch
							solution={tab.slug}
							placeholder={tab.placeholder}
							algoliaIndexType={tab.algoliaIndexType}
						/>
					</TabPanel>
				))}
			</S.TabsWrapper>
		</S.HeroImage>
	);
};

Hero.propTypes = {
	heroImage: PropTypes.string.isRequired,
};

export default Hero;
