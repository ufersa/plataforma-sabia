import React from 'react';

import { useTechnology } from '../../../hooks';
import { Container, ContentBox } from '../styles';
import { Responsibles as ResponsiblesTable } from '../../Technology/Details/Tables';

const Responsibles = () => {
	const { technology } = useTechnology();

	return (
		<Container>
			<ContentBox flexBasis="100%">
				<ResponsiblesTable data={technology.users} />
			</ContentBox>
		</Container>
	);
};

export default Responsibles;
