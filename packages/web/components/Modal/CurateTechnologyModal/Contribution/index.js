import React from 'react';

import TextValue from '../../../Technology/Details/TextValue';
import { useTechnology } from '../../../../hooks';
import { Container, ContentBox } from '../styles';

const Contribution = () => {
	const { technology } = useTechnology();

	return (
		<Container>
			<ContentBox>
				<TextValue title="Contribuição para o semiárido" value={technology.contribution} />
			</ContentBox>
		</Container>
	);
};

export default Contribution;
