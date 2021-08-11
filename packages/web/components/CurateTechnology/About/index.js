import React from 'react';

import TextValue from '../../Technology/Details/TextValue';
import { useTechnology } from '../../../hooks';
import { TYPES as typesEnum } from '../../../utils/enums/technology.enums';
import { Container, ContentBox } from '../styles';

const About = () => {
	const { technology } = useTechnology();

	return (
		<Container>
			<ContentBox flexBasis="100%">
				<TextValue title="Título" value={technology.title} showIfEmpty />
				<TextValue title="Descrição" value={technology.description} showIfEmpty />
				<TextValue
					title="Público-alvo"
					value={technology.taxonomies?.target_audience}
					showIfEmpty
				/>
				<TextValue title="Bioma" value={technology.taxonomies?.biome} showIfEmpty />
				<TextValue
					title="Programa governamental"
					value={technology.taxonomies?.government_program}
					showIfEmpty
				/>
				<TextValue
					title="Palavras-chave"
					value={technology.taxonomies?.keywords}
					showIfEmpty
				/>
				<TextValue
					title="Estágio de desenvolvimento"
					value={technology.taxonomies?.stage}
					showIfEmpty
				/>
				<TextValue
					title="Direitos intelectuais"
					value={technology.taxonomies?.intellectual_property}
					boolean
				/>
				<TextValue title="Registro de patente" value={technology.patent} boolean />
				{!!technology.patent && (
					<TextValue
						title="Número da patente"
						value={technology.patent_number}
						showIfEmpty
					/>
				)}
				<TextValue title="É de domínio público?" value={technology.public_domain} boolean />
				<TextValue
					title="Classificação"
					value={technology.taxonomies?.classification}
					showIfEmpty
				/>
				<TextValue title="Dimensão" value={technology.taxonomies?.dimension} showIfEmpty />
				<TextValue
					title="Tipo"
					value={typesEnum.find((type) => type.value === technology.type)?.label}
					showIfEmpty
				/>
				<TextValue
					title="Grande área"
					value={technology.technologyCNPQAreas['knowledge_area_id.0']?.label}
					showIfEmpty
				/>
				<TextValue
					title="Área"
					value={technology.technologyCNPQAreas['knowledge_area_id.1']?.label}
					showIfEmpty
				/>
				<TextValue
					title="Sub-area"
					value={technology.technologyCNPQAreas['knowledge_area_id.2']?.label}
					showIfEmpty
				/>
				<TextValue
					title="Especialidade"
					value={technology.technologyCNPQAreas['knowledge_area_id.3']?.label}
					showIfEmpty
				/>
			</ContentBox>
		</Container>
	);
};

export default About;
