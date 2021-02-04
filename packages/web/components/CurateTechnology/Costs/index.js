import React from 'react';

import TextValue from '../../Technology/Details/TextValue';
import { Costs as CostsTable } from '../../Technology/Details/Tables';
import { useTechnology } from '../../../hooks';
import { Container, ContentBox } from '../styles';
import { formatMoney } from '../../../utils/helper';

const Costs = () => {
	const { technology } = useTechnology();

	return (
		<Container>
			<ContentBox flexBasis="100%">
				<TextValue
					title="A tecnologia está a venda"
					value={technology.technologyCosts?.is_seller}
					boolean
				/>
				<TextValue
					title="Preço de venda"
					value={formatMoney(technology.technologyCosts?.price)}
					showIfEmpty
				/>
				<CostsTable
					title="Custos de Implantação"
					data={technology.technologyCosts?.costs?.implementation_costs}
					containerHeight="auto"
				/>
				<CostsTable
					title="Custos de Manutenção"
					data={technology.technologyCosts?.costs?.maintenance_costs}
					totalColor="green"
					containerHeight="auto"
				/>
				<TextValue title="Observações" value={technology.technologyCosts?.notes} />
			</ContentBox>
		</Container>
	);
};

export default Costs;
