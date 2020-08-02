/* eslint-disable no-use-before-define */
import React from 'react';
import PropTypes from 'prop-types';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { InputField } from '../../Form';
import { Wrapper } from './styles';
import { CircularButton } from '../../Button';
import Repeater from '../../Form/Repeater';
import { useAuth } from '../../../hooks';
import { Cell, Row } from '../../Common/Layout';

const Responsible = ({ form }) => {
	const { user } = useAuth();
	const emptyValue = {
		fullName: '',
		email: '',
		phoneNumber: '',
		lattesID: '',
	};

	return (
		<Wrapper>
			<Row>
				<Cell col={5}>
					<InputField
						form={form}
						name="technologyResponsibles.owner.full_name"
						label="Nome Completo"
						disabled
						defaultValue={user.full_name}
					/>
				</Cell>
				<Cell col={3}>
					<InputField
						form={form}
						name="technologyResponsibles.owner.email"
						label="Email"
						disabled
						defaultValue={user.email}
					/>
				</Cell>
				<Cell col={2}>
					<InputField
						form={form}
						name="technologyResponsibles.owner.phone_number"
						label="Telefone"
						placeholder="(xx) xxxx - xxxx"
						disabled
						defaultValue={user.phone_number}
					/>
				</Cell>
				<Cell col={2}>
					<InputField
						form={form}
						name="technologyResponsibles.owner.lattes_id"
						label="ID Lattes"
						placeholder="Somente números"
						validation={{ required: true }}
						defaultValue={user.lattes_id}
					/>
				</Cell>
				<Cell maxWidth={0.5} />
			</Row>
			<Repeater
				form={form}
				name="responsible"
				emptyValue={emptyValue}
				childsComponent={({ item, index, remove, fields }) => {
					return (
						<>
							<Row key={item.id} align="center">
								<Cell col={5}>
									<InputField
										form={form}
										name={`technologyResponsibles.users[${index}].full_name`}
										label="Nome Completo"
										placeholder="Nome do responsável"
										validation={{ required: true }}
									/>
								</Cell>
								<Cell col={3}>
									<InputField
										form={form}
										name={`technologyResponsibles.users[${index}].email`}
										label="Email"
										placeholder="Ex.: email@dominio.com.br"
										validation={{ required: true }}
									/>
								</Cell>
								<Cell col={2}>
									<InputField
										form={form}
										name={`technologyResponsibles.users[${index}].phone_number`}
										label="Telefone"
										placeholder="(xx) xxxx - xxxx"
										validation={{ required: true }}
									/>
								</Cell>
								<Cell col={2}>
									<InputField
										form={form}
										name={`technologyResponsibles.users[${index}].lattes_id`}
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
