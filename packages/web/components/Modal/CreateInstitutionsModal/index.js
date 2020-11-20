import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Actions, InputField, MaskedInputField, SelectField } from '../../Form';
import { Container, Button } from './styles';
import { Cell, Row } from '../../Common';

const InstitutionsForm = ({ form, closeModal, loading }) => (
	<>
		<Row>
			<Cell col={12}>
				<InputField
					form={form}
					label="Nome"
					name="name"
					type="text"
					validation={{ required: true }}
					variant="gray"
				/>
			</Cell>
		</Row>
		<Row>
			<Cell col={4}>
				<InputField
					form={form}
					label="Sigla"
					name="initials"
					type="text"
					validation={{ required: true }}
					variant="gray"
				/>
			</Cell>
			<Cell col={8}>
				<MaskedInputField
					form={form}
					name="cnpj"
					label="CNPJ"
					placeholder=""
					mask="999.999.999-99"
					mask="99.999.999/9999-99"
					pattern={/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/}
					validation={{ required: true }}
					variant="gray"
				/>
			</Cell>
		</Row>
		<Row>
			<Cell col={8}>
				<InputField
					form={form}
					label="Logradouro"
					name="address"
					type="text"
					validation={{ required: true }}
					variant="gray"
				/>
			</Cell>
			<Cell col={4}>
				<MaskedInputField
					form={form}
					name="zipcode"
					label="CEP"
					placeholder="12345-123"
					mask="99999-999"
					pattern={/^\d{5}-\d{3}$/}
					validation={{ required: true }}
					variant="gray"
				/>
			</Cell>
		</Row>
		<Row>
			<Cell col={6}>
				<SelectField
					form={form}
					name="uf"
					label="UF"
					validation={{ required: true }}
					variant="gray"
				/>
			</Cell>
			<Cell col={6}>
				<SelectField
					form={form}
					name="city"
					label="Cidade"
					validation={{ required: true }}
					variant="gray"
				/>
			</Cell>
		</Row>
		<Actions center>
			<Button
				type="button"
				variant="outlined"
				onClick={() => closeModal()}
				disabled={loading}
			>
				Cancelar
			</Button>
			<Button type="submit" disabled={loading}>
				Cadastrar
			</Button>
		</Actions>
	</>
);

const CreateInstitutionsModal = ({ closeModal }) => {
const [isSubmitting, setIsSubmitting] = useState(false);

const handleSubmit = async () => {};

return (
	<Container>
		<h3>Cadastrar nova Organização</h3>
		<Form onSubmit={handleSubmit} aria-label="form">
			<InstitutionsForm loading={isSubmitting} closeModal={closeModal} />
		</Form>
	</Container>
);
};

CreateInstitutionsModal.propTypes = {
	closeModal: PropTypes.func.isRequired,
};

export default CreateInstitutionsModal;
