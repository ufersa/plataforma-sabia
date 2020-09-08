import React, { useState } from 'react';
import { resetIdCounter } from 'react-tabs';
import styled, { css } from 'styled-components';
import { useTechnology } from '../../../hooks';
import * as Layout from '../../Common/Layout';
import { Tab, TabList, TabPanel, Tabs as Container } from '../../Tab';
import Section from './Section';
import TextValue from './TextValue';
import GoogleMaps, { getMarkerIconByTerm } from '../../GoogleMaps';
import TechonologyEnums from '../../../utils/enums/technology.enums';
import CheckBoxField from '../../Form/CheckBoxField';

const Tabs = () => {
	const context = useTechnology();
	const [markerFilters, setMarkerFilters] = useState([
		TechonologyEnums.WHO_DEVELOP,
		TechonologyEnums.WHERE_CAN_BE_APPLIED,
		TechonologyEnums.WHERE_IS_ALREADY_IMPLEMENTED,
	]);
	const { technology } = context;

	const handleMarkerFilterChange = (value) => {
		const previousMarkerFilters = [...markerFilters];
		const checkBoxIndex = previousMarkerFilters.findIndex((filter) => filter === value);
		// eslint-disable-next-line no-unused-expressions
		checkBoxIndex === -1
			? previousMarkerFilters.push(value)
			: previousMarkerFilters.splice(checkBoxIndex, 1);

		setMarkerFilters(previousMarkerFilters);
	};

	const parseTermMetaIntoMarker = (term) => {
		const marker = { type: term.term };
		// eslint-disable-next-line no-return-assign
		term.metas.forEach(({ meta_key, meta_value }) => (marker[meta_key] = meta_value));
		return marker;
	};

	const getMarkers = () => {
		return technology.terms
			.filter(
				({ term }) =>
					[
						TechonologyEnums.WHO_DEVELOP,
						TechonologyEnums.WHERE_IS_ALREADY_IMPLEMENTED,
					].includes(term) && markerFilters.includes(term),
			)
			.map(parseTermMetaIntoMarker);
	};

	return (
		<Container>
			<TabList>
				<Tab>Sobre a Tecnologia</Tab>
				<Tab>Caracterização</Tab>
				<Tab>Georeferenciamento</Tab>
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
				<Row row>
					<Layout.Cell>
						<GoogleMapWrapper>
							<GoogleMaps markers={getMarkers()} />
						</GoogleMapWrapper>
					</Layout.Cell>
					<Layout.Cell>
						<MapLegend>
							<Row>
								<Layout.Column flex align="center">
									<CheckBoxField
										name={TechonologyEnums.WHO_DEVELOP}
										label={
											<Row align="center" justify="center" mb={0}>
												<Icon
													src={getMarkerIconByTerm.get(
														TechonologyEnums.WHO_DEVELOP,
													)}
													size={32}
												/>
												<Label>Onde é desenvolvida</Label>
											</Row>
										}
										onChange={() =>
											handleMarkerFilterChange(TechonologyEnums.WHO_DEVELOP)
										}
										value={markerFilters.includes(TechonologyEnums.WHO_DEVELOP)}
									/>
								</Layout.Column>
							</Row>
							<Row>
								<Layout.Column flex align="center">
									<CheckBoxField
										name={TechonologyEnums.WHERE_CAN_BE_APPLIED}
										label={
											<Row align="center" justify="center" mb={0}>
												<Icon
													src={getMarkerIconByTerm.get(
														TechonologyEnums.WHERE_CAN_BE_APPLIED,
													)}
													size={32}
												/>
												<Label>Onde pode ser aplicada</Label>
											</Row>
										}
										onChange={() =>
											handleMarkerFilterChange(
												TechonologyEnums.WHERE_CAN_BE_APPLIED,
											)
										}
										value={markerFilters.includes(
											TechonologyEnums.WHERE_CAN_BE_APPLIED,
										)}
									/>
								</Layout.Column>
							</Row>
							<Row>
								<Layout.Column flex align="center">
									<CheckBoxField
										name={TechonologyEnums.WHERE_IS_ALREADY_IMPLEMENTED}
										label={
											<Row align="center" justify="center" mb={0}>
												<Icon
													src={getMarkerIconByTerm.get(
														TechonologyEnums.WHERE_IS_ALREADY_IMPLEMENTED,
													)}
													size={32}
												/>
												<Label>Onde já está implementada</Label>
											</Row>
										}
										onChange={() =>
											handleMarkerFilterChange(
												TechonologyEnums.WHERE_IS_ALREADY_IMPLEMENTED,
											)
										}
										value={markerFilters.includes(
											TechonologyEnums.WHERE_IS_ALREADY_IMPLEMENTED,
										)}
									/>
								</Layout.Column>
							</Row>
						</MapLegend>
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

export const MapLegend = styled.div``;
export const Icon = styled.img`
	${({ size }) => (size ? 'height: 32px; width: 32px;' : '')}
`;
export const Label = styled.div``;
export const GoogleMapWrapper = styled.div`
	flex: 1;
	position: relative;
	display: block;
	height: 60vh;
	width: 100%;
`;

export default Tabs;
