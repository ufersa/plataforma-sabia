import React from 'react';
import { resetIdCounter } from 'react-tabs';
import styled, { css } from 'styled-components';
import { useTechnology } from '../../../hooks';
import * as Layout from '../../Common/Layout';
import { Tab, TabList, TabPanel, Tabs as Container } from '../../Tab';
import Section from './Section';
import TextValue from './TextValue';
import { Costs as CostsTable } from './Tables';
import { Protected } from '../../Authorization';

const Tabs = () => {
	const { technology } = useTechnology();

	return (
		<Container>
			<TabList>
				<Tab>Sobre a Tecnologia</Tab>
				<Tab>Caracterização</Tab>
				<Tab>Custos e Financiamento</Tab>
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
								value={technology.primary_purpose}
							/>
							<TextValue
								title="Objetivos secundários"
								value={technology.secondary_purpose}
							/>
						</Section>

						<Section title="Aplicação">
							<TextValue
								title="Onde é a Aplicação"
								value={technology.application_mode}
							/>
							<TextValue title="Aplicação" value={technology.application_mode} />
							<TextValue
								title="Exemplos de Aplicação"
								value={technology.application_examples}
							/>
							<TextValue
								title="Pré-requisitos para a implantação"
								value={technology.requirements}
							/>
							<TextValue
								title="Duração do processo de instalação da tecnologia"
								value={`${technology.installation_time} dias`}
							/>
						</Section>
					</Layout.Cell>
					<Layout.Cell col="2">
						<Section title="Problematização">
							<TextValue
								title="Problemas que a tecnologia soluciona"
								value={technology.solves_problem}
							/>
							<TextValue
								title="Problemas que a tecnologia acarreta"
								value={technology.entailes_problem}
							/>
						</Section>

						<Section title="Contribuição">
							<TextValue
								title="Contribuição para o semiárido"
								value={technology.contribution}
							/>
						</Section>

						<Section title="Riscos">
							<TextValue
								title="Riscos associados à tecnologia"
								value={technology.risks}
							/>
						</Section>
					</Layout.Cell>
				</Row>
			</TabPanel>
			<TabPanel>
				<Row>
					<Layout.Cell col="2">
						<Section title="Custos da Tecnologia" hideWhenIsEmpty={false}>
							<Protected inline>
								<CostsTable
									title="Custo de Desenvolvimento"
									data={technology?.technologyCosts?.costs?.development_costs}
									totalColor="green"
								/>
								<CostsTable
									title="Custos de Implantação"
									data={technology?.technologyCosts?.costs?.implementation_costs}
								/>
								<CostsTable
									title="Custos de Manutenção"
									data={technology?.technologyCosts?.costs?.maintenence_costs}
									totalColor="green"
								/>
							</Protected>
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
