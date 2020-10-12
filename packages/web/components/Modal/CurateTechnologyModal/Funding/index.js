import React from 'react';

import TextValue from '../../../Technology/Details/TextValue';
import { useTechnology } from '../../../../hooks';
import { Container, ContentBox } from '../styles';
import { formatMoney } from '../../../../utils/helper';
import { getFundingLabelByValue } from '../../../TechnologyForm/Review/helpers';

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
