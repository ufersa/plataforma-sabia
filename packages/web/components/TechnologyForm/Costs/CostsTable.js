import React from 'react';
import PropTypes from 'prop-types';
import { FaMinus } from 'react-icons/fa';
import styled from 'styled-components';
/* import { Col, Row } from './styles'; */
import { InputField, SelectField, Watcher } from '../../Form';
import { CircularButton } from '../../Button';
import { Cell, Row } from '../../Common/Layout';

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
	const nameString = `${collection}[${index}]`;
	return (
		<>
			<Row key={item.id} align="center">
				<Cell col={2}>
					<InputField
						form={form}
						name={`${nameString}.description`}
						placeholder="Descrição"
						validation={{ required: true }}
					/>
				</Cell>
				<Cell>
					<SelectField
						form={form}
						name={`${nameString}.type`}
						placeholder="Tipo"
						validation={{ required: true }}
						options={[
							{
								value: 'servico',
								label: 'Serviço',
							},
							{
								value: 'insumo',
								label: 'Insumo',
							},
							{
								value: 'equipamento',
								label: 'Equipamento',
							},
							{
								value: 'outro',
								label: 'Outro',
							},
						]}
					/>
				</Cell>
				<Cell>
					<InputField
						form={form}
						name={`${nameString}.quantity`}
						placeholder="Quantidade"
						validation={{
							pattern: {
								value: /^[0-9]*$/,
								message: 'Você deve digitar apenas números',
							},
						}}
					/>
				</Cell>
				<Cell>
					<InputField
						form={form}
						name={`${nameString}.value`}
						placeholder="Valor"
						validation={{
							pattern: {
								value: /^[0-9]*$/,
								message: 'Você deve digitar apenas números',
							},
						}}
					/>
				</Cell>

				<Cell>
					<Watcher
						form={form}
						property={collection}
						index={index}
						render={(element) => {
							const value =
								element && element.value
									? parseFloat(element.value).toFixed(2)
									: '';
							const quantity =
								element && element.quantity ? parseInt(element.quantity, 10) : '';
							const totalPrice = (value * quantity).toFixed(2);
							return (
								<WatcherText>
									<div>R$ {totalPrice}</div>
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
	form: PropTypes.shape({}).isRequired,
	item: PropTypes.shape({
		id: PropTypes.string,
	}).isRequired,
	index: PropTypes.shape({}).isRequired,
	remove: PropTypes.func,
};

CostsTable.defaultProps = {
	remove: () => {},
};

export default CostsTable;
