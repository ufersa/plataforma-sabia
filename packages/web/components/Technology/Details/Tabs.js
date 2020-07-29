import React from 'react';
import { resetIdCounter } from 'react-tabs';
import styled, { css } from 'styled-components';
import { useTechnology } from '../../../hooks';
import * as Layout from '../../Common/Layout';
import { Tab, TabList, TabPanel, Tabs as Container } from '../../Tab';
import Description from './Description';
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
						<Description title="Identificação">
							<TextValue title="Título" value={technology.title} />
							<TextValue
								title="Nome Popular"
								value={technology.taxonomies.POPULAR_NAME}
							/>
							<TextValue title="Sigla" value={technology.taxonomies.INITIALS} />
							<TextValue title="Descrição" value={technology.description} />
							<TextValue title="Categoria" value={technology.taxonomies.CATEGORY} />
							<TextValue
								title="Classificação"
								value={technology.taxonomies.CLASSIFICATION}
							/>
							<TextValue title="Dimensão" value={technology.taxonomies.DIMENSION} />
							<TextValue
								title="Público-alvo"
								value={technology.taxonomies.TARGET_AUDIENCE}
							/>
							<TextValue title="Bioma" value={technology.taxonomies.BIOME} />
							<TextValue
								title="Programa Governamental"
								value={technology.taxonomies.GOVERNMENT_PROGRAM}
							/>
						</Description>

						<Description title="Aspectos Legais">
							<TextValue
								title="Tecnologia Patenteada"
								value={technology.patent ? 'Sim' : 'Não'}
							/>
							<TextValue
								title="Direitos intelectuais"
								value={technology.taxonomies.INTELLECTUAL_PROPERTY}
							/>
						</Description>

						<Description title="Desenvolvedor">
							<TextValue value={technology.taxonomies.DEVELOPER} />
						</Description>
					</Layout.Cell>
				</Row>
			</TabPanel>
			<TabPanel>
				<Row>
					<Layout.Cell col="2">
						<Description title="Objetivos">
							<TextValue
								title="Objetivo Principal"
								value={technology.taxonomies.OBJECTIVES}
							/>
						</Description>

						<Description title="Aplicação">
							<TextValue
								title="Onde é a Aplicação"
								value={technology.taxonomies.LOCALE}
							/>
						</Description>
					</Layout.Cell>
					<Layout.Cell col="2">
						<Description title="Problematização">
							<TextValue
								title="Problemas que a tecnologia soluciona"
								value={technology.taxonomies.PROBLEMATIZATION}
							/>
						</Description>

						<Description title="Contribuição">
							<TextValue
								title="Onde é a Aplicação"
								value={technology.taxonomies.CONTRIBUTION}
							/>
						</Description>
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
