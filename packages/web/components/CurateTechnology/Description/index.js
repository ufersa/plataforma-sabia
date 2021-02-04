import React from 'react';

import TextValue from '../../Technology/Details/TextValue';
import { useTechnology } from '../../../hooks';
import { Container, ContentBox } from '../styles';

const Description = () => {
	const { technology } = useTechnology();

	return (
		<Container>
			<ContentBox flexBasis="100%">
				<TextValue
					title="Objetivo principal"
					value={technology.primary_purpose}
					showIfEmpty
				/>
				<TextValue
					title="Objetivo secundário"
					value={technology.secondary_purpose}
					showIfEmpty
				/>
				<TextValue
					title="Forma de aplicação"
					value={technology.application_mode}
					showIfEmpty
				/>
				<TextValue
					title="Exemplo de aplicação"
					value={technology.application_examples}
					showIfEmpty
				/>
				<TextValue
					title="Duração do processo de instalação"
					value={`${technology.installation_time} dias`}
					showIfEmpty
				/>
				<TextValue
					title="Problemas que a tecnologia soluciona"
					value={technology.solves_problem}
					showIfEmpty
				/>
				<TextValue
					title="Problemas que a tecnologia acarreta"
					value={technology.entailes_problem}
					showIfEmpty
				/>
				<TextValue
					title="Pré-requisitos para implantação"
					value={technology.requirements}
					showIfEmpty
				/>
				<TextValue title="Riscos associados" value={technology.risks} showIfEmpty />
				<TextValue title="Contribuição" value={technology.contribution} showIfEmpty />
			</ContentBox>
		</Container>
	);
};

export default Description;
