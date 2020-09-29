import React from 'react';

import TextValue from '../../../Technology/Details/TextValue';
import { useTechnology } from '../../../../hooks';
import { Container, ContentBox } from '../styles';
import { formatMoney } from '../../../../utils/helper';

// TODO: DRY (Tech Form)
const fundingData = {
	types: [
		{
			value: 'public',
			label: 'Público',
		},
		{
			value: 'private',
			label: 'Privado',
		},
		{
			value: 'collective',
			label: 'Coletivo',
		},
	],
	status: [
		{
			value: 'not_acquired',
			label: 'Não adquirido',
		},
		{
			value: 'acquiring',
			label: 'Em aquisição',
		},
		{
			value: 'acquired',
			label: 'Já adquirido',
		},
	],
};

const getFundingLabelByValue = (scope, value) => {
	const keys = Object.keys(fundingData);

	if (!scope || !keys.some((key) => key === scope)) {
		return value;
	}

	const funding = fundingData[scope].find((data) => data.value === value);

	return funding?.label || value;
};

const Funding = () => {
	const { technology } = useTechnology();

	return (
		<Container>
			<ContentBox>
				<TextValue
					title="Necessita de financiamento"
					value={technology.technologyCosts?.funding_required}
					boolean
				/>

				<TextValue
					title="Tipo de financiamento"
					value={getFundingLabelByValue(
						'types',
						technology.technologyCosts?.funding_type,
					)}
				/>

				<TextValue
					title="Valor do financiamento"
					value={
						!!technology.technologyCosts?.funding_value &&
						formatMoney(technology.technologyCosts?.funding_value)
					}
				/>

				<TextValue
					title="Situação"
					value={getFundingLabelByValue(
						'status',
						technology?.technologyCosts?.funding_status,
					)}
				/>
			</ContentBox>
		</Container>
	);
};

export default Funding;
