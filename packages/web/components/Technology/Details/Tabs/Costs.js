import React from 'react';
import styled from 'styled-components';
import { useTechnology } from '../../../../hooks';
import * as Layout from '../../../Common/Layout';
import Section from '../Section';
import { Costs as CostsTable } from '../Tables';
import { Protected } from '../../../Authorization';
import TextValue from '../TextValue';

const Costs = () => {
	const { technology } = useTechnology();

	return (
		<Layout.Cell col="2">
			<Section title="Custos da Tecnologia" hideWhenIsEmpty={false}>
				<Protected inline>
					<CostsTable
						title="Custos de Implantação"
						data={technology?.technologyCosts?.costs?.implementation_costs}
					/>
					<CostsTable
						title="Custos de Manutenção"
						data={technology?.technologyCosts?.costs?.maintenance_costs}
						totalColor="green"
					/>
					<ObservationWrapper>
						<TextValue title="Observações" value={technology?.technologyCosts?.notes} />
					</ObservationWrapper>
				</Protected>
			</Section>
		</Layout.Cell>
	);
};

const ObservationWrapper = styled.div`
	margin-top: 3rem;
`;

export default Costs;
