import React from 'react';

import TextValue from '../../../Technology/Details/TextValue';
import { useTechnology } from '../../../../hooks';
import { Container, ContentBox } from '../styles';

const Application = () => {
	const { technology } = useTechnology();

	return (
		<Container>
			<ContentBox>
				<TextValue title="Forma de aplicação" value={technology.application_mode} />
				<TextValue title="Exemplo de aplicação" value={technology.application_examples} />
			</ContentBox>

			<ContentBox>
				<TextValue
					title="Pré-requisitos para a implantação"
					value={technology.requirements}
				/>
				<TextValue
					title="Duração do processo de instalação da tecnologia"
					value={`${technology.installation_time} dias`}
				/>
			</ContentBox>
		</Container>
	);
};

export default Application;
