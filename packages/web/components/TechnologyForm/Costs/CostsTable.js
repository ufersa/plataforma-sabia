import React from 'react';
import PropTypes from 'prop-types';
import { FaMinus } from 'react-icons/fa';
import styled from 'styled-components';
import { Col, Row } from './styles';
import { InputField, SelectDefault, Watcher } from '../../Form';
import { CircularButton } from '../../Button';

const WatcherText = styled.div`
	height: 4.4rem;
	display: flex;
	align-items: center;
	justify-content: flex-end;
`;

const CostsTable = ({ item, index, form, remove, collection }) => {
	return (
		<>
			<Row key={item.id}>
				<Col size={2}>
					<InputField
						form={form}
						name={`${collection}[${index}].description`}
						placeholder="Descrição"
						validation={{ required: true }}
					/>
				</Col>
				<Col>
					<SelectDefault
						form={form}
						name={`${collection}[${index}].type`}
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
				</Col>
				<Col>
					<InputField
						form={form}
						name={`${collection}[${index}].quantity`}
						placeholder="Quantidade"
						validation={{ required: true }}
					/>
				</Col>
				<Col>
					<InputField
						form={form}
						name={`${collection}[${index}].value`}
						placeholder="Valor"
						validation={{ required: true }}
					/>
				</Col>

				<Col>
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
							const price = (value * quantity).toFixed(2);
							return (
								<WatcherText>
									<div>R$ {price}</div>
								</WatcherText>
							);
						}}
					/>
				</Col>

				<CircularButton
					size="small"
					variant="remove"
					shortPadding
					onClick={(event) => {
						event.preventDefault();
						remove(index);
					}}
				>
					<FaMinus />
				</CircularButton>
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
