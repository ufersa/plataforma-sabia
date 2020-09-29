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
				<TextValue title="Categoria" value={technology.terms?.category} />
			</ContentBox>

			<ContentBox>
				<TextValue title="Classificação" value={technology.terms?.classification} />
				<TextValue title="Dimensão" value={technology.terms?.dimension} />
				<TextValue title="Público-alvo" value={technology.terms?.target_audience} />
				<TextValue title="Bioma" value={technology.terms?.biome} />
				<TextValue
					title="Programa Governamental"
					value={technology.terms?.government_program}
				/>
				<TextValue title="Palavras-chave" value={technology.terms?.keywords} />
			</ContentBox>
		</Container>
	);
};

export default Identification;
