import { algoliaDefaultConfig } from '../Algolia/provider';
import { TechnologyHitCard, ServiceHitCard, RefinementList, ToggleRefinement } from '../Algolia';

export const getSolutionsComponents = (t) => ({
	technologies: {
		indexName: algoliaDefaultConfig.technology.indexName,
		sortBy: {
			defaultRefinement: algoliaDefaultConfig.technology.indexName,
			items: [
				{
					label: t('search:sortByRelevance'),
					value: algoliaDefaultConfig.technology.indexName,
				},
				{
					label: t('search:sortByInstallationTimeAsc'),
					value: `${algoliaDefaultConfig.technology.indexName}_installation_time_asc`,
				},
				{
					label: t('search:sortByInstallationTimeDesc'),
					value: `${algoliaDefaultConfig.technology.indexName}_installation_time_desc`,
				},
			],
		},
		hits: {
			hitComponent: TechnologyHitCard,
		},
		filters: [
			{
				header: t('common:classification'),
				component: RefinementList,
				componentProps: {
					attribute: 'classification',
					placeholder: t('search:searchClassificationPlaceholder'),
				},
			},
			{
				header: t('common:type'),
				component: RefinementList,
				componentProps: {
					attribute: 'type',
					placeholder: t('search:searchTypePlaceholder'),
				},
			},
			{
				header: t('common:dimension'),
				component: RefinementList,
				componentProps: {
					attribute: 'dimension',
					placeholder: t('search:searchDimensionPlaceholder'),
				},
			},
			{
				header: t('common:targetAudience'),
				component: RefinementList,
				componentProps: {
					attribute: 'targetAudience',
					placeholder: t('search:searchTargetAudiencePlaceholder'),
				},
			},
			{
				header: t('common:institution'),
				component: RefinementList,
				componentProps: {
					attribute: 'institution',
					placeholder: t('search:searchInstitutionPlaceholder'),
				},
			},
			{
				header: t('common:keywords'),
				component: RefinementList,
				componentProps: {
					attribute: 'keywords',
					placeholder: t('search:searchKeywordPlaceholder'),
				},
			},
			{
				header: t('search:forSale'),
				component: ToggleRefinement,
				componentProps: {
					attribute: 'forSale',
					label: t('search:filterOnlyForSale'),
					value: 1,
				},
			},
		],
	},
	services: {
		indexName: algoliaDefaultConfig.service.indexName,
		sortBy: {
			defaultRefinement: algoliaDefaultConfig.service.indexName,
			items: [
				{
					label: t('search:sortByRelevance'),
					value: algoliaDefaultConfig.service.indexName,
				},
			],
		},
		hits: {
			hitComponent: ServiceHitCard,
		},
		filters: [
			{
				header: t('common:type'),
				component: RefinementList,
				componentProps: {
					attribute: 'type',
					placeholder: t('search:searchTypePlaceholder'),
				},
			},
			{
				header: t('common:institution'),
				component: RefinementList,
				componentProps: {
					attribute: 'institution',
					placeholder: t('search:searchInstitutionPlaceholder'),
				},
			},
			{
				header: t('common:keywords'),
				component: RefinementList,
				componentProps: {
					attribute: 'keywords',
					placeholder: t('search:searchKeywordPlaceholder'),
				},
			},
		],
	},
});

export const getTabs = (t) => [
	{
		id: 1,
		label: 'Tecnologias',
		slug: 'technologies',
		components: {
			...getSolutionsComponents(t).technologies,
		},
	},
	{
		id: 2,
		label: 'Serviços',
		slug: 'services',
		components: {
			...getSolutionsComponents(t).services,
		},
	},
];
