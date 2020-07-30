import React from 'react';
import { resetIdCounter } from 'react-tabs';
import styled, { css } from 'styled-components';
import { useTechnology } from '../../../hooks';
import * as Layout from '../../Common/Layout';
import { Tab, TabList, TabPanel, Tabs as Container } from '../../Tab';
import Section from './Section';
import TextValue from './TextValue';

const Tabs = () => {
	const { technology } = useTechnology();

	return (
		<Container>
			<TabList>
				<Tab>Sobre a Tecnologia</Tab>
				<Tab>Caracterização</Tab>
			</TabList>

			<TabPanel>
				<Row>
					<Layout.Cell col="1">
						<Section title="Identificação">
							<TextValue title="Título" value={technology.title} />
							<TextValue
								title="Nome Popular"
								value={technology.taxonomies?.popular_name}
							/>
							<TextValue title="Sigla" value={technology.taxonomies?.initials} />
							<TextValue title="Descrição" value={technology.description} />
							<TextValue title="Categoria" value={technology.taxonomies?.category} />
							<TextValue
								title="Classificação"
								value={technology.taxonomies?.classification}
							/>
							<TextValue title="Dimensão" value={technology.taxonomies?.dimension} />
							<TextValue
								title="Público-alvo"
								value={technology.taxonomies?.target_audience}
							/>
							<TextValue title="Bioma" value={technology.taxonomies?.biome} />
							<TextValue
								title="Programa Governamental"
								value={technology.taxonomies?.government_program}
							/>
						</Section>

						<Section title="Aspectos Legais">
							<TextValue
								title="Tecnologia Patenteada"
								value={technology.patent ? 'Sim' : 'Não'}
							/>
							<TextValue
								title="Direitos intelectuais"
								value={technology.taxonomies?.intellectual_property}
							/>
						</Section>

						<Section title="Desenvolvedor">
							<TextValue value={technology.taxonomies?.developer} />
						</Section>
					</Layout.Cell>
				</Row>
			</TabPanel>
			<TabPanel>
				<Row>
					<Layout.Cell col="2">
						<Section title="Objetivos">
							<TextValue
								title="Objetivo Principal"
								value={technology.taxonomies?.objectives}
							/>
						</Section>

						<Section title="Aplicação">
							<TextValue
								title="Onde é a Aplicação"
								value={technology.taxonomies?.locale}
							/>
						</Section>
					</Layout.Cell>
					<Layout.Cell col="2">
						<Section title="Problematização">
							<TextValue
								title="Problemas que a tecnologia soluciona"
								value={technology.taxonomies?.problematization}
							/>
						</Section>

						<Section title="Contribuição">
							<TextValue
								title="Onde é a Aplicação"
								value={technology.taxonomies?.contribution}
							/>
						</Section>
					</Layout.Cell>
				</Row>
			</TabPanel>
		</Container>
	);
};

Tabs.getInitialProps = () => {
	resetIdCounter();
};

export const Row = styled(Layout.Row)`
	${({ theme: { colors, screens } }) => css`
		background-color: ${colors.white};

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

export default Tabs;
