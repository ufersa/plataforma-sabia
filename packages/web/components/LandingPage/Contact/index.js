/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { Title } from '../../Common';
import { Form, InputField, MaskedInputField, SelectField, TextField } from '../../Form';
import Button from '../Button';
import { useModal } from '../../../hooks';
import { sendContactMail } from '../../../services';
import { toast } from '../../Toast';

const contactOptions = [
	{ id: 1, label: 'Sugestão de melhoria', value: 'improvement-suggestion' },
	{ id: 2, label: 'Reportar erro', value: 'report-error' },
	{ id: 3, label: 'Reportar abuso', value: 'report-abuse' },
	{ id: 4, label: 'Crítica', value: 'criticism' },
];

const Actions = ({ disableSubmit }) => {
	return (
		<StyledActions>
			<Button type="submit" variant="secondary" disabled={disableSubmit}>
				Enviar
			</Button>
		</StyledActions>
	);
};

Actions.propTypes = {
	disableSubmit: PropTypes.bool.isRequired,
};

const inputWrapperCss = css`
	margin-top: 1.6rem;
`;

const Contact = () => {
	const { openModal } = useModal();
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = async ({ user: values }, form) => {
		setIsSubmitting(true);
		const newValues = {
			...values,
			subject: values.subject.label,
		};

		const result = await sendContactMail(newValues);

		if (result) {
			openModal('contactUsSuccess');
		} else {
			toast.error('Ocorreu um erro ao enviar a mensagem, tente novamente.');
		}

		form.reset();
		setIsSubmitting(false);
	};

	/*
	 * Handle phone number mask, necessary to alternate between masks when phone has 9 digits
	 */
	const beforeMaskedValueChange = (newState) => {
		let { value } = newState;

		const newValue = value.replace(/\D/g, '');
		if (newValue.length === 11) {
			value = newValue.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
		}

		return {
			...newState,
			value,
		};
	};

	return (
		<Wrapper>
			<img
				src="messaging-fun-rafiki-contact.svg"
				alt="Ilustração de uma moça sentada no chão encostada numa mesa baixa enquanto utiliza o celular, com balões de mensagem voando no topo da ilustração e uma forma ao fundo"
			/>
			<Container>
				<Form
					onSubmit={handleSubmit}
					defaultValues={{ user: { contactReason: '', phone_number: '' } }}
				>
					<StyledTitle align="left" noPadding noMargin>
						Fale conosco
					</StyledTitle>
					<InputField
						name="user.name"
						type="text"
						label="Qual o seu nome?"
						validation={{ required: true }}
						variant="gray"
					/>

					<InputField
						name="user.email"
						type="email"
						label="Seu melhor e-mail"
						validation={{ required: true }}
						wrapperCss={inputWrapperCss}
						variant="gray"
					/>

					<MaskedInputField
						name="user.phone"
						alwaysShowMask={false}
						label="Telefone"
						mask="(99) 9999-99999"
						maskChar={null}
						beforeMaskedValueChange={beforeMaskedValueChange}
						pattern={/(\(?\d{2}\)?\s)?(\d{4,5}-\d{4})/}
						wrapperCss={inputWrapperCss}
						variant="gray"
					/>

					<SelectField
						instanceId="contact-form-reason"
						name="user.subject"
						label="Qual o motivo do contato?"
						placeholder="Escolha um assunto"
						options={contactOptions}
						validation={{ required: true }}
						wrapperCss={inputWrapperCss}
						variant="rounded"
					/>

					<TextField
						name="user.message"
						label="Sua mensagem"
						validation={{ required: true }}
						wrapperCss={inputWrapperCss}
						variant="gray"
					/>

					<Actions disableSubmit={isSubmitting} />
				</Form>
			</Container>
		</Wrapper>
	);
};

Contact.getInitialProps = () => {
	return {
		namespacesRequired: [],
	};
};

const Wrapper = styled.section`
	${({ theme: { screens } }) => css`
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: ${`${screens.large}px`};
		padding: 3.2rem 2.2rem;
		max-width: 100%;
		margin: 0 auto;

		@media (max-width: ${screens.large}px) {
			width: ${`${screens.medium}px`};
		}

		> img {
			max-width: 100%;
			margin-right: 10rem;
		}

		@media screen and (max-width: ${screens.large}px) {
			> img {
				display: none;
			}
		}
	`}
`;

const Container = styled.div`
	width: 100%;
`;

const StyledTitle = styled(Title)`
	margin-bottom: 3.2rem;
`;

const StyledActions = styled.div`
	margin-top: 1rem;

	> button {
		width: 100%;
	}
`;

export default Contact;
