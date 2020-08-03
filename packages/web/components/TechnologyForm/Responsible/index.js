/* eslint-disable no-use-before-define */
import React from 'react';
import PropTypes from 'prop-types';
import { FaPlus, FaMinus } from 'react-icons/fa';
import styled from 'styled-components';
import { InputField } from '../../Form';
import { CircularButton } from '../../Button';
import Repeater from '../../Form/Repeater';
import { useAuth } from '../../../hooks';
import { Cell, Row } from '../../Common/Layout';

const Wrapper = styled.div`
	margin-bottom: 4rem;
`;

const Responsible = ({ form }) => {
	const { user } = useAuth();
	const emptyValue = {
		full_name: '',
		email: '',
		phone_number: '',
		lattes_id: '',
	};

	const dataName = 'technologyResponsibles';
	const owner = `${dataName}.owner`;
	const users = `${dataName}.users`;

	return (
		<Wrapper>
			<Row>
				<InputField
					form={form}
					name={`${owner}.user_id`}
					type="hidden"
					defaultValue={user.id}
				/>
				<Cell col={5}>
					<InputField
						form={form}
						name={`${owner}.full_name`}
						label="Nome Completo"
						disabled
						defaultValue={user.full_name}
					/>
				</Cell>
				<Cell col={3}>
					<InputField
						form={form}
						name={`${owner}.email`}
						label="Email"
						disabled
						defaultValue={user.email}
					/>
				</Cell>
				<Cell col={2}>
					<InputField
						form={form}
						name={`${owner}.phone_number`}
						label="Telefone"
						disabled
						defaultValue={user.phone_number}
					/>
				</Cell>
				<Cell col={2}>
					<InputField
						form={form}
						name={`${owner}.new_lattes_id`}
						label="ID Lattes"
						placeholder="Somente números"
						validation={{ required: true }}
						defaultValue={user.lattes_id}
					/>
				</Cell>
				<InputField
					form={form}
					name={`${owner}.current_lattes_id`}
					type="hidden"
					defaultValue={user.lattes_id}
				/>
				<Cell maxWidth={0.5} />
			</Row>
			<Repeater
				form={form}
				name={users}
				emptyValue={emptyValue}
				childsComponent={({ item, index, remove, fields }) => {
					return (
						<>
							<Row key={item.id} align="center">
								<Cell col={5}>
									<InputField
										form={form}
										name={`${users}[${index}].full_name`}
										label="Nome Completo"
										placeholder="Nome do responsável"
										validation={{ required: true }}
									/>
								</Cell>
								<Cell col={3}>
									<InputField
										form={form}
										name={`${users}[${index}].email`}
										label="Email"
										placeholder="Ex.: email@dominio.com.br"
										validation={{ required: true }}
									/>
								</Cell>
								<Cell col={2}>
									<InputField
										form={form}
										name={`${users}[${index}].phone_number`}
										label="Telefone"
										placeholder="(xx) xxxx - xxxx"
										validation={{ required: true }}
									/>
								</Cell>
								<Cell col={2}>
									<InputField
										form={form}
										name={`${users}[${index}].lattes_id`}
										type="number"
										label="ID Lattes"
										placeholder="Somente números"
										validation={{ required: true }}
									/>
								</Cell>

								<Cell maxWidth={0.5}>
									<CircularButton
										disabled={index === 0 && fields.length === 1}
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
								</Cell>
							</Row>
						</>
					);
				}}
				// eslint-disable-next-line no-shadow
				endComponent={({ append, emptyValue }) => {
					return (
						<CircularButton
							right
							variant="info"
							size="medium"
							color="white"
							onClick={(event) => {
								event.preventDefault();
								append(emptyValue);
							}}
						>
							<FaPlus />
						</CircularButton>
					);
				}}
			/>
		</Wrapper>
	);
};

Responsible.propTypes = {
	form: PropTypes.shape({}),
};

Responsible.defaultProps = {
	form: {},
};

export default Responsible;
