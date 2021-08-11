/* eslint-disable no-use-before-define */
import React from 'react';
import PropTypes from 'prop-types';
import { FaPlus, FaMinus } from 'react-icons/fa';
import styled from 'styled-components';
import { InputField, Repeater, MaskedInputField, Help } from '../../Form';
import { CircularButton } from '../../Button';
import { Cell, Row } from '../../Common/Layout';
import { useAuth } from '../../../hooks';
import { maskPatterns, replaceWithMask } from '../../../utils/masks';

const Wrapper = styled.div`
	margin-bottom: 4rem;
`;

const Responsible = ({ form }) => {
	const emptyValue = {
		full_name: '',
		email: '',
		phone_number: '',
	};
	const { user } = useAuth();
	const dataName = 'technologyResponsibles';
	const owner = `${dataName}.owner`;
	const users = `${dataName}.users`;

	return (
		<Wrapper>
			<Row align="center">
				<h3>Responsáveis Pela Tecnologia</h3>
				<Help
					id={owner}
					label="Responsáveis Pela Tecnologia"
					HelpComponent={<p>Adicione o nome dos responsáveis pelas tecnologias.</p>}
				/>
			</Row>
			<Row data-testid="row">
				<InputField
					form={form}
					name={`${owner}.user_id`}
					defaultValue={user.id}
					type="hidden"
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
				<Cell maxWidth={0.5} />
			</Row>
			<Repeater
				form={form}
				name={users}
				noInitialRow
				emptyValue={emptyValue}
				childsComponent={({ item, index, remove }) => {
					return (
						<>
							<Row key={item.fieldArrayId} align="center" data-testid="row">
								<Cell col={5}>
									<InputField
										form={form}
										name={`${users}.${index}.full_name`}
										label="Nome Completo"
										placeholder="Nome do responsável"
										validation={{ required: true }}
									/>
								</Cell>
								<Cell col={3}>
									<InputField
										form={form}
										name={`${users}.${index}.email`}
										label="Email"
										placeholder="Ex.: email@dominio.com.br"
										validation={{ required: true }}
									/>
								</Cell>
								<Cell col={2}>
									<MaskedInputField
										form={form}
										name={`${users}.${index}.phone_number`}
										defaultValue={replaceWithMask(
											form.getValues(`${users}.${index}.phone_number`),
											'phoneNumber',
										)}
										alwaysShowMask={false}
										label="Telefone"
										placeholder="(xx) xxxxxxxxx"
										validation={{ required: true }}
										mask={maskPatterns.phoneNumber.stringMask}
										pattern={maskPatterns.phoneNumber.pattern}
										formatChars={maskPatterns.phoneNumber.formatChars}
									/>
								</Cell>
								<Cell maxWidth={0.5}>
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
							name="technologyResponsibles.users_add_button"
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
	form: PropTypes.shape({
		getValues: PropTypes.func,
	}),
};

Responsible.defaultProps = {
	form: {},
};

export default Responsible;
