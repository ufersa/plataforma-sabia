import React from 'react';

import TextValue from '../../../Technology/Details/TextValue';
import { useTechnology } from '../../../../hooks';
import { Container, ContentBox } from '../styles';

const Identification = () => {
	const { technology } = useTechnology();

	return (
		<Container>
			<ContentBox>
				<TextValue title="Título" value={technology.title} />
				<TextValue title="Descrição" value={technology.description} />
				<TextValue title="Categoria" value={technology.taxonomies?.category} />
			</ContentBox>

			<ContentBox>
				<TextValue title="Classificação" value={technology.taxonomies?.classification} />
				<TextValue title="Dimensão" value={technology.taxonomies?.dimension} />
				<TextValue title="Público-alvo" value={technology.taxonomies?.target_audience} />
				<TextValue title="Bioma" value={technology.taxonomies?.biome} />
				<TextValue
					title="Programa Governamental"
					value={technology.taxonomies?.government_program}
				/>
				<TextValue title="Palavras-chave" value={technology.taxonomies?.keywords} />
			</ContentBox>
		</Container>
	);
};

export default Identification;
