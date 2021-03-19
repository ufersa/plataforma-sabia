import React, { useMemo } from 'react';

import { TabPanel } from '../Tab';

import { HeroSearch } from './HeroSearch';
import * as S from './styles';
import tabs from './tabs';

const Hero = () => {
	const heroImage = useMemo(() => {
		const heroImgs = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg'];
		const heroIndexImg = Math.floor(Math.random() * heroImgs.length);
		return `/hero/${heroImgs[heroIndexImg]}`;
	}, []);

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

export default Hero;
