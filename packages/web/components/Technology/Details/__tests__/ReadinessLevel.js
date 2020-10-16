import React from 'react';
import { render, screen } from 'test-utils';
import { TechnologyProvider } from '../../TechnologyProvider';

import ReadinessLevel from '../ReadinessLevel';

const technologyMock = {
	terms: [
		{
			term:
				'Nível 4 - Verificação funcional de componente e/ou subsistema em ambiente laboratorial',
			slug:
				'nivel-4-verificacao-funcional-de-componente-e/ou-subsistema-em-ambiente-laboratorial',
			taxonomy: {
				taxonomy: 'STAGE',
			},
		},
	],
};

describe('<ReadinessLevel />', () => {
	it('should render without crashing', () => {
		const { container } = render(
			<TechnologyProvider technology={technologyMock}>
				<ReadinessLevel />
			</TechnologyProvider>,
		);

		expect(
			screen.getByRole('img', { src: '/technology-readiness-level.svg' }),
		).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});
});
