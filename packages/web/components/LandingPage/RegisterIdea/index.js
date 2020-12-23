/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { Title } from '../../Common';
import { Form, InputField, SelectField, TextField } from '../../Form';
import Button from '../Button';
import { toast } from '../../Toast';
import { createIdea } from '../../../services/ideas';
import { flattenSelectOptionsValue } from '../../../utils/helper';

const Actions = ({ disableSubmit }) => {
	return (
		<StyledActions>
			<Button type="submit" variant="secondary" disabled={disableSubmit}>
				Enviar minha ideia
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

const RegisterIdea = () => {
	const [isSubmitting, setIsSubmitting] = useState(false);

	/**
	 * Handles submitting the form
	 *
	 * @param {object} data The form data.
	 * @param {object} form The form object.
	 * @returns {void}
	 */
	const handleSubmit = async ({ title, description, keywords }, form) => {
		setIsSubmitting(true);

		const { data, success } = await createIdea(
			title,
			description,
			flattenSelectOptionsValue(keywords),
		);

		if (success) {
			toast.success('Ideia enviada com sucesso!');
		} else {
			toast.error(
				data?.message
					? data?.message
					: 'Ocorreu um erro ao enviar a ideia, tente novamente.',
			);
		}

		form.reset();
		setIsSubmitting(false);
	};

	/**
	 * Handles creating a new keyword
	 *
	 * @param {string} inputValue The inserted input value.
	 * @returns {object} An object of shape { label, value }
	 */
	const onCreateTerm = async (inputValue) => {
		// TODO: create new term on API
		return { label: inputValue, value: inputValue };
	};

	return (
		<Wrapper>
			<img
				src="sharing-Ideas-rafiki.svg"
				alt="Ilustração de um rapaz de camiseta verde entregando uma lâmpada gigante à outro rapaz de blusa preta com uma forma laranja ao fundo."
			/>
			<Container>
				<Form onSubmit={handleSubmit}>
					<StyledTitle align="left" noPadding noMargin>
						Conte sua ideia
					</StyledTitle>
					<InputField
						name="title"
						type="text"
						label="Titúlo da ideia"
						validation={{ required: true }}
						variant="gray"
					/>
					<TextField
						name="description"
						label="Detalhe da ideia"
						validation={{ required: true }}
						wrapperCss={inputWrapperCss}
						variant="gray"
					/>
					<SelectField
						name="keywords"
						placeholder="Adicione palavras-chave da sua ideia"
						label="Palavras-chave"
						isMulti
						creatable
						onCreate={(inputValue) => onCreateTerm(inputValue)}
						validation={{ required: true }}
					/>
					<Actions disableSubmit={isSubmitting} />
				</Form>
			</Container>
		</Wrapper>
	);
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

export default RegisterIdea;
