import React from 'react';

import TextValue from '../../../Technology/Details/TextValue';
import { useTechnology } from '../../../../hooks';
import { Container, ContentBox } from '../styles';

const Risks = () => {
	const { technology } = useTechnology();

	return (
		<Container>
			<ContentBox>
				<TextValue title="Riscos associados à tecnologia" value={technology?.risks} />
			</ContentBox>
		</Container>
	);
};

export default Risks;
