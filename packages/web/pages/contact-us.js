/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { Title } from '../components/Common';
import { Form, InputField, MaskedInputField, SelectField, TextField } from '../components/Form';
import { Button } from '../components/Modal/BeAReviewerModal/styles';
import { useModal } from '../hooks';
import { sendContactMail } from '../services';
import { toast } from '../components/Toast';

const contactOptions = [
	{ id: 1, label: 'Sugestão de melhoria', value: 'improvement-suggestion' },
	{ id: 2, label: 'Reportar erro', value: 'report-error' },
	{ id: 3, label: 'Reportar abuso', value: 'report-abuse' },
	{ id: 4, label: 'Crítica', value: 'criticism' },
];

const Actions = ({ form, disableSubmit }) => {
	const handleReset = () => {
		const { reset } = form;
		reset();
	};

	return (
		<StyledActions>
			<Button type="submit" variant="contained" disabled={disableSubmit}>
				Enviar mensagem
			</Button>

			<CancelButton type="button" variant="outlined" onClick={handleReset}>
				Limpar campos
			</CancelButton>
		</StyledActions>
	);
};

Actions.propTypes = {
	form: PropTypes.shape({
		reset: PropTypes.func,
	}),
	disableSubmit: PropTypes.bool.isRequired,
};

Actions.defaultProps = {
	form: {},
};

const inputWrapperCss = css`
	margin-top: 1.6rem;
`;

const ContactUs = () => {
	const { openModal } = useModal();
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = async ({ user: values }) => {
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
			<img
				src="waves-rafiki-contact.svg"
				alt="Ilustração de uma moça sentada em um sofa verde mexendo em um notebook com uma ilustração de ondas ao fundo"
			/>
		</Wrapper>
	);
};

ContactUs.getInitialProps = () => {
	return {
		namespacesRequired: [],
	};
};

const Wrapper = styled.section`
	${({ theme: { screens } }) => css`
		position: relative;
		overflow: hidden;
		display: grid;
		grid-template-columns: repeat(2, 50%);
		padding: 0 1.6rem;
		margin-top: 0.2rem;

		> img {
			position: absolute;
			bottom: 0;
			right: 0;
			z-index: 1;
			width: 100%;
			max-width: 128rem;
		}

		@media screen and (max-width: ${screens.large}px) {
			grid-template-columns: repeat(1, 100%);

			> div {
				max-width: 80rem;
			}

			> img {
				display: none;
			}
		}
	`}
`;

const Container = styled.div`
	display: flex;
	margin: 0 auto;
	max-width: 57rem;
	width: 100%;
	position: relative;
	z-index: 2;

	> img {
		margin-left: 8.8rem;
	}
`;

const StyledTitle = styled(Title)`
	margin-bottom: 3.2rem;
`;

const CancelButton = styled(Button)`
	${({ theme: { colors } }) => css`
		color: ${colors.red};
		background: none;
		border: 2px solid ${colors.red};
		margin-left: 3rem;

		:hover,
		:focus {
			color: ${colors.white};
			background: ${colors.red};
		}
	`}
`;

const StyledActions = styled.div`
	${({ theme: { screens } }) => css`
		display: flex;
		margin-top: 2rem;

		> button {
			justify-content: center;
			flex-grow: 1;
			margin-top: 1.6rem;
			white-space: nowrap;
		}

		@media screen and (max-width: ${screens.small}px) {
			flex-direction: column;

			> button {
				width: 100%;
				margin-left: 0;
			}
		}
	`}
`;

export default ContactUs;
