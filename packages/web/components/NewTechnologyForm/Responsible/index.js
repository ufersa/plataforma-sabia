/* eslint-disable no-use-before-define */
import React from 'react';
import PropTypes from 'prop-types';
import { useFieldArray, useForm, Controller } from 'react-hook-form';
import { InputField } from '../../Form';
import { Col, Row, Wrapper } from './styles';
import { CircularButton } from '../../Button';

const Responsible = ({ form }) => {
	const emptyValue = { fullName: '', email: '', phoneNumber: '', lattesID: '' };
	const initialValue = [emptyValue];

	const { control } = useForm({
		defaultValues: {
			responsible: initialValue,
		},
	});

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'responsible',
	});

	const ResponsibleRow = (item, index) => {
		return (
			<Row key={index}>
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
					<InputField
						form={form}
						name={`responsible[${index}].email`}
						label="Email"
						placeholder="Ex.: email@dominio.com.br"
						validation={{ required: true }}
					/>
				</Col>
				<Col>
					<Controller
						as={
							<InputField
								form={form}
								name={`responsible[${index}].phone`}
								label="Telefone"
								placeholder="(xx) xxxx - xxxx"
								validation={{ required: true }}
							/>
						}
						name={`responsible[${index}].phone`}
						control={control}
						defaultValue={item.phone}
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
					-
				</CircularButton>
			</Row>
		);
	};

	const mountInputFields = () => {
		return fields.map((element, index) => ResponsibleRow(element, index));
	};

	return (
		<Wrapper>
			{mountInputFields()}
			<CircularButton
				right
				variant="info"
				color="white"
				onClick={(event) => {
					event.preventDefault();
					append(emptyValue);
				}}
			>
				+
			</CircularButton>
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
