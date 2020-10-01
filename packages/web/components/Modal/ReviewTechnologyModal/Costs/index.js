import React from 'react';

import { Costs as CostsTable } from '../../../Technology/Details/Tables';
import { useTechnology } from '../../../../hooks';
import { Container, ContentBox } from '../styles';

const Costs = () => {
	const { technology } = useTechnology();

	return (
		<Container overflow="scroll" height="50vh">
			<ContentBox flexBasis="100%">
				<CostsTable
					title="Custo de desenvolvimento"
					data={technology?.technologyCosts?.costs?.development_costs}
					totalColor="green"
					containerHeight="auto"
				/>
				<CostsTable
					title="Custos de Implantação"
					data={technology?.technologyCosts?.costs?.implementation_costs}
					containerHeight="auto"
				/>
				<CostsTable
					title="Custos de Manutenção"
					data={technology?.technologyCosts?.costs?.maintenence_costs}
					totalColor="green"
					containerHeight="auto"
				/>
			</ContentBox>
		</Container>
	);
};

export default Costs;
