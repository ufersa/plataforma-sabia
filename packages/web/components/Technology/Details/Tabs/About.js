import React from 'react';
import styled, { css } from 'styled-components';
import { useTechnology } from '../../../../hooks';
import * as Layout from '../../../Common/Layout';
import Section from '../Section';
import TextValue from '../TextValue';
import TechnologyReadinessLevel from '../ReadinessLevel';
import { normalizeTrl } from '../../../../utils/technology';
import { TYPES as typesEnum } from '../../../../utils/enums/technology.enums';

const About = () => {
	const { technology } = useTechnology();
	const { greatArea, area, subArea, speciality } = technology.knowledgeAreas;

	const { slug: readinessLevelSlug } = normalizeTrl(technology.terms);
	const currentStage = Number(readinessLevelSlug.split('-', 2)[1]);

	return (
		<>
			<Layout.Cell col="1">
				<Section title="Identificação">
					<TextValue title="Título" value={technology.title} />
					<TextValue title="Nome Popular" value={technology.taxonomies?.popular_name} />
					<TextValue title="Sigla" value={technology.taxonomies?.initials} />
					<TextValue title="Descrição" value={technology.description} />
					<TextValue
						title="Tipo"
						value={typesEnum.find((type) => type.value === technology.type)?.label}
					/>
					<TextValue title="Grande área" value={greatArea?.name} />
					<TextValue title="Área" value={area?.name} />
					<TextValue title="Sub-área" value={subArea?.name} />
					<TextValue title="Especialidade" value={speciality?.name} />
					<TextValue title="Domínio público" value={technology.public_domain} boolean />
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
						title="Registro de patente depositado"
						value={technology.patent}
						boolean
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
			{currentStage >= 7 && (
				<Layout.Cell col="1">
					<Section title="Estágio de desenvolvimento" hideWhenIsEmpty={false}>
						<TextValue title="Escala TRL" value={technology.taxonomies?.stage} />
						<TechnologyReadinessLevel />
						<TRLCaption>
							TRL (Technology Readiness Level) - Nível de Prontidão da Tecnologia
						</TRLCaption>
					</Section>
				</Layout.Cell>
			)}
		</>
	);
};

const TRLCaption = styled.p`
	${({ theme: { colors } }) => css`
		font-size: 1.2rem;
		color: ${colors.silver};
		margin-top: 0.4rem;
	`}
`;

export default About;
