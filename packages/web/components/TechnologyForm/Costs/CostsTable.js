import React from 'react';
import PropTypes from 'prop-types';
import { FaMinus } from 'react-icons/fa';
import styled from 'styled-components';
import { InputField, SelectField, Watcher, CurrencyInputField } from '../../Form';
import { CircularButton } from '../../Button';
import { Cell, Row } from '../../Common/Layout';
import Price from '../../Price';
import { formatCurrencyToInt } from '../../../utils/helper';
import { unitsOptions } from '../../../utils/technology';

const WatcherText = styled.div`
	height: 4.4rem;
	display: flex;
	align-items: center;
	justify-content: flex-end;
`;

const RightContent = styled.div`
	display: flex;
	justify-content: flex-end;
`;

const CostsTable = ({ item, index, form, remove, collection }) => {
	const nameString = `${collection}.${index}`;

	return (
		<>
			<Row key={item.id} align="center">
				<input
					name={`${nameString}.id`}
					type="hidden"
					// eslint-disable-next-line react/jsx-props-no-spreading
					{...form.register(`${nameString}.id`, { required: false })}
				/>

				<Cell col={2}>
					<InputField
						form={form}
						name={`${nameString}.description`}
						label="Descrição"
						placeholder="Descrição"
						validation={{ required: true }}
					/>
				</Cell>
				<Cell>
					<SelectField
						form={form}
						name={`${nameString}.type`}
						label="Tipo"
						placeholder="Tipo"
						validation={{ required: true }}
						options={[
							{
								value: 'service',
								label: 'Serviço',
							},
							{
								value: 'raw_input',
								label: 'Insumo',
							},
							{
								value: 'equipment',
								label: 'Equipamento',
							},
							{
								value: 'others',
								label: 'Outro',
							},
						]}
					/>
				</Cell>
				<Cell>
					<InputField
						form={form}
						name={`${nameString}.quantity`}
						label="Quantidade"
						placeholder="Quantidade"
						validation={{
							required: true,
							pattern: {
								value: /^[0-9]*$/,
								message: 'Você deve digitar apenas números positivos',
							},
						}}
						type="number"
						min="0"
					/>
				</Cell>
				<Cell>
					<CurrencyInputField
						form={form}
						name={`${nameString}.value`}
						label="Valor"
						placeholder="Valor"
						validation={{ required: true }}
					/>
				</Cell>
				<Cell>
					<SelectField
						form={form}
						name={`${nameString}.measure_unit`}
						label="Unidade de Medida"
						placeholder="Unidade de Medida"
						validation={{ required: true }}
						options={unitsOptions}
					/>
				</Cell>

				<Cell>
					<Watcher
						form={form}
						property={collection}
						index={index}
						render={(element) => {
							const value =
								element && element.value ? formatCurrencyToInt(element.value) : '';
							const quantity =
								element && element.quantity ? parseInt(element.quantity, 10) : '';
							const totalPrice = (value * quantity).toFixed(2);

							return (
								<WatcherText>
									<div>
										<Price amount={totalPrice} />
									</div>
								</WatcherText>
							);
						}}
					/>
				</Cell>

				<RightContent>
					<CircularButton
						name={`${nameString}_remove_button`}
						size="small"
						variant="remove"
						shortPadding
						height={1.75}
						width={1.75}
						onClick={(event) => {
							event.preventDefault();
							remove(index);
						}}
					>
						<FaMinus />
					</CircularButton>
				</RightContent>
			</Row>
		</>
	);
};

CostsTable.propTypes = {
	collection: PropTypes.string.isRequired,
	form: PropTypes.shape({
		register: PropTypes.func,
	}).isRequired,
	item: PropTypes.shape({
		id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		description: PropTypes.string,
		value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		quantity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		type: PropTypes.string,
	}).isRequired,
	index: PropTypes.number.isRequired,
	remove: PropTypes.func,
};

CostsTable.defaultProps = {
	remove: () => {},
};

export default CostsTable;
