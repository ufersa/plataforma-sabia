import React from 'react';

import TextValue from '../../../Technology/Details/TextValue';
import ReadinessLevel from '../../../Technology/Details/ReadinessLevel';
import { useTechnology } from '../../../../hooks';
import { Container, ContentBox } from '../styles';

const DevelopmentStage = () => {
	const { technology } = useTechnology();

	return (
		<Container>
			<ContentBox>
				<TextValue title="Escala TRL" value={technology.taxonomies?.stage} />

				<ReadinessLevel />
			</ContentBox>
		</Container>
	);
};

export default DevelopmentStage;
