import React from 'react';

import TextValue from '../../../Technology/Details/TextValue';
import { useTechnology } from '../../../../hooks';
import { Container, ContentBox } from '../styles';

const LegalAspects = () => {
	const { technology } = useTechnology();

	return (
		<Container>
			<ContentBox>
				<TextValue title="Tecnologia patenteada" value={technology.patent} boolean />
				<TextValue
					title="Direitos intelectuais"
					value={technology.taxonomies?.intellectual_property}
				/>
			</ContentBox>
		</Container>
	);
};

export default LegalAspects;
