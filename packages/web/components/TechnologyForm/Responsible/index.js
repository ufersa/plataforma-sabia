/* eslint-disable no-use-before-define */
import React from 'react';
import PropTypes from 'prop-types';
import { FaPlus, FaMinus } from 'react-icons/fa';
import styled from 'styled-components';
import { InputField, Repeater, MaskedInputField } from '../../Form';
import { CircularButton } from '../../Button';
import { Cell, Row } from '../../Common/Layout';

const Wrapper = styled.div`
	margin-bottom: 4rem;
`;

const Responsible = ({ form }) => {
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
			<Repeater
				form={form}
				name={owner}
				title="Responsáveis Pela Tecnologia"
				help={
					<p>
						Adicione o nome dos responsáveis pelas tecnologias.
						<br /> O ID Lattes é importante para que a equipe de avaliadores possa
						analisar os dados dos pesquisadores com mais detalhes.
					</p>
				}
				childsComponent={({ item }) => {
					return (
						<Row data-testid="row" key={item.id}>
							<InputField form={form} name={`${owner}.user_id`} type="hidden" />
							<Cell col={5}>
								<InputField
									form={form}
									name={`${owner}.full_name`}
									label="Nome Completo"
									disabled
								/>
							</Cell>
							<Cell col={3}>
								<InputField
									form={form}
									name={`${owner}.email`}
									label="Email"
									disabled
								/>
							</Cell>
							<Cell col={2}>
								<InputField
									form={form}
									name={`${owner}.phone_number`}
									label="Telefone"
									disabled
								/>
							</Cell>
							<Cell col={2}>
								<InputField
									form={form}
									name={`${owner}.new_lattes_id`}
									label="ID Lattes"
									placeholder="Somente números"
									type="number"
								/>
							</Cell>
							<InputField
								form={form}
								name={`${owner}.current_lattes_id`}
								type="hidden"
							/>
							<Cell maxWidth={0.5} />
						</Row>
					);
				}}
			/>

			<Repeater
				form={form}
				name={users}
				noInitialRow
				emptyValue={emptyValue}
				childsComponent={({ item, index, remove }) => {
					return (
						<>
							<Row key={item.id} align="center" data-testid="row">
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
									<MaskedInputField
										form={form}
										name={`${users}[${index}].phone_number`}
										label="Telefone"
										placeholder="(xx) xxxxx-xxxx"
										validation={{ required: true }}
										mask="(99) 99999-9999"
										pattern={/^\([1-9]{2}\) (?:[2-8]|9[1-9])[0-9]{3}-[0-9]{4}$/}
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
	form: PropTypes.shape({}),
};

Responsible.defaultProps = {
	form: {},
};

export default Responsible;
