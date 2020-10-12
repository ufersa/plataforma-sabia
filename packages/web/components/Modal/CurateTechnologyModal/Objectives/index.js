import React from 'react';

import TextValue from '../../../Technology/Details/TextValue';
import { useTechnology } from '../../../../hooks';
import { Container, ContentBox } from '../styles';

const Objectives = () => {
	const { technology } = useTechnology();

	return (
		<Container>
			<ContentBox>
				<TextValue title="Objetivo principal" value={technology.primary_purpose} />
			</ContentBox>

			<ContentBox>
				<TextValue title="Objetivo secundário" value={technology.secondary_purpose} />
			</ContentBox>
		</Container>
	);
};

export default Objectives;
