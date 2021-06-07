import React from 'react';
import styled, { css } from 'styled-components';
import * as Layout from '../../../Common/Layout';
import { Tab, TabList, TabPanel, Tabs as Container } from '../../../Tab';
import About from './About';
import Description from './Description';
import Review from './Review';
import GeoLocation from './GeoLocation';
import Costs from './Costs';
import Attachments from './Attachments';
import FAQ from './FAQ';

const Tabs = () => {
	const tabs = [
		{ slug: 'about', label: 'Sobre a Tecnologia', component: About },
		{ slug: 'description', label: 'Caracterização', component: Description },
		{ slug: 'geolocation', label: 'Mapas', component: GeoLocation },
		{ slug: 'costs', label: 'Custos e Financiamento', component: Costs },
		{ slug: 'review', label: 'Avaliação', component: Review },
		{ slug: 'attachments', label: 'Documentos', component: Attachments },
		{ slug: 'faq', label: 'Perguntas e Respostas', component: FAQ },
	];

	return (
		<StyledTabs>
			<StyledTabList>
				{tabs.map((tab) => (
					<StyledTab key={tab.slug} data-testid={tab.slug}>
						{tab.label}
					</StyledTab>
				))}
			</StyledTabList>

			{tabs.map((tab) => (
				<TabPanel key={tab.slug}>
					<Row>{React.createElement(tab.component)}</Row>
				</TabPanel>
			))}
		</StyledTabs>
	);
};

export const Row = styled(Layout.Row)`
	${({ theme: { colors, screens, metrics } }) => css`
		background-color: ${colors.white};
		border-bottom-right-radius: ${metrics.baseRadius}rem;
		border-bottom-left-radius: ${metrics.baseRadius}rem;

		& > *:not(:first-child):not(:last-child) {
			margin: 0 1rem;
		}

		@media (max-width: ${screens.large}px) {
			& > *:not(:first-child):not(:last-child) {
				margin-top: 1.5rem;
			}
		}
	`}
`;

const StyledTabs = styled(Container)`
	border-radius: 5px;
	overflow: hidden;
	filter: drop-shadow(2px 2px 8px rgba(0, 0, 0, 0.15));
	margin-top: 8.4rem;
`;

const StyledTabList = styled(TabList)`
	${({ theme: { screens, colors } }) => css`
		display: grid;
		background-color: ${colors.lightGray4};

		@media screen and (min-width: ${screens.medium}px) {
			grid-template-columns: 1fr 1fr;
			grid-template-rows: 1fr 1fr 1fr;
		}

		@media screen and (min-width: ${screens.large}px) {
			grid-template-columns: 1fr 1fr 1fr 1fr;
			grid-template-rows: 1fr 1fr;
		}

		@media screen and (min-width: 1280px) {
			grid-template-columns: repeat(7, 1fr);
			grid-template-rows: 1fr;
		}
	`}
`;

const StyledTab = styled(Tab)`
	${({ selected, theme: { colors } }) => css`
		border: none;
		border-bottom: 0.4rem solid transparent;

		display: flex;
		align-items: center;
		justify-content: center;
		flex-grow: 1;

		color: ${colors.lightGray2};
		font-weight: 700;

		&:focus {
			color: ${colors.primary};

			&:after {
				content: '';
				position: absolute;
				height: 5px;
				left: 0;
				background: ${colors.primary};
			}
		}

		${!!selected &&
			css`
				color: ${colors.secondary};
				border-bottom: 0.4rem solid ${colors.secondary};
				background-color: ${colors.lightGray4};
			`}
	`}
`;

export default Tabs;
