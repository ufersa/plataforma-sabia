/* eslint-disable no-use-before-define */
import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { InputField } from '../../Form';
import { Col, Row, Wrapper } from './styles';
import { CircularButton } from '../../Button';
import Repeater from '../../Form/Repeater';

const Responsible = ({ form }) => {
	const emptyValue = {
		fullName: '',
		email: '',
		phoneNumber: '',
		lattesID: '',
	};

	return (
		<Wrapper>
			<Repeater
				name="responsible"
				emptyValue={emptyValue}
				childsComponent={({ item, index, remove, fields, control }) => {
					return (
						<>
							<Row key={item.id}>
								<Col size={2}>
									<InputField
										form={form}
										name={`responsible[${index}].fullName`}
										label="Nome Completo"
										placeholder="Nome do responsável"
										validation={{ required: true }}
									/>
								</Col>
								<Col>
									<Controller
										as={
											<InputField
												form={form}
												name={`responsible[${index}].email`}
												label="Email"
												placeholder="Ex.: email@dominio.com.br"
												validation={{ required: true }}
											/>
										}
										name={`responsible[${index}].email`}
										control={control}
									/>
								</Col>
								<Col>
									<InputField
										form={form}
										name={`responsible[${index}].phone`}
										label="Telefone"
										placeholder="(xx) xxxx - xxxx"
										validation={{ required: true }}
									/>
								</Col>
								<Col>
									<InputField
										form={form}
										name={`responsible[${index}].lattesId`}
										label="ID Lattes"
										placeholder="Somente números"
										validation={{ required: true }}
									/>
								</Col>

								<CircularButton
									disabled={index === 0 && fields.length === 1}
									small
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
