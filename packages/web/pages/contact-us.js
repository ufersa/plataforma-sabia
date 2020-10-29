/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { Title } from '../components/Common';
import { Form, InputField, MaskedInputField, SelectField, TextField } from '../components/Form';
import { Button } from '../components/Modal/BeAReviewerModal/styles';
import { useModal } from '../hooks';

const contactOptions = [
	{ id: 1, label: 'Sugestão de melhoria', value: 'improvement-suggestion' },
	{ id: 2, label: 'Reportar erro', value: 'report-error' },
	{ id: 3, label: 'Reportar abuso', value: 'report-abuse' },
	{ id: 4, label: 'Crítica', value: 'criticism' },
];

const Actions = ({ form }) => {
	const handleReset = () => {
		const { reset } = form;
		reset();
	};

	return (
		<StyledActions>
			<Button type="submit" variant="contained">
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
};

Actions.defaultProps = {
	form: {},
};

const inputWrapperCss = css`
	margin-top: 1.6rem;
`;

const ContactUs = () => {
	const { openModal } = useModal();

	const handleSubmit = () => {
		openModal('contactUsSuccess');
	};

	return (
		<Wrapper>
			<Container>
				<Form onSubmit={handleSubmit} defaultValues={{ user: { contactReason: '' } }}>
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
						name="user.phone_number"
						alwaysShowMask={false}
						label="Telefone"
						mask="(99) 99999-9999"
						pattern={/(\(?\d{2}\)?\s)?(\d{4,5}-\d{4})/}
						wrapperCss={inputWrapperCss}
						variant="gray"
					/>

					<SelectField
						instanceId="contact-form-reason"
						name="user.contactReason"
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

					<Actions />
				</Form>
			</Container>
			<img
				src="waves-rafiki-contact.svg"
				alt="Ilustração de uma moça sentada em um sofa verde mexendo em um notebook com uma ilustração de ondas ao fundo"
			/>
		</Wrapper>
	);
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
