import React from 'react';
import { HeroSearch } from '../../components/Hero/HeroSearch';
import { ContentContainer } from '../../components/Common';
import { appWithTranslation } from '../../utils/i18n';
import { theme } from '../../styles';

export default {
	title: 'Algolia/Hero Search',
	component: HeroSearch,
};

const HeroSearchTemplate = () => (
	<ContentContainer bgColor={theme.colors.secondary}>
		<HeroSearch />
	</ContentContainer>
);

export const HeroSearchWithTranslation = appWithTranslation(HeroSearchTemplate);
